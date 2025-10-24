# TRẦN THỊ THU HÀ - K225480106009
# Bài tập 02: Lập trình web.
# NGÀY GIAO: 19/10/2025
# DEADLINE: 26/10/2025
# YÊU CẦU: 
## 2. NỘI DUNG BÀI TẬP:
### 2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: iisreset /stop
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
  ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.
### 2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
```
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %* 
```
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
### 2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name
### 2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
```
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },
```
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880
### 2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  -  http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  - function : để tiền xử lý dữ liệu gửi đến
  - MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  - http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị
### 2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.
### 2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- đã hiểu cách frond-end tương tác với back-end ra sao?
-----------------------------------
# TIÊU CHÍ CHẤM ĐIỂM:
1. y/c bắt buộc về thời gian: ko quá Deadline, quá: 0 điểm (ko có ngoại lệ)
2. cài đặt được apache và nodejs và nodered: 1đ
3. cài đặt được các thư viện của nodered: 1đ
4. nhập dữ liệu demo vào sql-server: 1đ
5. tạo được back-end api trên nodered, test qua url thành công: 1đ
6. tạo được front-end html css js, gọi được api, hiển thị kq: 1đ
7. trình bày độ hiểu về toàn bộ quá trình (mục 2.7): 5đ
-----------------------------------
# GHI CHÚ:
1. yêu cầu trên cài đặt trên ổ D, nếu máy ko có ổ D có thể linh hoạt chuyển sang ổ khác, path khác.
2. có thể thực hiện trực tiếp trên máy tính windows, hoặc máy ảo
3. vì csdl là tuỳ ý: sv cần mô tả rõ db chứa dữ liệu gì, nhập nhiều dữ liệu test có nghĩa, json trả về sẽ có dạng như nào cũng cần mô tả rõ.
4. có thể xây dựng nhiều API cùng cơ chế, khác tính năng: như tìm kiếm, thêm, sửa, xoá dữ liệu trong DB.
5. bài làm phải có dấu ấn cá nhân, nghiêm cấm mọi hình thức sao chép, gian lận (sẽ cấm thi nếu bị phát hiện gian lận).
6. bài tập thực làm sẽ tốn nhiều thời gian, sv cần chứng minh quá trình làm: save file `readme.md` mỗi khoảng 15-30 phút làm : lịch sử sửa đổi sẽ thấy quá trình làm này!
7. nhắc nhẹ: github ko fake datetime được.
8. sv được sử dụng AI để tham khảo.
-----------------------------------
# BÀI LÀM: 
## 2.1. Cài đặt Apache web server:
### Bước 1: Vô hiệu hóa IIS đang chạy
- Mục đích của vô hiệu hóa IIS là để tránh xung đột cổng 80 giữa IIS và Apache.
- Nhấn **Start -> gõ *'cmd'* -> chọn *'Run as administrator'***

### Bước 2: Tải và cài Apache 
- Truy cập vào trang chính thức **https://www.apachehaus.com/cgi-bin/download.plx** hoặc **https://www.apachelounge.com/download/** để download Apache về máy.
- Sau khi down về, giải nén vào thư mục ***D:\Apache\\Apache24***

### Bước 3: Cấu hình Apache 
Để tạo website có domain: tranthithuha.com ta phải tạo domain cục bộ, thực hiện như sau: 
#### Cấu hình file httpd.conf
Mở file `D:\Apache\Apache24\conf\httpd.conf` sau đó thực hiện: 
  1. Sửa đường dẫn gốc 
     ```
     DocumentRoot "D:/Apache24/tranthithuha"
     <Directory "D:/Apache24/tranthithuha">
         Options Indexes FollowSymLinks
         AllowOverride All
         Require all granted
     </Directory>
     ```
   2. Kích hoạt file Virtual Hosts: Tìm dòng *#Include conf/extra/httpd-vhosts.conf* và bỏ dấu # ở đầu dòng.

#### Cấu hình file Virtual Hosts (httpd-vhosts.conf)
  1. Mở file `D:\Apache\Apache24\conf\extra\httpd-vhosts.conf`
  2. Đổi tên server:
     ```
     <VirtualHost *:80>
         ServerAdmin admin@tranthithuha.com
         DocumentRoot "D:\Apache\Apache24\tranthithuha"
         ServerName tranthithuha.com
         ErrorLog "logs/tranthithuha-error.log"
         CustomLog "logs/tranthithuha-access.log" common
     </VirtualHost>
     ```
    
#### Tạo thư mục chứa website tại D:\Apache\Apache24\tranthithuha
- Tạo một file index trong thư mục này.

### Bước 4: Fake IP trong file hosts
- Mở file `C:\Windows\System32\drivers\etc\hosts` bằng notepad và thêm dòng *127.0.0.1   tranthithuha.com*  sau đó lưu lại.

### Bước 5: Cài đặt và khởi động lại Apache
- Mở CMD quyền Administrator sau đó gõ lệnh cài đặt và khở động Apache:
  - Lệnh cài đặt: `D:\Apache\Apache24\bin\httpd.exe -k install`
  - Lệnh khởi động: `D:\Apache\Apache24\bin\httpd.exe -k start`
    
  <img width="1729" height="150" alt="image" src="https://github.com/user-attachments/assets/bf631793-af7f-4f4b-815b-e40bb908cd1c" />

- Kết quả sau khi cài đặt và chạy:
   
  <img width="1919" height="389" alt="image" src="https://github.com/user-attachments/assets/bd3f883d-4b4a-4b40-915e-659b1d019b56" />

## 2.2. Cài đặt nodejs và nodered => Dùng làm backend
### Cài đặt nodejs
- Truy cập vào `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi` để download nodejs về máy.
- Sau khi download về máy, cài đặt nodejs vào thư mục **D:/nodejs**

### Cài đặt Node-RED
#### Bước 1: Mở CMD quyền Administrator
- Trỏ vào thư mục **D:/nodejs**
- Chạy lệnh: `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"` để cài đặt Node-RED.
  
  <img width="1178" height="317" alt="image" src="https://github.com/user-attachments/assets/590f05e2-be32-4886-a5eb-d4148343c446" />


#### Bước 2: Cài đặt NSSM 
- Truy cập vào: `https://nssm.cc/release/nssm-2.24.zip` để download file. Sau đó giải nén và được file **nssm.exe**
- Copy file **nssm.exe** vào thư mục **D:\nodejs\nodered\***
- Tạo file **D:\nodejs\nodered\run-nodered.cmd** với 5 dòng sau để khởi động nodered:
  ```
  @echo off
  REM fix path
  set PATH=D:\nodejs;%PATH%
  REM Run Node-RED
  node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
  ```
  
  <img width="1613" height="545" alt="image" src="https://github.com/user-attachments/assets/336e98f6-3465-434c-abd8-c849d2232fd8" />


#### Bước 3: Cài đặt Node-RED thành Windows Service
- Mở CMD, run as administrator sau đó trỏ đến thư mục: `D:\nodejs\nodered`
- Chạy lệnh `nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"` để chạy service `a1-nodered`
- Chạy lệnh `nssm start a1-nodered`
  
  <img width="565" height="98" alt="image" src="https://github.com/user-attachments/assets/3d0fdefc-7df3-4f82-aa84-f67c2befaeaa" />
  
- Sau khi cài đặt xong, Node-RED sẽ hoạt động ở `http://localhost:1880`

  <img width="1919" height="1073" alt="image" src="https://github.com/user-attachments/assets/eafebf4c-09d7-4700-850f-50eba6ec18c4" />

## 2.3. Tạo CSDL tùy ý trên mssql (SQL Server 2022)
- Thiết kế CSDL chứa các thông tin về sản phẩm quần áo thu đông trên hệ thống.
#### Server_name: LAPTOP-B1UCCBCI\SQL_TTTHA
#### DB_name: QLShop_QuanAo
#### Table_name: SPQuanAo
#### Port 1433
- Tạo bảng dữ liệu:

  <img width="722" height="270" alt="image" src="https://github.com/user-attachments/assets/00219e6c-88c5-4c8e-9f06-b774fe35fe54" />

- Nhập dữ liệu demo:

  <img width="1585" height="313" alt="image" src="https://github.com/user-attachments/assets/f8e0dbd1-28a3-4ecf-b90a-6e5b28b0e98a" />

## 2.4. Cài đặt thư viện trên Node-RED
#### Bước 1: Mở Node-RED trên trình duyệt web bằng url `http://localhost:1880`, chọn *Manage palette* và mở tap *Install*
- Cài các thư viện sau:
  - `node-red-contrib-mssql-plus` : Kết nối đến SQL Server
  - `node-red-node-mysql` : Kết nối MySQL
  - `node-red-contrib-telegrambot` : Gửi nhận các tin nhắn qua Telegram
  - ` node-red-contrib-moment` : Xử lý thời gian dễ dàng
  - `node-red-contrib-influxdb` : Lưu dữ liệu vào InfluxDB
  - `node-red-contrib-duckdns` : Cập nhật IP động (DuckDNS)
  - `node-red-contrib-cron-plus` : Đặt lịch chạy tự động, cron job

  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6e39cf08-a3bb-450d-bd6b-a20e27363d11" />

#### Bước 2: Thêm đăng nhập Admin (sửa file `D:\nodejs\nodered\work\settings.js`)
- Mở file cấu hình settings.js : `D:\nodejs\nodered\work\settings.js`
- Tìm đến chỗ adminAuth, bỏ // ở đầu dòng (8 dòng) và thay chuỗi mã hóa mật khẩu bằng chuỗi mới.

  <img width="1007" height="305" alt="image" src="https://github.com/user-attachments/assets/ce231173-69da-47c7-b06e-c61d4a5a8e97" />

  ```
  adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuoi_ma_hoa_mat_khau",
            permissions: "*"
        }]
    },
  ```
- Mã hóa mật khẩu có thể thiết lập băng tool: `https://tms.tnut.edu.vn/pw.php`
- Chạy lại nodered bằng cách mở CMD, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  
  <img width="871" height="312" alt="image" src="https://github.com/user-attachments/assets/aaf93ae7-604a-461f-ab9a-4a15c7c3c96c" />

- Khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại `http://localhost:1880`

  <img width="1914" height="810" alt="image" src="https://github.com/user-attachments/assets/613c2427-8db5-46fa-9609-5af3b682990d" />

## 2.5. Tạo API back-end bằng nodered
### Mục tiêu của bước này là tạo API backend trên nodered để tìm kiếm sản phẩm trong SQL Server qua URL.
- Tại flow1 trên nodered, sử dụng `http in` và `http response` để tạo api
- Thêm node `MSSQL` để truy vắn tới cơ sở dữ liệu
- Logic flow sẽ gồm 4 bước theo thứ tự sau  (thứ tự nối dây):
  1. http in : dùng GET cho đơn giản, URL đặt tùy ý, ví dụ: /timkiem
     
  <img width="641" height="333" alt="image" src="https://github.com/user-attachments/assets/2aa24ac3-a895-4a2e-bebb-6b3e9085efd0" />

  2. function : để tiền xử lý dữ liệu gửi đến

  <img width="813" height="652" alt="image" src="https://github.com/user-attachments/assets/0a1eb19b-c5ef-4e9a-9781-6bb8c7ebc2fd" />

  3. MSSQL : để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý

  <img width="649" height="612" alt="image" src="https://github.com/user-attachments/assets/d6681312-0e41-480d-a661-33e77ef48e8f" />

  <img width="636" height="804" alt="image" src="https://github.com/user-attachments/assets/d5c15977-e6bc-4a9d-becc-2e4221988991" />
     
  5. http response : để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json

  <img width="641" height="508" alt="image" src="https://github.com/user-attachments/assets/de2c8a73-c454-497a-9360-c86e1f0f9ac4" />

  6.  debug : Thêm debug để quan sát giá trị trung gian

  <img width="643" height="588" alt="image" src="https://github.com/user-attachments/assets/715d264c-40ca-46b1-a34f-37e74f4529d4" />

- Kết quả:
  
  img width="1393" height="204" alt="image" src="https://github.com/user-attachments/assets/2e64a109-5e2a-482b-8a8f-ceccccc4b1b7" />




  

  
  



