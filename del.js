var inputid =document.getElementById("input-id");
var button =document.getElementById("button");
var errorMassage =document.getElementById("error");

button.addEventListener("click" , function(){
 let id = inputid.value ;
console.log(id);
fetch('http://localhost:5000/student/'+ id ,{
        method:'DELETE', 
    })
    .then( res =>
         res.json())
    .then(data => {
      console.log(data)
        errorMassage.innerHTML = "done" ;
    errorMassage.style='background: white';
    });
});