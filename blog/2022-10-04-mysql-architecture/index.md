---
slug: mysql-series-mysql-architecture
title: MySQL series - Tổng quan kiến trúc MySQL
authors: tranlam
tags: [Bigdata, MySQL, Database, Data Engineering]
image: ./images/architecture.PNG
---

Chào các bạn, gần đây mình có tìm hiểu sâu hơn về MySQL vì mình nghĩ làm data thì nên nắm vững một cơ sở dữ liệu quan hệ nào đó. Khi đã chắc một RMDBS thì các RMDBS khác cũng sẽ có nhiều nét tương đồng. Thời gian tới mình sẽ có một series về MySQL, đây là bài viết đầu tiên.

<!--truncate-->

### 1. Các thành phần trong kiến trúc MySQL
MySQL được sử dụng rộng rãi không chỉ ở những ứng dụng nhỏ mà còn ở các doanh nghiệp lớn, nhờ các đặc trưng của kiến trúc linh hoạt của nó. 

![Architecture](./images/architecture.PNG)

Tầng cao nhất là tầng Clients, layer này thường không chỉ có ở duy nhất MySQL. Chúng là dịch vụ như xử lý connection, xác thực, bảo mật,…

Tầng thứ hai là tầng chứa các code phục vụ việc phân tích các truy vấn, tối ưu và chứa các hàm built in tương tác với database như dates, times, math, encryption,… tất cả các tính năng tương thích với nhiều storage engines như stored procedures, triggers, views,…

Tầng thứ ba là storage engines, có nhiệm vụ lưu trữ và lấy các dữ liệu lưu trữ trong MySQL. Mỗi storage engines có các mặt tốt và các mặt không tốt của riêng chúng. MySQL server tương tác với chúng bởi các storage engine API, chứa nhiều hàm low-level, các hoạt động như bắt đầu một transaction, tìm bản ghi với primary key tương ứng. Storage engines chỉ phản hồi lại các request từ server, còn phân tích các câu truy vấn được thực hiện ở tầng thứ hai.

### 2. Quản lý kết nối và bảo mật
Với cấu hình mặc định, mỗi kết nối từ client sẽ chiếm một thread, và các truy vấn sẽ chạy trong thread đó. Server sẽ có một cache các thread sẵn sàng có thể sử dụng, nên chúng sẽ không cần tạo ra và huỷ đi mỗi khi có một kết nối mới từ client.

Khi client kết nối, server sẽ cần xác thực kết nối đó dựa trên host, username, password. Sau khi đã connect thì server sẽ kiểm tra xem client đó có quyền thế nào, vào các tài nguyên nào của database (ví dụ như quyền SELECT bảng nào ở database nào,…).

### 3. Bộ tối ưu hoá và trình chạy

![Overall](./images/overall.PNG)

Khi chạy, MySQL sẽ 
- Tìm trong query cache để xem kết quả của truy vấn có thể tìm được thì nó trả lại kết quả luôn, nếu không nó thực hiện các bước tiếp theo. Kích thước bộ nhớ của query cache được gán trong biến ```query_cache_size```, nếu cập nhật biến này, MySQL sẽ xoá hết từng truy vấn được cache một và khởi tạo lại query cache (việc này có thể tốn nhiều thời gian).
- Phân tích các câu truy vấn thành cây chứa thông tin của truy vấn đó. Câu truy vấn có thể bị viết lại hoàn toàn, thứ tự bảng được đọc sẽ khác đi, index cần chọn như thế nào,… Ta có thể can thiệp vào quá trình phân tích đó bằng việc dùng các hint để quyết định xem trình tự chạy sẽ như thế nào. Khi này bộ parser sẽ xây được một cây phân tích cho truy vấn, bên cạnh đó, nó còn kiểm tra cú pháp của câu truy vấn.
- Bộ processor sẽ kiểm tra thêm một số rằng buộc khác như bảng, cột hoặc database này có tồn tại hay không, quyền hạn của user thực hiện truy vấn đến những tài nguyên nào.
- Sau đó, cây phân tích sẽ được cho qua một bộ optimizer để chuyển thành query execution plan. Một câu truy vấn MySQL có thể được chạy theo nhiều cách, optimizer sẽ tìm cách tối ưu chi phí nhất có thể (đơn vị là 4KB data page), chi phí này có thể được xem bằng cách chạy ```SHOW STATUS LIKE 'Last_query_cost';```. Bộ optimizer không thực sự quan tâm phía dưới sử dụng storage engines nào, nhưng việc chọn storage engine có ảnh hưởng lớn đến việc server tối ưu các query. vì server cần các thông tin từ storage engines ví dụ như chỉ số thống kê của các bảng, chi phí thực hiện các hoạt động, việc hỗ trợ index như thế nào hay khả năng tính toán của storage engines để tối ưu việc chạy hơn. Bộ optimizer có thể không chọn được plan tốt nhất để chạy do các chỉ số thống kê từ storage engines không chính xác tuyệt đối, metric chi phí có thể không tương đương với chi phí chạy query, MySQL sẽ cố gắng giảm thiểu chi phí chứ không tăng tốc độ của truy vấn, hay các hàm user-defined function sẽ không được xét bởi bộ optimizer.
- Query execution plan là một dạng cây chứa từng bước để tạo ra kết quả cho truy vấn, server sẽ thực hiện nhiều lần các bước đó cho đến khi không còn bản ghi nào cần lấy nữa. Query execution engine giao tiếp với storage engines bởi các storage engine API để thực hiện các hoạt động theo query execution plan.
- MySQL storage engines là một hệ thống quản lý với mỗi database là một đường dẫn con trong đường dẫn data của filesystem đó. Khi tạo một bảng, thông tin bảng sẽ được chứa trong file .frm (ví dụ như thông tin bảng ```users``` sẽ được lưu trong file ```user.frm```).
- Tiếp đến, truy vấn sẽ được chạy và trả về kết quả cho client. MySQL đồng thời cũng lưu kết quả của truy vấn trong query cache.

Cuối cùng, việc cache lại các kết quả của các truy vấn hay sử dụng có thể cải thiện hiệu năng. Trước đây, MySQL có một bộ query cache trong kiến trúc của nó, do là nút thắt cổ chai trong môi trường có độ đọc ghi đồng thời cao, query cache này trong các phiên bản mới đã không được sử dụng nữa, thay vào đó thường dùng cách cache dữ liệu khác như Redis,...

Trên đây là tổng quan về kiến trúc của MySQL và quy trình chạy một truy vấn. Hẹn gặp lại các bạn ở các bài viết tiếp theo.