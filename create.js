 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');
 const port = 4000 ; 
 var arr =[] ,item ;
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
                   
                 s ="INSERT INTO data  ( `input`, `status`) VALUES ( '" + req.body.input +" ', '" + req.body.status +  "' ) ;" ;

                    con.query(s, function (err, result) {
                    if (err) throw err;
                    let n = { id :result.insertId , input : req.body.input  , status :req.body.status };
                     arr.push (n);
                    return res.status(201).send(n);  
                  }); }); 


      app.put('/todo/:id', (req, res) => {
                let id=req.params.id;
                arr.forEach((todo, i) => {
                    if (todo.id == id) {
                     todo.status = req.body.status  ; 
                     item = todo ;
                    } });
            
              con.query("UPDATE data SET status = "+ item.status +" WHERE id = "+ id , function (err, result) {
              if (err) throw err;
            });  
            return res.status(201).send(arr);  });




          app.delete('/todo/:id', (req, res) => {
                          let id=req.params.id;

                          arr.map((todo, index) => {
                            if (todo.id == id) { arr.splice(index, 1); }  });
                          con.query("DELETE FROM data WHERE id = " + id , function (err, result) {
                          if (err) throw err; });

                          return res.send(arr); 
                        });



    app.get('/todo', (req, res) =>{
              con.query("SELECT * FROM  data ", function (err, result) {
              if (err) throw err;
              arr= result;
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "*");
                res.send(result);
              });
 });


app.listen(port);
//DESCRIBE