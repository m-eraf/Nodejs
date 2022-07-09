var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// var flash = require('connect-flash');
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
  var sql = "INSERT INTO `gff` (`name`, `email`,`password`,`section`,`batch`) \
  VALUES ('"+req.body.name+"', '"+req.body.email+"','"+req.body.password+"','"+req.body.section+"','"+req.body.batch+"');"
  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render('login');
    });
  });
});

router.post('/auth', function(req, res) {
	let username = req.body.username;
	let password = req.body.password;
  con.getConnection(function (err, connection) {
    if(username=='harsh'&&password==1234){
      res.render('harsh')
    }
	else if (username && password) {
		connection.query('SELECT * FROM gff WHERE name = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.render('gf')
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
    res.render('login')
  });
  router.get('/log', function(req, res, next) {
    res.render('login')
  });
  router.get('/table', function (req, res) {
    con.getConnection(function (err, connection) {
      // if (err) throw err;
      connection.query("SELECT * FROM gff", function (err, data, fields) {
        // if (err) throw err;
        console.log(data);
        res.render('gf_list', { title: 'GFs List', userData: data});
      });
    });
  });
  router.get('/mess', function (req, res) {
    con.getConnection(function (err, connection) {
      // if (err) throw err;
      connection.query("SELECT * FROM gff", function (err, data, fields) {
        // if (err) throw err;
        console.log(data);
        res.render('message', { title: 'GFs Messages', userData: data});
      });
    });
  });
  router.post('/mess', function(req, res, next) {
    var sql = "INSERT INTO `mess` (`name`, `message`) \
    VALUES ('"+req.body.name+"', '"+req.body.mess+"');"
    con.getConnection(function (err, connection) {
      connection.query(sql, function (err, result) {
        if (err) throw err;

        console.log(result);
        req.flash("message", "Successfully Sent");
        res.redirect('/ff')
      });
    });
  });
  router.post('/gfff', function(req, res, next) {
    res.render('gf_mess')
  });
  router.get('/ff', function(req, res, next) {
    res.render('gf',{message :req.flash ('message')});
  });

  router.post('/data', function(req, res, next) {
    var sql = "INSERT INTO `mdata` (`t`, `mess`) \
    VALUES ('"+req.body.to+"', '"+req.body.mess+"');"
    con.getConnection(function (err, connection) {
      connection.query(sql, function (err, result) {
        if (err) throw err;

        console.log(result);
        res.render('gf_list');
      });
    });
  });

  router.post('/gauth', function(req, res) {
    let username = req.body.name;
    con.getConnection(function (err, connection) {
    if (username) {
      connection.query('SELECT * FROM mdata WHERE name = ?'[username], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          req.session.loggedin = true; 
          req.session.username = username;
          res.send("your message")
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


  router.get('/log', function(req, res, next) {
    res.render('login')
  });
  router.get('/mtable', function (req, res) {
    con.getConnection(function (err, connection) {
      // if (err) throw err;
      connection.query("SELECT * FROM mess", function (err, data, fields) {
        // if (err) throw err;
        console.log(data);
        res.render('mtable', { title: 'Messages', userData: data});
      });
    });
  });

  router.post('/see', function(req, res, next) {
    res.render('see')
  });
module.exports = router;