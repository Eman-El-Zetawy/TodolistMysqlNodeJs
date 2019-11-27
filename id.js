var tabal =document.getElementById("tabal");
var inputid =document.getElementById("input-id");
var button =document.getElementById("button");
var errorMassage =document.getElementById("error");
var id  , s=['id', 'firstName' ,'lastName' ,'grade'] ;
button.addEventListener("click" , function(){
id = inputid.value ;
tabal.innerHTML ='';
 errorMassage.innerHTML = " ";
errorMassage.style='background: none';
 fetch('http://localhost:5000/student/'+id,{
        method:'GET'
    })
    .then( res => res.json())
    .then((data) => {
     array= data;
   if(array.id ==undefined){
                errorMassage.innerHTML = " Does not exist this Id ";
                errorMassage.style='background: white';
                console.log(array);}
      
       else {   
       
            var l='';
        tabal.innerHTML ='<tr>';
         for(var j=0 ; j<s.length ; j++){
             let t =s[j];
            l +='<th class="th">'+array[t] + '</th>';
         }
          tabal.innerHTML += l+'</tr>';
          console.log(array);}
     
    });
});