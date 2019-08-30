//Global Variables
const calculatorDisplay = document.getElementById('display');
let numsArray = [];
let keyPressed = false;

// Clears entire calculator
clearCalculator = () => {
  calculatorDisplay.innerHTML = 0;
  numsArray = [];
}

// Deletes one letter
clearOne => () => {
  if (numsArray.length > 0) numsArray.pop();

  let numString = numsArray.join('');
  calculatorDisplay.innerHTML = numString;
}

//Checkfor multiple zeroes, decimals and operators
testingCalculator = () => {
  //test for multiple zeroes
  if (numsArray[0] == '0' && numsArray[1] == "0") numsArray.shift();

  /* Checks for 2 operators */
  //Checks to see if this operator is not an minus sign
  let testOne = numsArray.length - 1;
  let testOneRegex = /\/|\*|\+/;
  let testOneString = testOneRegex.test(numsArray[testOne]);
  console.log(testOneString);

  //Checks all operators
  let testTwo = numsArray.length - 2;
  let testTwoRegex = /\/|\*|\+|\-/;
  let testTwoString = testTwoRegex.test(numsArray[testTwo]);
  console.log(testTwoString);

  let testThree = numsArray.length - 3;
  let testThreeRegex = testTwoRegex;
  let testThreeString = testThreeRegex.test(numsArray[testThree]);
  console.log(testThreeString);

  if(testOneString) {
    if(testTwoString) {
      if(testThreeString){
        numsArray.splice(testThree, 2);
      } else {
        numsArray.splice(testTwo, 1);
      }
    }
  }

  //Looks for multiple decimals
  let displayNums = numsArray.join('');
  let decimal = /\.\d*\./;
  if (decimal.test(displayNums)){
    sliceString = displayNums.slice(0, displayNums.length-1);
    decimalArray = sliceString.split('');
    numsArray = decimalArray;
  }
}

//Gets key data to appear on the screen
showValue = (e) => {
  let keyNum = event.target.textContent;
  numsArray.push(keyNum);
  testingCalculator();

  let numString = numsArray.join('');
  calculatorDisplay.innerHTML = numString;
  return numString;
}

//Finds answer for calculator
answer = () => {
  const calcDisplayValues = document.getElementById('display').innerHTML;
  calcTotal = eval(calcDisplayValues);
  calculatorDisplay.textContent = calcTotal;
  numsArray = [calcTotal];
}

// Gets the data-keys to work so they show on calculator display
$(window).keydown(function(e){
  let input;

  //return if clear button pressed
  if(e.which == 67){
    clearCalculator();
    return;
  }
  //if backspace pressed return
  if (e.which == 69) {
    clearOne();
    return;
  }
  //checks to see if keyPressed is true or false in order to keep working
  if (e.which == 16) keyPressed = true;


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
        calcTotal = eval(equation);
        calculatorDisplay.textContent(calcTotal);
        numsArray = [calcTotal];
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
  testingCalculator();

  //return array join into a string
  let numString = numsArray.join('');

  //Check for operators that came before other operators
  calculatorDisplay.innerHTML = numString;
  return numString;
});

$(window).keyup(function(e){
  if(e.which == 16) keyPressed = false;
});
