 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');
 const port = 4000 ; 
 var alldata =[] ,item , index ;
 var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password:"root" 
   password: "1234" 
 , database: "todo"
}); 
let pagesize=5;
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
              let a = [  req.body.input,    req.body.status  ] ,
                    sqlp ="INSERT INTO data  ( `input`, `status`) VALUES ( '" +
                      a[0] +" ', '" + a[1] +  "' ) ;" ;

                    con.query(sqlp, function (err, result) {
                    if (err) throw err;
                    let n = { id :result.insertId , input : a[0]  , status : a[1] };
                    alldata.push (n);
                    console.log(n);
                    console.log(a);
                    return res.status(201).send(n);  
                  });
                }); 

      app.put('/todo/:id', (req, res) => {
                let id=req.params.id;
                 console.log(id , req.body);
                alldata.map((todo, i) => {
                    if (todo.id == id) {
                     todo.status = req.body.status || todo.status ; 
                     item =todo ;
                    } });
        
         var sqlp ="UPDATE data  SET  status =  " + item.status +  "  WHERE id = " + id  ;
             
              con.query(sqlp, function (err, result) {
              if (err) throw err;
              console.log("updet  created");
            });  
            return res.status(201).send(alldata);

                    });

          app.delete('/todo/:id', (req, res) => {
                          let id=req.params.id;
                        console.log(id);
                          alldata.map((todo, index) => {
                            if (todo.id == id) {
                              alldata.splice(index, 1);
                              console.log(todo);   }  });
                          var sqld ="DELETE FROM data WHERE id = " + id ;
                          con.query(sqld, function (err, result) {
                          if (err) throw err;
                          console.log("delete  created");
                        });
                          console.log(alldata);
                          return res.send(alldata); 
                        });

    app.get('/todo', (req, res) =>{
       var sql ="SELECT * FROM  data ";
              con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("select created");
              alldata= result;
               console.log(alldata);
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "*");
                res.send(result);
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

app.listen(port);
//DESCRIBE