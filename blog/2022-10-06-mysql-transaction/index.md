---
slug: mysql-series-mysql-transaction/
title: MySQL series - Transaction In MySQL
description: MySQL series - Transaction In MySQL
authors: tranlam
tags: [Bigdata, MySQL, Database, Data Engineering, Transaction]
image: ./images/transaction.JPEG
---

![Poster](./images/transaction.JPEG)

The next article in the MySQL series is about transactions. A very common operation in MySQL in particular and relational databases in general. Let's go to the article.

<!--truncate-->

## What is transaction?

A transaction is a set of SQL statements put together as a unit of work. If the database successfully runs all SQL statements in that group, it is considered successful. If one of the SQL commands fails, all the SQL commands that have been run or not run will have no effect on the database. An example of a set of SQL statements wrapped in a transaction follows

```sql
    1  START  TRANSACTION;
    2  SELECT balance FROM checking WHERE customer_id = 10233276;
    3  UPDATE checking SET balance = balance - 200.00 WHERE customer_id = 10233276;
    4  UPDATE savings SET balance = balance - 200.00 WHERE customer_id = 10233276;
    5  COMMIT;
```

Transactions are started by START TRANSACTION and are usually closed by COMMIT (confirm transaction) or ROLLBACK (return to pre-transaction state). If the ${4^{th}}$ statement fails, the ${3^{rd}}$ statement will be rolledback and nothing will happen to affect the old data.

## Four data preservation properties in relational database

![ACID](./images/acid.PNG)

Every system needs to satisfy four ACID properties to ensure data preservation

- Atomicity

Transaction needs to act as a unit of work. Either all SQL statements in the transaction are applied or none are applied.

- Consistency

Database needs to be consistent, only being moved from one consistent state to another. The example above, if the error occurs after running the ${3^{rd}}$ statement, the checking account will not lose 200$ when the transaction has not been committed. The total money in the two accounts before and after the transaction remains the same.

- Isolation

The result of this transaction will be invisible to other transactions when this transaction is not finished, not committed. For example, when transaction 1 is running between ${3^{rd}}$ and ${4^{th}}$ statements above, another transaction that summarizes the balances of the accounts will still see 200$ in the checking account. When a transaction is uncommitted, no changes will affect the database.

- Durability

Once committed, the changes made by the transaction will be permanent, the changes need to be recorded to ensure that the data is not lost if the system fails.

## Four isolation level in highly concurrent read and write environments

There are 4 isolation levels related to transactions

- READ UNCOMMITTED

In this mode, transactions can see the results of other uncommitted transactions. This mode does not perform much faster than many other modes but easily causes problems when reading wrong data.

- READ COMMITTED

The default mode of most databases (but not MySQL), it will lose some of the ACID Isolation properties, this transaction will be visible to changes by other transactions committed after this transaction starts, however changes to this transaction remain invisible until it is committed. This can cause two identical read statements in a transaction to return two different datasets.

- REPEATABLE READ

This mode is the default of MySQL. It ensures that within the same transaction, the same read statements will return the same result. But there will also be a small problem that if we select a range of values, another transaction inserts a new record in that range, we will see that new record. Storage engines like InnoDB, XtraDB solve this problem by creating multiple versions of a record that manage concurrent reads and writes.

- SERIALIZABLE

This mode solves the problem of reading a range of values ​​above by running transactions in order. This mode will lock all the rows it reads, a lot of timeouts and locking occur frequently, concurrent reads and writes will be reduced.

![Isolation Level](./images/isolation_levels.PNG)

## Transaction deadlock

Deadlock occurs when two or more transactions lock the same resources, creating a cycle of dependency

```sql
-- Transaction 1
    START TRANSACTION;
    UPDATE StockPrice SET close = 45.50 WHERE stock_id = 4 and date = ‘2020-05-01’;
    UPDATE StockPrice SET close = 19.80 WHERE stock_id = 3 and date = ‘2020-05-02’;
    COMMIT;
-- Transaction 2
    START TRANSACTION;
    UPDATE StockPrice SET high = 20.12 WHERE stock_id = 3 and date = ‘2020-05-02’;
    UPDATE StockPrice SET high = 47.20 WHERE stock_id = 4 and date = ‘2020-05-01’;
    COMMIT;
```

After these two transactions finish running the first command, when running the second command. The records with the corresponding id of this transaction are being locked by another transaction, as well as another transaction that is locked by this transaction. InnoDB will return an error if a dependency circle is detected. The way InnoDB handles deadlock is that it will rollback the transaction with the fewest locked rows.

![Deadlock](./images/deadlock.JPEG)

## Transaction logging

Transaction logging makes transaction execution more efficient. Instead of updating directly to the disk table every time there is a change, it updates to the copy of the data in memory. Then the transaction log will be written to disk with append mode, this operation is very fast because only sequential I/O is required in disk, more cost-effective, after a while these changes will be applied to the actual data on disk. Because this log is written on disk, it will be durable, if the system fails after writing the transaction log to disk but before updating the changes to the main data, the storage engine can still recover those changes.

![Transaction Log](./images/transaction_log.PNG)

## Autocommit

By default, INSERT, UPDATE, and DELETE statements are wrapped in temporary transactions and committed as soon as they run, this is AUTOCOMMIT mode. To enable this mode run the sentence SET AUTOCOMMIT = 1; otherwise, SET AUTOCOMMIT = 0. Some special commands can commit a transaction while in an open transaction, such as DDL statements. We can set the isolation level for MySQL by running the SET TRANSACTION ISOLATION LEVEL command, after running this isolation level will take effect in subsequent transactions. You can set it in the configuration file for the whole server, or just set it in your session

```sql
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

We should not process tables with different storage engines in the same transaction, because there are some storage engines that will not support data rollback (MyISAM storage engine), if some error occurs during transaction execution, only some tables will be rolled back causing loss of consistency.

This is the end of the article, see you in the next blogs.
