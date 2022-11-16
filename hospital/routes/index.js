var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
var con = mysql.createPool({
  connectionLimit: 60,
  host: 'easylearning.guru',
  user: 'kcc_student',
  password: 'Kccitm.edu.in1',
  database: 'kccStudent'
});

router.post('/register', function(req, res, next) {
  var sql = "INSERT INTO `htl` (`fname`, `age`,`bp`,`pl`,`sp`,`wt`,`date`) \
  VALUES ('"+req.body.fname+"', '"+req.body.age+"','"+req.body.bp+"','"+req.body.bp+"','"+req.body.sp+"','"+req.body.wt+"','"+req.body.dat+"');"
  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.redirect('det');
    });
  });
});
router.get('/det', function (req, res) {
  con.getConnection(function (err, connection) {
    // if (err) throw err;
    connection.query("select *from htl ORDER BY id DESC LIMIT 1", function (err, data, fields) {
      // if (err) throw err;
      console.log(data);
      res.render('details', { title: 'Details', userData: data});
    });
  });
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/paint', function(req, res, next) {
  res.render('paint');
});
router.get('/hh', function(req, res, next) {
  res.render('screen');
});
router.get('/draw', function(req, res, next) {
  res.render('draw');
});

module.exports = router;
