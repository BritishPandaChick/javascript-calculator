//https://www.youtube.com/watch?v=POv394EKTjU&list=PLcwcsiRRNFZVH-i-hXvZ0gja8OwCAQw2g&index=3
//Global Variables
var box = document.querySelector("#display");

function addtoScreen(x){
  box.value+=x;
  if(x === "C") {
    box.value="";
  }
}
