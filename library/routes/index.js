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

router.get('/', function(req, res, next) {
  res.render('register')
});


router.post('/register', function(req, res, next) {
  var sql = "INSERT INTO `library` (`name`, `ncopy`,`aname`) \
  VALUES ('"+req.body.name+"', '"+req.body.copy+"', '"+req.body.aname+"');"
  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.redirect('table');
    });
  });
 router.post('/delete', function (req, res, next) {
    console.log(req.body.id)
    con.query("DELETE FROM library where id ="+req.body.id, function (err, data) {
      // if (err) res.json({code:0});
      console.log(data);
      res.render('table')
      // res.json({code:1})
    });
  });
  // router.post('/delete', function (req, res, next) {
  //   console.log(req.body.id)
  //   con.query("DELETE FROM library where id ="+req.body.id, function (err, data) {
  //     if (err) res.json({code:0});
  //     console.log(data);
  //     res.json({code:1})
  //   });
  // });
  router.get('/table', function (req, res) {
    con.getConnection(function (err, connection) {
      // if (err) throw err;
      connection.query("SELECT * FROM library", function (err, data, fields) {
        // if (err) throw err;  
        console.log(data);
        res.render('table', { title: 'Messages', userData: data});
      });
    });
  });

});

module.exports = router;