var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: null,
  database: "student_manager"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Đã kết nối!");
  con.query("SELECT * FROM my_student", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});