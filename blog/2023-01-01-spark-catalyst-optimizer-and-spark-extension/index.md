---
slug: spark-catalyst-optimizer-and-spark-extension
title: Spark catalyst optimizer và Spark extension
authors: tranlam
tags: [Bigdata, Spark, Apache]
image: ./images/spark-catalyst-optimizer.JPG
---

Spark catalyst optimizer nằm trong phần core của Spark SQL với mục đích tối ưu các truy vấn có cấu trúc được thể hiện dưới dạng SQL hoặc qua các API DataFrame/Dataset, giảm thiểu thời gian và chi phí chạy của ứng dụng. Khi sử dụng Spark, thường mọi người xem catalyst optimizer như là một black box, khi chúng ta mặc nhiên cho rằng nó hoạt động một cách vi diệu mà không thực sự quan tâm nó hoạt động thế nào. Ở bài viết này, mình sẽ đi vào tìm hiểu bên trong logic của nó thực sự thế nào, các thành phần, và cách mà Spark extension tham gia để thay đổi các plan mà catalyst tạo ra.

![Indexing](./images/spark-catalyst-optimizer.JPG)

<!--truncate-->

:::note
Coming soon
:::