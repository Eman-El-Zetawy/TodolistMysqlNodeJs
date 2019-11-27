 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');
 const port = 5000 ; 
 var alldata =[] ,item , index ;
 var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
 // password:"root" ,
  password: "1234" ,
 database: "st"
}); 
let pagesize=5;
con.connect(function(err) {
  if (err) throw err ;  console.log("Connected!");
  // con.query("CREATE DATABASE st", function (err, result) { if (err) throw err;  console.log("Database created"); });

//   var sql ="CREATE TABLE student (id INT UNSIGNED NOT NULL AUTO_INCREMENT , firstName VARCHAR(255) NOT NULL , lastName VARCHAR(255) NOT NULL  , grade INT UNSIGNED , PRIMARY KEY (`id`) ) ";
// con.query(sql, function (err, result) {  if (err) throw err ;   console.log("Table created"); });

//   var sql ="INSERT INTO student (firstName, LastName , grade ) VALUES ('Francesco', 'Lenahan' , '78')";
//   con.query(sql, function (err, result) {  if (err) throw err;   console.log("insert created");});

   var sql ="SELECT * FROM student ";
              con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("select created");
              alldata= result;
 
    
    app.get('/student', (req, res) =>{
                  let page=req.query.page;
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "*");
              start=(page-1)*pagesize;
                end=start+ pagesize;
                res.send(result.slice(start,end));
              });
});

app.get( "/student/:id", (req, res) =>{
                let id=req.params.id;
                var sqlid ="SELECT * FROM student WHERE id="+id;
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "*");
                con.query(sqlid, function (err, result) {
                if (err) throw err;
                console.log("select created\n");
                console.log(result);
              let thisId = result.find(i=>i.id==(id*1));
              console.log(thisId);
              if(thisId == undefined){
                  res.send(id);
              }
              res.send(thisId);
              });
});

            app.use(bodyParser.json());
            app.post( "/student", (req, res) =>{
              let todo = [  req.body.firstName,    req.body.lastName ,  req.body.grade ] ,
                    sqlp ="INSERT INTO student  ( `firstName`, `lastName`,`grade`) VALUES ( '" +
                      todo[0] +" ', '" + todo[1] + "',' " + todo[2] + "' ) ;" ;

                    con.query(sqlp, function (err, result) {
                    if (err) throw err;
                    let n = { id :result.insertId , firstName : todo[0]  , lastName : todo[1] , grade : todo[2]};
                    alldata.push (n);
                    console.log(n);
                    console.log(todo);
                    return res.status(201).send(todo);  
                  });
                });


                app.delete('/student/:id', (req, res) => {
                  let id=req.params.id;
                 console.log(id);
                  alldata.map((todo, index) => {
                    if (todo.id == id) {
                       alldata.splice(index, 1);
                       console.log(todo);   }  });
                  var sqld ="DELETE FROM student WHERE id = " + id ;
                  con.query(sqld, function (err, result) {
                  if (err) throw err;
                  console.log("delete  created");
                 });
                  console.log(alldata);
                   return res.send(alldata); 
                });

            app.put('/student/:id', (req, res) => {
                let id=req.params.id;
              
                alldata.map((todo, i) => {
                    if (todo.id == id) {
                    item = todo ;
                    index = i ;
                    } });
                    let  Todo = {
                            id: id ,
                            firstName: req.body.firstName || item.firstName,
                            lastName: req.body.lastName || item.lastName,
                            grade: req.body.grade || item.grade,
                          };
                          console.log(Todo);
                          alldata.splice(index, 1, Todo);
        var sqlp ="UPDATE student  SET id= " +Todo.id+ ", firstName = '" +Todo.firstName +
        "', lastName = '" + Todo.lastName + "' , grade = '" + Todo.grade + "' WHERE id = " + id  ;
        con.query(sqlp, function (err, result) {
        if (err) throw err;
        console.log("updet  created");
      });  
      return res.send(Todo);
              });

});
app.listen(port);
