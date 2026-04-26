---
slug: formula-for-spark-structured-streaming-watermark/
title: Formula for Spark Structured Streaming watermark
description: Formula for Spark Structured Streaming watermark
authors: tranlam
tags: [Bigdata, Spark, Structured Streaming, Watermark]
---

I thought watermark was a trivial concept, until I encounter cross-stream joins and out-of-order data. Handling unexpected event-time skew and late data arrival requires more than just a basic configuration that basic documentation often overlooks. This post is a technical deep dive into the lessons learned while debugging state expiration and late-arrival logic when developing and deploying complex streaming pipelines at my work.

<!--truncate-->

## On a single stream

Late data is anything that misses the cutoff: it's any record with an event time that predates the maximum seen so far, minus the watermark window.

<p style={{textAlign: "center"}}>

${
T_{late\_event} < T_{max\_event\_time\_seen} - watermark
}$ 

</p>

Once a record crosses that line, Spark stops tracking it. It’s excluded from stateful processing and windowing, meaning it won’t influence your final metrics or downstream results.

## Joining multiple streams

Joining two streams could be more complex. You have to specify two things:
- Watermark delays: how delayed the event time columns of the input can be
- Event-time range condition: a constraint on event time across two inputs such that engine can figure out when old rows of one input is not going to be required (i.e. will not satisfy the time constraint) for matches with the other input

The key concept is **A row is eviected when the global watermark threshold exceeds that row's timestamp + the time range bound where the opposite stream could still match it**.

Spark uses a single global watermark = min(all stream watermarks) by default (or based on how you configured `spark.sql.streaming.multipleWatermarkPolicy`). So to evict state, both streams must advance sufficiently.

Suppose I have below query:

```sql
table_1 (watermark = wm_1) LEFT JOIN
table_2 (watermark = wm_2) ON table_1.<key> = table_2.<key>
    AND table_1.<timestamp> BETWEEN table_2.<timestamp> - INTERVAL x AND table_2.<timestamp> - INTERVAL y
```

| Perspective                                      | Matching Range              |
|--------------------------------------------------|-----------------------------|
| From table_1: "Which table_2 rows can match me?" | `T_1 - y <= T_2 <= T_1 + x` |
| From table_2: "Which table_1 rows can match me?" | `T_2 - x <= T_1 <= T_2 + y` |

Given:
- Join condition: `table_1.<timestamp> BETWEEN table_2.<timestamp> - INTERVAL x AND table_2.<timestamp> - INTERVAL y`
- wm_1 = watermark of table_1 (left), wm_2 = watermark of table_2 (right)

Global watermark:
- `GW = min(max_1_ts - wm_1, max_2_ts - wm_2)`

Eviction formula:
- table_1 row at `T_1` eviected when `GW > T_1 + x`, which requires both:
    - `max_1_ts > T_1 + x + wm_1`
    - `max_2_ts > T_1 + x + wm_2`
- table_2 row at `T_2` eviceted when `GW > T_2 + y`, which requires both:
    - `max_1_ts > T_2 + y + wm_1`
    - `max_2_ts > T_2 + y + wm_2`

For matched rows in the current batch, the join result will be emitted immediately, but those rows still kept in state for future matching process, as long as the eviction condition is not met.

For unmatched rows, the records kept in state, processed one last time when the eviction condition met, then get dropped from state. Based on the join type, the last processing can produce different result:
- For inner join, since there are no matches, those records will just get dropped from the state
- For left outer join, the result records will have NULL values on the right side table columns, and then those late records will get dropped from the state
- etc.

Based on the join types, the watermark will be needed on each dataset. Behavior if we specify only 1 watermark but not for both streams:

| Join type   | Requirements                                                                                                                                                             | If specify only table_1 WM                                                                                                                                   | If specify only table_2 WM                                                             |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| Inner       | Supported, optionally specify watermark on both sides + time constraints for state cleanup                                                                               | Works, but right state grows unbounded (never cleaned up)                                                                                                    | Works, but left state grows unbounded (never cleaned up)                               |
| Left Outer  | Conditionally supported, must specify watermark on right + time constraints for correct results, optionally specify watermark on left for all state cleanup              | Not work                                                                                                                                                     | Right WM enables NULL emission for unmatched left rows. But left state grows unbounded |
| Right Outer | Conditionally supported, must specify watermark on left + time constraints for correct results, optionally specify watermark on right for all state cleanup              | Left WM enables NULL emission for unmatched right rows. But right state grows unbounded                                                                      | Not work                                                                               |
| Full Outer  | Conditionally supported, must specify watermark on one side + time constraints for correct results, optionally specify watermark on the other side for all state cleanup | NULL emission for the side opposite to the WM. The opposite side's state (without WM) grows unbounded, and its unmatched rows may have delayed NULL emission | Same                                                                                   |
| Left Semi   | Conditionally supported, must specify watermark on right + time constraints for correct results, optionally specify watermark on left for all state cleanup              | Not work                                                                                                                                                     | Right WM tells Spark when no more matches are possible. But left state grows unbounded |