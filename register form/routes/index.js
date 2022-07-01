var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let alert = require('alert');


var con = mysql.createPool({
  connectionLimit: 60,
  host: 'easylearning.guru',
  user: 'kcc_student',
  password: 'Kccitm.edu.in1',
  database: 'kccStudent'
});

router.get('/reg', function(req, res, next) {
  res.render('register')
});


router.post('/register', function(req, res, next) {
  var sql = "INSERT INTO `username` (`username`, `pass`) \
  VALUES ('"+req.body.fullname+"', '"+req.body.password+"');"
  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render('index');
    });
  });
});

router.post('/auth', function(req, res) {
	let username = req.body.username;
	let password = req.body.password;
  con.getConnection(function (err, connection) {
	if (username && password) {
		connection.query('SELECT * FROM username WHERE username = ? AND pass = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.render('thank')
			} else {
				alert('Incorrect Username and/or Password!');
        res.redirect('log')
			}			
			
		});
	} else {
		alert("Please enter Username and Password!");
    res.redirect('log')
	}
});
});
  router.get('/', function(req, res, next) {
    con.getConnection(function(err) {
      if (err) console.log("err");
      console.log("Connected to mySQL server!");
    });
    res.render('index')
  });
  router.get('/log', function(req, res, next) {
    res.render('login')
  });

module.exports = router;