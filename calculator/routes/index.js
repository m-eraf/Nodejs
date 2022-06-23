var express = require('express');
var router = express.Router();
var _ = require('underscore');
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 50,
  host : 'easylearning.guru',
  user :  'kcc_student',
  password : 'Kccitm.edu.in1',
  database : 'kccStudent'
});

router.get('/',function(req, res){
       res.render('index');
    });

router.all('/add',function(req, res){
  console.log("ADDITION");
  console.log(req.body);
  var o = "+";
  var x = parseInt(req.body.a);
  var y =parseInt(req.body.b);
  var result =x+y;
  console.log(result);
  res.json(result);
  pool.getConnection(function (err,connection){
    connection.query("INSERT INTO calcu (num1, num2 , oper, sol) VALUES ('"+x+"', '"+y+"','"+o+"','"+result+"')",function(err,rows){
       connection.release();
       if(err) throw err;
       else console.log(rows.length);
    });
 });
});

router.all('/sub',function(req, res){
  console.log("SUBTRACTION");
  console.log(req.body);
  var o = "-";
  var x = parseInt(req.body.a);
  var y =parseInt(req.body.b);
  var result =x-y;
  console.log(result);
  res.json(result);
  pool.getConnection(function (err,connection){
    connection.query("INSERT INTO calcu (num1, num2 , oper, sol) VALUES ('"+x+"', '"+y+"','"+o+"','"+result+"')",function(err,rows){
       connection.release();
       if(err) throw err;
       console.log(rows.length);
    });
 });
});

router.all('/mul',function(req, res){
  console.log("MULTIPLICATION");
  console.log(req.body);
  var o = "*";
  var x = parseInt(req.body.a);
  var y =parseInt(req.body.b);
  var result =x*y;
  console.log(result);
  res.json(result);
  pool.getConnection(function (err,connection){
    connection.query("INSERT INTO calcu (num1, num2 , oper, sol) VALUES ('"+x+"', '"+y+"','"+o+"','"+result+"')",function(err,rows){
       connection.release();
       if(err) throw err;
       console.log(rows.length);
    });
 });

});


router.get('/jquery',function(req, res){
  res.render('jquery');
});
router.get('/check',function(req, res){
  res.render('check');
});
module.exports = router;