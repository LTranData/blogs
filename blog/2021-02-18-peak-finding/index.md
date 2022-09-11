---
slug: peak-finding
title: Thuật toán tìm đỉnh Peak Finding
authors: tranlam
tags: [peak, peak finding, algorithms]
image: ./images/intro.PNG
---

![Intro](./images/intro.PNG)

Hôm nay mình sẽ nói về môt thuật toán cực kì cơ bản mà mình và hầu như các bạn bắt đầu học về lập trình thuật toán đều đã làm. Đó chính là thuật toán tìm đỉnh Peak Finding.

<!--truncate-->

### 1. Giới thiệu thuật toán
Trong một mảng, một số được gọi là một "peak" khi và chỉ khi các phần tử liền kề nó nhỏ hơn hoặc bằng phần tử được xét. Tưởng tượng rằng có một dãy núi như sau

![Peaks](./images/peaks.PNG)

Các mũi tên đỏ ở trên trỏ đến các đỉnh (peak) của một dãy núi, vì các điểm đó cao hơn các điểm lân cận xung quanh nó (các điểm ở sườn núi).

Để trực quan hơn trong lập trình, ta lấy ví dụ với mảng sau:
![1D Array](./images/1Darr.PNG)

Xét mảng các kí hiệu như trên, phần tử ở vị trí thứ 3 được gọi là một peak khi và chỉ khi **${c \ge b}$** và **${c \ge d}$**. Phần tử thứ 9 được gọi là một peak khi và chỉ khi **${i \ge h}$**.

Chú ý rằng: 
* Trong một mảng, sẽ luôn tồn tại ít nhất một peak.
* Bài toán này của chúng ta sẽ là tìm một peak chứ không tìm tất cả các peak.

### 2. Tìm peak trong mảng 1 chiều
Giả sử ta có một mảng 1 chiều gồm **${n}$** phần tử, tìm một peak của mảng đó.

#### 2.1. Cách 1: Duyệt tuyến tính (linear traversing)
**Ý tưởng:** Duyệt qua từng phần tử của mảng và kiểm tra xem phần tử đang xét có thỏa mãn tính chất là một peak hay không.

**Phân tích thuật toán:** Mỗi phần tử đang được duyệt sẽ có các câu lệnh điều kiện để kiểm tra xem phần tử đó có là peak, các câu lệnh điều kiện này tốn constant time ${\Theta(1)}$. Trong trường hợp xấu nhất, ta sẽ phải duyệt hết tất cả **${n}$** phần từ của mảng mới tìm được peak. Do vậy, worst case của thuật toán sẽ có time complexity là ${\Theta(n)}$.

#### 2.2. Cách 2: Duyệt nhị phân (binary search)
**Ý tưởng:** Trong cách này, ta sẽ luôn nhìn vào vị trí ở giữa của mảng được duyệt và quyết định xem ta sẽ duyệt nửa nào tiếp theo của mảng đó để tìm ra peak.

**Thuật toán:** 
* Nhìn vào vị trí ${\frac{n}{2}}$.
* Nếu ${a[\frac{n}{2}] \lt a[\frac{n}{2} - 1]}$, ta nhìn vào nửa trái (các phần tử ${1, 2,...,\frac{n}{2} - 1)}$ của mảng đang xét để tìm peak.
* Nếu ${a[\frac{n}{2}] \lt a[\frac{n}{2} + 1]}$, ta nhìn vào nửa phải (các phần tử ${\frac{n}{2} + 1, \frac{n}{2} + 2,..., n)}$ của mảng đang xét để tìm peak.
* Nếu không thỏa mãn cả 2 điều kiện trên, ta trả về phần tử vị trí ${\frac{n}{2}}$ chính là một peak.

Để giải thích cho điều này, mình có một hình vẽ để cho trực quan hơn

![1D Expression](./images/1Dexp.PNG)

Mũi tên đỏ trỏ tới vị trí đang xét. Giả sử ta đang đứng trên một vị trí ở dãy núi, để ta có thể trèo lên đỉnh, ta sẽ luôn ngó sang bên mà ta thấy vị trí của nó cao hơn vị trí ta đang đứng, và đó cũng là thuật toán giải quyết cho bài toán này.

**Phân tích thuật toán:** Sử dụng chia để trị (divide and conquer), ta có biểu thức sau
<p style={{textAlign: "center"}}>

${T(n) = T(\frac{n}{2}) + \Theta(1)}$

</p>

Time complexity cho các câu điều kiện so sánh ${\Theta(1)}$, base case ở đây là ${T(1) = \Theta(1)}$.
Từ đó, ${T(n) = \Theta(1) + \Theta(1) +...+ \Theta(1) = \Theta(log{_2}{n})}$.

**Code Python**
```python
import math
ini_arr = [10, 20, 15, 2, 23, 90, 67]

def peak_finding(arr):
    length = len(arr)
    middle = math.floor(length / 2)
    if length == 1:
        return arr[0]
    if length == 2:
        return arr[0] if (arr[0] >= arr[1]) else arr[1]
    if arr[middle] < arr[middle - 1]:
        return peak_finding(arr[:middle])
    elif arr[middle] < arr[middle + 1]:
        return peak_finding(arr[middle + 1:])
    else:
        return arr[middle]


print(peak_finding(ini_arr))
```
Output
```python
20
```

### 3. Tìm peak trong mảng 2 chiều
Ta hình dung mảng 2 chiều **${m \times n}$** được biểu diễn dưới dạng ma trận m hàng và n cột
![2D Matrix](./images/2Dmat.PNG)

Một phần tử được coi là một peak khi và chỉ khi nó lớn hơn hoặc bằng tất cả các phần tử liền kề theo chiều dọc và ngang.

#### 3.1. Duyệt trực tiếp
**Ý tưởng:** Duyệt qua từng phần tử của mảng và kiểm tra xem phần tử đang xét có thỏa mãn tính chất là một peak hay không.

**Phân tích thuật toán:** worst case của thuật toán sẽ có time complexity là ${\Theta(m \times n)}$.

#### 3.2. Thuật toán Greedy Ascent
**Ý tưởng:** Chúng ta bắt đầu tại một điểm ngẫu nhiên. Với điểm đang xét, chúng ta so sánh nó với 4 điểm liền kề theo các chiều dọc và ngang, nếu có giá trị nào lớn hơn điểm đang xét, ta sẽ xét điểm tiếp theo là điểm đó.

**Phân tích thuật toán:** Thoạt nghĩ qua thì ta thấy thuật toán có vẻ sẽ hiệu quả hơn, nhưng worst case của nó vẫn là ${\Theta(m \times n)}$ khi mà ta phải duyệt phần lớn các phần tử.

#### 3.3. Thuật toán Jamming Binary Search
**Ý tưởng:** Ta dựa trên cách tìm kiếm Binary Search như áp dụng với mảng một chiều ở trên.

**Thuật toán:** 
* Chọn cột ở giữa ${i = \frac{n}{2}}$. Tìm giá trị lớn nhất của cột đó. Giả sử giá trị đó nằm ở vị trí ${(j, i)}$.
* So sánh các phần tử ở vị trí ${(j, i - 1), (j, i), (j, i + 1)}$.
* Ta chọn ma trận con phần bên trái nếu ${a[j, i - 1] \gt a[j, i]}$, chọn ma trận con phần bên phải nếu ${a[j, i + 1] \gt a[j, i]}$ để xét bước tiếp theo.
* Nếu không, ta trả về giá trị ${a[j, i]}$ là một peak.

**Phân tích thuật toán:** Base case ở đây sẽ là chúng ta chỉ có một cột duy nhất, tìm giá trị lớn nhất của cột đó. Từ đó, ta có biểu thức sau
<p style={{textAlign: "center"}}>

${T(m, n) = T(m, \frac{n}{2}) + \Theta(m) }$

</p>

Với ${T(m, 1) = \Theta(m)}$.
Do vậy, ${T(m, n) = \Theta(m) + \Theta(m) +...+ \Theta(m) = \Theta(mlog{_2}{n})}$.

**Code Python**
```python
import numpy as np
import math
ini_matrix = np.array([[14, 13, 12, 6], [15, 9, 11, 7], [
                      16, 17, 19, 92], [17, 18, 17, 12]])

def peak_finding_2d(matrix):
    (rows, cols) = matrix.shape
    j = math.floor(cols / 2)
    i_in_max = np.argmax(matrix[:, j])
    if cols == 1:
        return matrix[i_in_max, j]
    if cols == 2:
        peak_1 = np.amax(matrix[:, 0])
        peak_2 = np.amax(matrix[:, 1])
        return peak_1 if peak_1 >= peak_2 else peak_2
    if matrix[i_in_max, j] < matrix[i_in_max, j-1]:
        return peak_finding_2d(matrix[:, :j])
    elif matrix[i_in_max, j] < matrix[i_in_max, j+1]:
        return peak_finding_2d(matrix[:, (j+1):])
    else:
        return matrix[i_in_max, j]


print(peak_finding_2d(ini_matrix))
```
Output
```python
92
```

<br/>
<br/>
<br/>

### 4. Tài liệu tham khảo
