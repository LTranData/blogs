---
slug: mysql-series-mysql-indexing
title: MySQL series - Indexing
authors: tranlam
tags: [Bigdata, MySQL, Database, Data Engineering, Indexing]
image: ./images/indexing.PNG
---

Indexing là phương pháp giúp truy vấn nhanh hơn, là một phần rất quan trọng trong việc cải thiện hiệu năng. Đối với các bảng dữ liệu lớn, việc đánh index chính xác giúp tăng tốc độ nhanh hơn gấp nhiều lần, tuy nhiên, việc này thường không được tính toán sát sao trong quy trình thiết kế bảng. Bài viết này nói về các loại index và cách đánh index sao cho hợp lý.

![Indexing](./images/indexing.PNG)

<!--truncate-->

### 1. Các loại index
Có rất nhiều loại index thiết kế cho nhiều mục đích khác nhau. Nên nhớ rằng, index được triển khai ở storage engine, không phải ở tầng server, do vậy, chúng hoạt động khác nhau ở các storage engine khác nhau. Các loại index ở bài viết này chủ yếu về index trong InnoDB.

#### 1.1. B-tree index
B-tree index dùng cây cân bằng để lưu trữ dữ liệu của nó, hầu như tất cả storage engine của MySQL đều hỗ trợ kiểu index này (hoặc là biến thể của nó), ví dụ, NDB Cluster storage engine sử dụng cấu trúc dữ liệu T-tree cho indexing, InnoDB sử dụng B+ tree,... 
Trong B-tree, tất cả giá trị đều được sắp xếp, và các lá (leaf) đều có khoảng cách bằng nhau tới gốc (root) của cây. Dưới đây hình là mô tả cấu trúc dữ liệu B-tree. 

![B Tree](./images/BTree.PNG)

B-tree cung cấp cho ta khả năng tìm kiếm, truy cập dữ liệu tuần tự, chèn và xoá với độ phức tạp logarithmic ${O(log(n))}$. Ở root node sẽ có con trỏ trỏ đến các node con, khi ta truy vấn, storage engine sẽ biết nhánh node con phù hợp để duyệt bằng các nhìn vào các giá trị trong node pages, chứa thông tin ngưỡng trên và ngưỡng dưới giá trị các node con trong page đó. Ở tầng leaf page, các con trỏ trỏ đến dữ liệu thay vì trỏ tới các page khác.

Ở hình trên, chúng ta chỉ nhìn thấy 1 node page và các leaf page. Thực tế B-tree có rất nhiều tầng node page giữa root node và leaf nodes, độ lớn của cây dựa vào độ lớn của bảng được đánh index.

##### 1.1.1. Adaptive hash index
Khi các giá trị index được truy cập với tần số cao, InnoDB sẽ dựng một bộ hash index cho chúng ở memory trên nền của B-tree index, giúp chúng ta có thể tìm kiếm giá trị hash này rất nhanh và hiệu quả. Chế độ này là tự động bởi InnoDB, tuy nhiên, bạn vẫn có thể vô hiệu hoá adaptive hash index nếu muốn.

##### 1.1.2. Các loại truy vấn có thể dùng B-tree index
B-tree index hoạt động hiệu quả với các loại truy vấn chính xác giá trị, một khoảng giá trị, hay một tiền tố giá trị. Các truy vấn này là tốt nhất khi chúng ta dùng chúng trên cột trái nhất trong tập cột được đánh index.

```sql
CREATE TABLE People (
     last_name varchar(50) not null,
     first_name varchar(50) not null,
     dob date not null,
     KEY `idx_full_col` (last_name, first_name, dob)
) ENGINE=InnoDB;
```

- Khớp chính xác giá trị: khi các cột trong index được query khớp đúng giá trị nào đó, ví dụ ```WHERE last_name = 'lam' AND first_name = 'tran' AND dob = '1999-05-10'```. Truy vấn loại này sẽ trả về kết quả rất nhanh.
- Khớp cột trái nhất: Ví dụ nếu ta truy vấn tìm người có ```last_name = 'lam'```.
- Khớp phần đầu của cột trái nhất: Ví dụ khi ta tìm người có last_name bắt đầu bằng chữ 'L'.
- Khớp một khoảng giá trị: Khi ta cần lấy tập người có last_name ở giữa 'anh' và 'lam'.
- Khớp cột trái nhất và một khoảng giá trị cột tiếp theo: Ví dụ khi ta cần thông tin những người last_name là 'lam' và first_name bắt đầu bằng chứ 't'.

##### 1.1.3. Một số nhược điểm của B-tree index
- Nó sẽ không thực sự có ích khi điều kiện truy vấn không bắt đầu bằng cột trái nhất, cũng như không tốt khi truy vấn tìm những người có last_name kết thúc bằng chữ cụ thể.
- Các truy vấn bỏ quãng một số cột cũng không tận dụng hết được lợi ích index. Ví dụ khi tìm những người có ```last_name = 'lam' AND dob = '1999-05-10'``` mà không có điều kiện trên first_name.
- Index kiểu này sẽ không tận dụng phần các cột đằng sau cột khớp khoảng giá trị. Ví dụ, truy vấn người ```last_name = 'lam' AND first_name LIKE 't%' AND dob = '1999-05-10'``` sẽ chỉ áp dụng index trên 2 cột last_name và first_name. Với những cột ít dữ liệu phân biệt, ta có thể overcome cái này bằng việc liệt kê tất cả giá trị thay vì truy cập khoảng giá trị.

Như vậy, thứ tự của các cột trong index thực sự rất quan trọng, bạn cần xem xét mục tiêu truy vấn của ứng dụng trước khi đánh index cho các cột.

#### 1.2. Full-text index
Full-text index tìm kiếm các từ khoá trong chuỗi chữ thay vì so sánh trực tiếp cả giá trị của trường đó. Nó hỗ trợ cho việc tìm kiếm hơn là việc suy xét dữ liệu khớp với kiểu nào. Khi một cột được đánh full-text index, ta vẫn có thể đánh B-tree index trên cột đó được.

```sql
CREATE TABLE tutorial (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    title VARCHAR(200), 
    description TEXT, 
    FULLTEXT `idx_full_text` (title,description)
) ENGINE=InnoDB;
```
Full-text index được dùng bằng cú pháp ```MATCH() AGAINST()``` với tham số của ```MATCH()``` là các cột để tìm kiếm, cách nhau bằng dấu phảy, tham số của ```AGAINST()``` là chuỗi để tìm kiếm cùng loại tìm kiếm để thực hiện.

##### 1.2.1. Các loại full-text index
- Natural language search: chế độ này sẽ diễn giải chuỗi chữ tìm kiếm dưới dạng một cụm từ trong ngôn ngữ tự nhiên của con người. Chế độ này không tính các stopwords cũng như các từ ngắn hơn số kí tự tối thiếu (mặc định là 3 kí tự với InnoDB)
- Boolean search: diễn giải chuỗi chữ tìm kiếm sử dụng quy tắc ngôn ngữ truy vấn đặc biệt. Chuỗi chứ đó chứa tất cả các từ cần tìm kiếm, nó cũng có thể chứa các operator đặc biệt cho các tìm kiếm nâng cao, như một từ cần phải được xuất hiện trong chuỗi, hay từ được đánh trọng số nặng hơn hay nhẹ hơn. Các stop words sẽ bị bỏ qua trong chế độ này.
- Query expansion: là một biến thể của natural language search. Các từ trong các rows liên quan nhất được trả về sẽ được thêm vào chuỗi chữ tìm kiếm, và việc tìm kiếm sẽ được lặp lại. Truy vấn sẽ trả về các rows trong lần tìm kiếm thứ hai.

Mình sẽ không đi vào chi tiết từng loại, vì mình cũng ít khi dùng full-text index.

### 2. Lợi ích việc đánh index
Một số lợi ích của việc đánh index
- Index giúp server tiết kiệm thời gian để duyệt và truy vấn.
- Index giúp server tránh được các hoạt động như sắp xếp dữ liệu hay tạo các bảng tạm.
- Index biến việc truy cập ổ đĩa một cách ngẫu nhiên thành truy cập tuần tự, cải thiện tốc độ đọc
Một số tiêu chí đánh giá index
- Index cần phải xếp được các hàng liên quan tới nhau, gần nhau hơn.
- Các hàng được sắp xếp cần đúng với nhu cầu các truy vẫn ứng dụng của bạn cần.
- Index cần phải chứa tất cả các cột mà truy vấn ứng dụng của bạn lọc.

### 3. Chiến thuật đánh index
Việc tạo đúng các index sẽ cải thiện tốc độ truy vấn của bạn rất nhiều, từ đó giúp cho ứng dụng của bạn phản hồi nhanh hơn tới người dùng.

#### 3.1. Index tiền tố các trường text dài
Gọi index selectivity là chỉ số giữa số giá trị khác nhau của cột / tổng bản ghi của bảng. Với các cột có index selectivity cao, thì việc đánh index trên các trường này rất hiệu quả bởi vì MySQL sẽ loại bỏ được nhiều bản ghi hơn khi lọc trên các cột ấy.
Với các trường text dài, ta không thể đánh index trên cả độ dài cột vì MySQL sẽ không cho phép điều đó, do vậy ta cần tìm một lượng prefix đủ tốt của trường đó để đánh index và nó sẽ cho ta một performance đủ tốt.

Thử với dữ liệu về sản phẩm dưới đây, ta liệt kê mười nhà bán có xuất hiện nhiều nhất
```sql
select productVendor, count(1) c from `classicmodels`.`products_index`
group by productVendor
order by c desc
LIMIT 10;

+--------------------------------------------------+----+
| productVendor                                    | c  |
+--------------------------------------------------+----+
| Pressure and Safety Relief Valve                 | 10 |
| NEC United Solutions                             |  9 |
| SunGard Data Systems                             |  8 |
| Zhengzhou Esunny Information Technology Co.,Ltd. |  8 |
| Spring Support                                   |  8 |
| Ball and Plug Valve                              |  7 |
| LSAW Pipe                                        |  7 |
| Wood Mackenzie Ltd                               |  7 |
| Heat Recovery Steam Generator                    |  7 |
| Carbon Steel Flange                              |  7 |
+--------------------------------------------------+----+
```

Thử tính toán tần số xuất hiện của prefix với độ dài là 3 của trường ```productVendor```
```sql
select LEFT(productVendor, 3), count(1) c from `classicmodels`.`products_index`
group by LEFT(productVendor, 3)
order by c desc
LIMIT 10;

+------------------------+----+
| LEFT(productVendor, 3) | c  |
+------------------------+----+
| Sha                    | 44 |
| Car                    | 16 |
| Sun                    | 15 |
| Zhe                    | 13 |
| Gas                    | 12 |
| Sto                    | 11 |
| Pre                    | 11 |
| Col                    | 11 |
| She                    |  9 |
| Hea                    |  9 |
+------------------------+----+
```

Ta thấy rằng tần số xuất hiện của các giá trị prefix độ dài 3 nhiều hiện với cả giá trị cột nhiều, tương đương với việc ít giá trị khác nhau hơn, tương đương với index selectivity sẽ bé hơn nhiều. Do vậy prefix 3 không phải là lựa chọn tốt

Ta cùng tính toán index selectivity với nhiều loại độ dài prefix
```sql
select COUNT(DISTINCT LEFT(productVendor, 3))/COUNT(1) AS selectivity_3,
COUNT(DISTINCT LEFT(productVendor, 4))/COUNT(1) AS selectivity_4,
COUNT(DISTINCT LEFT(productVendor, 5))/COUNT(1) AS selectivity_5,
COUNT(DISTINCT LEFT(productVendor, 6))/COUNT(1) AS selectivity_6,
COUNT(DISTINCT LEFT(productVendor, 7))/COUNT(1) AS selectivity_7,
COUNT(DISTINCT LEFT(productVendor, 8))/COUNT(1) AS selectivity_8,
COUNT(DISTINCT LEFT(productVendor, 9))/COUNT(1) AS selectivity_9,
COUNT(DISTINCT LEFT(productVendor, 10))/COUNT(1) AS selectivity_10,
COUNT(DISTINCT LEFT(productVendor, 11))/COUNT(1) AS selectivity_11,
COUNT(DISTINCT productVendor)/COUNT(1) AS selectivity
from `classicmodels`.`products_index`;

+---------------+---------------+---------------+---------------+---------------+---------------+---------------+----------------+----------------+-------------+
| selectivity_3 | selectivity_4 | selectivity_5 | selectivity_6 | selectivity_7 | selectivity_8 | selectivity_9 | selectivity_10 | selectivity_11 | selectivity |
+---------------+---------------+---------------+---------------+---------------+---------------+---------------+----------------+----------------+-------------+
|        0.1982 |        0.2164 |        0.2218 |        0.2236 |        0.2236 |        0.2273 |        0.2309 |         0.2491 |         0.2509 |      0.2600 |
+---------------+---------------+---------------+---------------+---------------+---------------+---------------+----------------+----------------+-------------+
```

Ta thấy rằng selectivity prefix 11 rất gần với giá trị selectivity cả cột, và cũng khá phù hợp với trường text dài như cột này, nên chọn prefix 11 sẽ cân bằng được về độ lớn của index cũng như độ nhanh khi truy vấn.

```sql
ALTER TABLE `classicmodels`.`products_index` ADD KEY (productVendor(11));
```

#### 3.1. Index nhiều column

#### 3.2. Chọn đúng thứ tự cột để index