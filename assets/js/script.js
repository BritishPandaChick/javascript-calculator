//Global Variables
const calculatorDisplay = document.getElementById('display');
let numsArray = [];

// Clears entire calculator
clearCalculator = () => {
  calculatorDisplay.innerHTML = 0;
  numsArray = [];
}

// Deletes one letter
backspace => () => {
  //console.log('backspace');
  if (numsArray.length > 0) numsArray.pop();

  let numString = numsArray.join('');
  calculatorDisplay.innerHTML = numString;
}

//Checkfor multiple zeroes, decimals and operators
calculatorTests = () => {
  //test for multiple zeroes
  if (numsArray[0] == '0' && numsArray[1] == "0") numsArray.shift();

  /* Checks for 2 operators */
  //Checks to see if this operator is not an minus sign
  let x = numsArray.length - 1;
  let xRegex = /\/|\*|\+/;
  let xTest = xRegex.test(numsArray[x]);
  console.log('xTest' + xTest);

  //Checks all operators
  var h = numsArray.length - 2;
  var hRegex = /\/|\*|\+|\-/;
  var hTest = hRegex.test(numsArray[h]);
  console.log('hTest' + hTest);

  let y = numsArray.length - 3;
  let yRegex = hRegex;
  let yTest = yRegex.test(numsArray[y]);
  console.log('yTest' + yTest);

  if(xTest) {
    if(hTest) {
      if(yTest){
        numsArray.splice(y, 2);
      } else {
        numsArray.splice(h, 1);
      }
    }
  }

  //Looks for multiple decimals
  let testNums = numsArray.join('');
  let decimal = /\.\d*\./;
  if (decimal.test(testNums)){
    rightString = testNums.slice(0, testNums.length-1);
    rightArray = rightString.split('');
    numsArray = rightArray;
  }
}

//Gets key data to appear on the screen
addtoScreen = (e) => {
  let nextNum = event.target.textContent;
  numsArray.push(nextNum);
  calculatorTests();
  let numString = numsArray.join('');
  calculatorDisplay.innerHTML = numString;
  return numString;
}

//Finds answer for calculator
function answer(){
  const calcDisplayValue = document.getElementById('display').innerHTML;
  result = eval(calcDisplayValue);
  calculatorDisplay.textContent = result;
  numsArray = [result];
}

// Gets the data-keys to work so they show on calculator display
let keyPressed = false;

$(window).keydown(function(e){
  let input;
  //return if clear button pressed
  if(e.which == 67){
    clearCalculator();
    return;
  }
  //if backspace pressed return
  if (e.which == 69) {
    backspace();
    return;
  }
  //checks to see if keyPressed is true or false in order to keep working
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
        answer = eval(equation);
        calculatorDisplay.textContent(answer);
        numsArray = [answer];
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
  numsArray.push(input);
  calculatorTests();

  //return array join into a string
  let numString = numsArray.join('');

  //Check for operators that came before other operators
  calculatorDisplay.innerHTML = numString;
  return numString;
});

$(window).keyup(function(e){
  if(e.which == 16){
    keyPressed = false;
  }
});
