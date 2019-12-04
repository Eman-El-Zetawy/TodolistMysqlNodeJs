  /////////////////////page javascript
  var input = document.getElementById("input");
  var div = document.getElementById("div");
  var inbox = document.getElementById("inbox");
  var icon_add =document.getElementById("icon-add");
  ///////////////////////////// variable of data
  var arr=[] , z=[] ;
  var obj={};
  //////////////////////////// add event listener 
    input.addEventListener("click",function(){  input.value=""; });
    input.addEventListener("input",change_input);
    icon_add.addEventListener("click" ,main); 
    const my =new Headers();
  /////////////////////////////function key Enter
    input.addEventListener("keydown",function(e){
        if(e.key==="Enter"){
          main();
          input.value="";
        } });
    ///////////////////////FUNCTION MAIN 
    function main (){
            if(  input.value !== ""){
          const my = new Headers();
          //// false ==0 & true ===1 
  my.append('Content-Type', 'application/json');
 fetch('http://localhost:4000/todo',{
        method:'POST',
        headers : my , 
        body:JSON.stringify({
         input  :input.value,
         status : 0
        })
    }).then( response=>response.json()) .then((data) => {
      console.log(data);
         
            });

         fetch('http://localhost:4000/todo',{
                method:'GET', 
                headers : my 
            })
            .then( res => res.json())
            .then((data) => { console.log(data);z=data;
             draw(data);
          });
      
          }
        else {
        alert("This input is empty");}
     }   

  function change_input(){
         this.style="background:rgb(223, 207, 207)";
        inbox.style="background:rgb(223, 207, 207)";
        icon_add.innerHTML='<img src="icon add.png" alt="icon add.png"  id="icon-add" class="icon-add"/>' ;
};
function creat_div(){   
div.innerHTML='<div id="text-up" class="text-up">'+
             '<img  src="icon right.png" id="icon-right"  class="icon-right" alt="icon right.png" />'+
             '<span id="Complete-all" class="Complete-all" onclick="click_complete_all()" > Complete all tasks</span> '+
             '<span id="Clear-Completed" class="Clear-Completed" onclick="click_clear_complete()"> Clear Completed</span>'+
        '</div>'+
         '<p><hr></p> '+ '<ul  id="ul-li" class="ul-li">'+'</ul>'+
         '<p><hr></p>'+
         ' <div id="text-down" class="text-down" > '+
        ' <span id="tasks-left" class="tasks-left" ><span id="counter">0 </span> tasks left</span>'+
         '<span id="Completed" class="Completed" onclick="click_complete()">Completed</span>'+  
         '<span id="Uncomplete" class="Uncomplete" onclick="click_uncomplete()">Uncomplete</span>'+
         '<span id="All"  class="All" onclick="click_all()">All</span>'+  
         '</div> ';
}
function creat_li (obj ){ 
   var ul_li = document.getElementById("ul-li");
  ul_li.innerHTML+= '<li class="text" id="text">'+'<p class="p">'+'<img src= "icon empty.png" onclick="click_icon_empty(event)" id="icon-empty"  ss = '+ obj.id +' class="icon-empty" />'+'</p>'+'<span id="span" class="span">'+obj.input+'</span>'+'<img  src="icon x.png" id="icon-x" onclick="click_x(event)" mm = '+ obj.id +' class="icon-x">'+'</li>';
   }
////////////////////////////////////////functions 
function click_icon_empty(event) {
const index =event.target.getAttribute('ss') ;
console.log(index);
let  b ;
z.forEach((t , i )=>{
   if(t.id == index){
     b=t ;
     if(t.status === 1){t.status=0 }
     if(t.status === 0){t.status=1}  
  my.append('Content-Type', 'application/json');
 fetch('http://localhost:4000/todo/'+ index ,{
        method:'PUT',
        headers : my , 
        body: JSON.stringify({
          status : b.status 
        })
    }).then( response=>response.json()).then((data) => {
      console.log(data) ; draw(data);
    });} });

 console.log(b);

}
  function click_x(event) 
  {let l ;
    const index = event.target.getAttribute('mm') ;
     z.forEach((o,i)=>{
        if( o.id == index){
      l=i;
      console.log(i);
    }});
     console.log(l);
  z.splice(l,1);
  console.log(index);
  fetch('http://localhost:4000/todo/'+ index ,{
    method:'DELETE', 
})
.then( res => res.json())
.then(data => {  console.log(data);  draw(data);
});
   
  }
 function click_complete_all(){
z.forEach(ob=>{
  ob.status=1 ;});

  z.forEach(ob=>{ 
  my.append('Content-Type', 'application/json');
  fetch('http://localhost:4000/todo/'+ ob.id ,{
         method:'PUT',
         headers : my , 
         body: JSON.stringify({
           status : ob.status
         })
     }).then( response=>response.json()).then((data) => {
       console.log(data) ; draw(data);
    
    });
})

}
function click_clear_complete(){ 
const tt = z.filter(ob=>ob.status===1 );
console.log(tt);
tt.forEach((l, i )=>{
  z.splice(i,1);
console.log(z);
fetch('http://localhost:4000/todo/'+ l.id ,{
  method:'DELETE', 
})
.then( res => res.json())
.then(data => {  console.log(data);  draw(data);
});

})

}
  function click_complete (){ 
    var t= z.filter(ob=>ob.status ===1);
      draw(t); 
  }
  function click_uncomplete (){
    var t= z.filter(ob=>ob.status ===0);
      draw(t); 
  }
  function click_all (){
    draw(z);
  }

 ///////////////////////function draw
  function draw (arr){ 
     div.innerHTML="";
    creat_div();
    console.log(arr);
    arr.forEach((ob , i)=> {
      creat_li(ob);
      
     if(ob.status==1){
      document.getElementsByClassName("p")[i].innerHTML ='<img src="icon1right.png"  alt="icon1right.png" onclick="click_icon_empty(event)" id="icon1right"  class="icon1right" ss = '+ ob.id +' />';
      document.getElementsByClassName("span")[i].style= "text-decoration-line :line-through ";
     } else {
      document.getElementsByClassName("p")[i].innerHTML ='<img src= "icon empty.png" onclick="click_icon_empty(event)" id="icon-empty"  ss = '+ ob.id +' class="icon-empty" />';
      document.getElementsByClassName("span")[i].style= "text-decoration-line :none ";
    }
    });
     document.getElementById("counter").style = "color:black" ;
     document.getElementById("counter").innerHTML=arr.length ;
  
   
}