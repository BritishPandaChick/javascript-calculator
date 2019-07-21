
$(document).ready(function(){
  //store user inputs
  var inputs = [""];
  //string to store current inputs
  var totalString;
  //Operators array for validation without the decimal
  var operatorsOne = ["+", "-", "/", "*"];
  //Operators for validation with the decimal
  var operatorsTwo = ["."];
  //numbers for validation
  var nums = [0,1,2,3,4,5,6,7,8,9];

  function getValue(input){
    if(operatorsTwo.includes(inputs[inputs.length-1] === true && input===".")){
      console.log("Duplicate '.'");
    } else if(inputs.length === 1 && operatorsOne.includes(input)===false){
      inputs.push(input);
    } else if(operatorsOne.includes(inputs[inputs.length-1])===false){
      inputs.push(input);
    } else if(nums.includes(Number(input))){
      inputs.push(input);
    }
    update();
  }

  function update(){
    totalString = inputs.join("");
    $("#steps").html(totalString);
  }

  function getTotal(){
    totalString = inputs.join("");
    $("#steps").html(eval(totalString));
  }

  $("a").on("click", function(){
    if(this.id === "clear"){
      inputs=[""];
      update();
    } else if(this.id ==="equals"){
      getTotal();
    } else {
      if(inputs[inputs.length-1].indexOf("+", "-", "/", "*")===-1){
         getValue(this.id);
         } else {
         getValue(this.id);
      }
    }
  });

});
