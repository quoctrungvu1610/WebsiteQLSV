const express = require('express');
const fileUpload = require('express-fileupload');
var session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const {getHomePageMark} = require('./routes/index-mark');
const {getHomePage} = require('./routes/index');
const {addStudentPage, addStudent, deleteStudent, editStudent, editStudentPage,addMarkPage, editMarkPage,deleteMark,addMark,editMark} = require('./routes/student');
const port = 5000;

// tạo kết nối tới database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_manager'
});

// kết nối tới database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes 
app.get('/home-mark',getHomePageMark)
app.get('/home', getHomePage);
app.get('/add', addStudentPage);
app.get('/edit/:Id', editStudentPage);
app.get('/delete/:Id', deleteStudent);
app.post('/add', addStudent);
app.post('/edit/:Id', editStudent);

//routes-mark
app.get('/add-mark', addMarkPage);
app.get('/edit-mark/:STT', editMarkPage);
app.get('/delete-mark/:STT', deleteMark);
app.post('/add-mark', addMark);
app.post('/edit-mark/:STT', editMark);

//login
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
 app.get('/',(req, res) =>{
 	res.render('login'); 
 });
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
