1. Install các module cần thiết

npm init
npm install express express-fileupload body-parser mysql ejs req-flash --save
npm install nodemon -g
npm install ejs --save
npm install express-session
npm install express mongoose body-parser cors jsonwebtoken bcryptjs --save
npm audit fix

2. Tạo database và các bảng cần thiết trong file database.sql
   
3. Test database connect bằng câu lệnh: node testDBconnect.js

4. Chạy chương trình bằng câu lệnh: node app.js
