var mysql = require('mysql');

var con = mysql.createConnection({
    host: "easylearning.guru",
    user: "kcc_student",
    password: "Kccitm.edu.in1",
    database: "kccStudent"
  });
  con.connect((err) => {
    if(err) throw err;
    console.log('Database Connected..');
});

module.exports = con;