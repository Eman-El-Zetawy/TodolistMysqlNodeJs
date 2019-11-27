var tabal =document.getElementById("tabal");
var idid =document.getElementById("id");
var firstName =document.getElementById("first_name");
var lastName =document.getElementById("last_name");
var grade =document.getElementById("grade");
var button =document.getElementById("button");
var errorMassage =document.getElementById("error");

button.addEventListener("click" , function(){
  id = idid.value ;
fn = firstName.value ;
ln = lastName.value;
g =grade.value ;
console.log(fn , ln , g );
 const my = new Headers();
my.append('Content-Type', 'application/json');
 fetch('http://localhost:5000/student/'+ id,{
        method:'PUT',
        headers : my , 
        body:JSON.stringify({
           firstName :fn ,
            lastName :ln,
              grade :g
        })
    })
    .then( response=>response.json())
    .then((data) => {
      console.log(data);
      if(data==''){
         errorMassage.innerHTML ='THIS IS PAGE IS EMPTY';
         errorMassage.style='background: white';
      }else{
        errorMassage.innerHTML ='DONE';
        errorMassage.style='background: white';
      }
     
    });
});



