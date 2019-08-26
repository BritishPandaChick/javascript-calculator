//Global Variables
const display = document.getElementById('display');
let numArray = [];

// Clear calculator display
function clearDisplay() {
  display.innerHTML = 0;
  numArray = [];
}

// Deletes one letter
function backspace(){
  //console.log('backspace');
  if (numArray.length > 0) {
    numArray.pop();
  }
  let numString = numArray.join('');
  display.innerHTML = numString;
}

//Tests for multiple zeroes, decimals and operators
function numTests(){
  //test for multiple zeroes
  if (numArray[0] == '0' && numArray[1] == "0") {
    numArray.shift();
  }

  /* Checks for 2 operators */
  //Checks to see if this operator is not an minus sign
  let x = numArray.length - 1;
  let xRegex = /\/|\*|\+/;
  let xTest = xRegex.test(numArray[x]);
  console.log('xTest' + xTest);

  //Checks all operators
  var h = numArray.length - 2;
  var hRegex = /\/|\*|\+|\-/;
  var hTest = hRegex.test(numArray[h]);
  console.log('hTest' + hTest);

  let y = numArray.length - 3;
  let yRegex = hRegex;
  let yTest = yRegex.test(numArray[y]);
  console.log('yTest' + yTest);

  if(xTest) {
    if(hTest) {
      if(yTest){
        numArray.splice(y, 2);
      } else {
        numArray.splice(h, 1);
      }
    }
  }

  //Looks for multiple decimals
  let testNums = numArray.join('');
  let decimal = /\.\d*\./;
  if (decimal.test(testNums)){
    rightString = testNums.slice(0, testNums.length-1);
    rightArray = rightString.split('');
    numArray = rightArray;
  }
}

//adds to screen
function addtoScreen(e){
  let next = event.target.textContent;
  numArray.push(next);
  numTests();
  let numString = numArray.join('');
  display.innerHTML = numString;
  return numString;
}

//Finds answer for calculator
function answer(){
  const displayValue = document.getElementById("display").innerHTML;
  result = eval(displayValue);
  display.textContent = result;
  numArray = [result];
  //console.log(displayValue);
}

// Keyboard functionality for data-keys
let keyPressed = false;

$(window).keydown(function(e){
  let input;
  //return if clear button pressed
  if(e.which == 67){
    clearDisplay();
    return;
  }
  //if backspace pressed return
  if (e.which == 69) {
    backspace();
    return;
  }
  //if shift is pressed
  if (e.which == 16) {
    keyPressed = true;
  }

  if (keyPressed == true) {
    if (e.which == 187) {
      input = '+';
    } else if (e.which == 56) {
      input = '*';
    }
  } else {
    switch(e.which){
      case 187:
        const equation = document.getElementById('display').textContent;
        //console.log(equation);
        answer = eval(equation);
        display.textContent(answer);
        numArray = [answer];
        break;
      case 191:
        input = '/';
        break;
      case 189:
        input = '-';
        break;
      case 49:
        input = '1';
        break;
      case 50:
        input = '2';
        break;
      case 51:
        input = '3';
        break;
      case 52:
        input = '4';
        break;
      case 53:
        input = '5';
        break;
      case 54:
        input = '6';
        break;
      case 55:
        input = '7';
        break;
      case 56:
        input = '8';
        break;
      case 57:
        input = '9';
        break;
      case 48:
        input = '0';
        break;
    }
  }

  //Push to numArray
  numArray.push(input);
  //console.log(numArray);
  numTests();
  //return array join into a string
  let numString = numArray.join('');

  //Check for operators that came before other operators
  display.innerHTML = numString;
  return numString;
});

$(window).keyup(function(e){
  if(e.which == 16){
    keyPressed = false;
  }
});
