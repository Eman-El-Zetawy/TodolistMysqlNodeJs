var tabal =document.getElementById("tabal");
var input =document.getElementById("input-page");
var button =document.getElementById("button");
var errorMassage =document.getElementById("error");
var pagesize = ''  , s=['id', 'firstName' ,'lastName' ,'grade'] ;
const my =new Headers();

button.addEventListener("click" , function(){ 
pagesize = input.value ;
tabal.innerHTML = '';
if(pagesize !==''){

 fetch('http://localhost:5000/student?page='+pagesize,{
        method:'GET', 
        headers : my 
    })
    .then( res => res.json())
    .then((data) => {
     
     console.log(data);
      
      if(data==""){
        errorMassage.innerHTML ='THIS IS PAGE IS EMPTY';
        errorMassage.style='background: white';
      }else{
        errorMassage.innerHTML ='';
        errorMassage.style='background: none';
        for (var i = 0; i < data.length; i++) {
         let l= '';
         for(var j=0 ; j<s.length ; j++){
             let t =s[j];
            l +='<th class="th">'+data[i][t] +'</th>';
         }  
          tabal.innerHTML +=  '<tr>'+l +'</tr>';
     } 
    }
    });}
});
  
