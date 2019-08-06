// listen for all keypresses and determine what types of keys are pressed
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

const createResultString = (key, displayedNum, state) => {
    const keyContent = key.textContent;
    const { action } = key.dataset;
    const {
      firstValue,
      modValue,
      ooperator,
      previousKeyType
    } = state;
  const keyType = getKeyType(key);

    // does not have data attribute must have number key
     if(keyType === 'number'){
       if(displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'equals'){
          return keyContent;
         } else {
            return displayedNum + keyContent;
          }
     }

    //if data-action is decimal, key is decimal
      if(keyType === 'decimal'){
        if(!displayedNum.includes('.')) {
          return = displayedNum + '.';
        } else if (previousKeyType === 'operator' ||
                   previousKeyType === 'equals') {
          return = '0.'
        }
        return displayedNum;
      }

     //if key has action has add, subtract, multiply, divide, key is an operator
     if(keyType === 'operator') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        //check firstValue and operator
        if(firstValue &&
           operator &&
           previousKeyType !== 'operator' &&
           previousKeyType !== 'equals'){
           return calculate(firstValue, operator, secondValue);
        } else {
          return displayedNum;
        }
       }
    //if data-action clear, key is clear button
     if (keyType === 'clear'){
       return 0;
     }

  //if data-action is calculate, equals button is presssed
     if(keyType === 'equals'){
       let firstValue = calculator.dataset.firstValue;
       const operator = calculator.dataset.operator;
       const secondValue = displayedNum;

       if(firstValue){
        if(previousKeyType === 'equals'){
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        return calculate(firstValue, operator, secondValue);
      } else {
        return displayedNum;
      }
     }
    }

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return 'number';

  if (action === 'add' ||
     action === 'subtract' ||
     action === 'multiply' ||
     action === 'divide') return 'operator';

  if (action === 'decimal') return 'decimal';
  if (action === 'clear') return 'clear';
  if (action === 'equals') return 'equals';
}

const updateCalculatorState = (key, calculator) => {
  const keyType = getKeyType(key);
  calculator.dataset.previousKeyType = keyType;

  //Remove .is-depressed class from all keys
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
  if (keyType === 'number'){}
  if (keyType === 'decimal'){}
  if (keyType === 'operator'){
    if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'equals') {
      calculator.dataset.firstValue = calculatedValue;
    } else {
      calculator.dataset.firstValue = displayedNum;
    }

    key.classList.add('is-depressed');
    calculator.dataset.operator = key.dataset.action;
  }
  if (keyType === 'clear'){
    if (key.textContent === 'AC') {
      calculator.dataset.firstValue = '';
      calculator.dataset.modValue = '';
      calculator.dataset.operator = '';
      calculator.dataset.previousKeyType = '';
    } else {
      key.TextContent = 'AC';
    }

     if(action !== 'clear'){
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = "CE";
    }
  }
  if (keyType === 'equals'){
    let secondValue = displayedNum;

    if(firstValue){
      if(previousKeyType === 'calculate'){
        secondValue = calculator.dataset.modValue;
      }
    }
    calculator.dataset.modValue = secondValue;
  }
}

keys.addEventListener('click', e => {
  if(e.target.matches('button')) return
     //determines type of key clicked
     const key = e.target;
     const displayedNum = display.textContent;

    //Pure Functions
     const resultString = createResultSTring(e.target, displayedNum, calculator.dataset);

  //Update states
    display.textContent = resultString;

    //pass necessary values
    updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
   }
});

//perform calcuation and return calculated value
const calculate = (n1, operator, n2) => {
  //let result = "";
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);

  if(operator === 'add'){
    return firstNum + secondNum;
  }

  if(operator === 'subtract'){
    return firstNum - secondNum;
  }

  if(operator === 'multiply'){
    return firstNum * secondNum;
  }

  if(operator === 'divide'){
    return firstNum / secondNum;
  }
}
