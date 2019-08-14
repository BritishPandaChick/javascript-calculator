//https://www.youtube.com/watch?v=POv394EKTjU&list=PLcwcsiRRNFZVH-i-hXvZ0gja8OwCAQw2g&index=3

//Global Variables
var box = document.getElementById("display");

function addtoScreen(x){
  box.value+=x;
  if(x === 'c'){
    box.value = '';
  }
}

function answer(){
  x=box.value;
  x=eval(x);
  box.value=x;
}

function power(){
  x=box.value;
  x=eval(x*x);
  box.value=x;
}

function backspace(){
  var num = box.value;
  var len = num.length-1;
  var newNum = num.substring(0,len);
  box.value = newNum;
}
