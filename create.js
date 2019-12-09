 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');
 const port = 4000 ; 
 var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password:"root" 
   password: "1234" 
 , database: "todo"
}); 

con.connect(function(err) {
  if (err) throw err ;  console.log("Connected!");
  // con.query("CREATE DATABASE todo", function (err, result) { if (err) throw err;  console.log("Database created"); });

//   var sql ="CREATE TABLE data (id INT UNSIGNED NOT NULL AUTO_INCREMENT ," +
//  " input VARCHAR(255) NOT NULL , status  BOOLEAN , PRIMARY KEY (`id`) ) ";
// con.query(sql, function (err, result) {  if (err) throw err ;   console.log("Table created"); });

//   var sql ="INSERT INTO student (firstName, LastName , grade ) VALUES ('Francesco', 'Lenahan' , '78')";
//   con.query(sql, function (err, result) {  if (err) throw err;   console.log("insert created");});
});
  
       app.use(bodyParser.json());

            app.post( "/todo", (req, res) =>{
                   
                 s ="INSERT INTO data  ( `input`, `status`) VALUES ( '" + req.body.input +" ', '" + req.body.status +  "' ) ;" 
                   
                 con.query(s, function (err, result) {
                    if (err) throw err;
                    let n = { id :result.insertId , input : req.body.input  , status :req.body.status };
                    console.log(result);
                    return res.status(201).send(n);  
                  }); }); 


      app.put('/todo/:id', (req, res) => {
                let id=req.params.id;
              con.query("UPDATE data SET status = "+ req.body.status +" WHERE id = "+ id ,
               function (err, result) {
                if (err) throw err;
                 return res.status(201).send(result); 
                   });}); 




          app.delete('/todo/', (req, res) => {
                          let id=req.body.id;
                          con.query("DELETE FROM data WHERE id IN (" + id +")", function (err, result) {
                          if (err) throw err;
                          return res.status(201).send(result);  });
                        });



        app.get('/todo', (req, res) =>{
                  con.query("SELECT * FROM  data ", function (err, result) {
                  if (err) throw err ; 
                  res.header("Access-Control-Allow-Origin", "*");
                  res.header("Access-Control-Allow-Headers", "*");
                    res.send(result);
                  });
 });


app.listen(port);
// //DESCRIBE
// const months = ['Jan', 'March', 'April', 'June'];
// months.splice(1, 0, 'Feb');
// // inserts at index 1
// console.log(months);
// // expected output: Array ["Jan", "Feb", "March", "April", "June"]

// months.splice(4, 1, 'May');
// // replaces 1 element at index 4
// console.log(months);
// // expected output: Array ["Jan", "Feb", "March", "April", "May"]
