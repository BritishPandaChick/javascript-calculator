var calculator = document.querySelector("#calculator");
var display = document.querySelector("#display");
var keys = document.querySelector(".calculator__keys");

const createResultString = (key, displayedNum, state) => {
      const keyContent = key.textContent;
      const action = key.dataset.action;
      const firstValue = state.firstValue;
      const modValue = state.modValue;
      const operator = state.operator;
      const previousKeyType = state.previousKeyType;
      const keyType = getKeyType(key);

      //if doesn't have a data-action attribute, it is a number key
      if(!action){
        return displayedNum === "0" ||
            previousKeyType === "operator" ||
            previousKeyType === "calculate"
          ? keyContent
          : displayedNum + keyContent;
        }

    //figures out if there is a decimal
      if (action === "decimal") {
        if (!displayedNum.includes('.')) return displayedNum + ".";
        if (previousKeyType === "operator" || previousKeyType === "calculate") return "0.";
        return displayedNum;
        }

    //figures out if key is operator
    if(action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;

      return firstValue &&
         operator &&
         previousKeyType !== "operator" &&
        previousKeyType !== "calculate") {
        ? calculate(firstValue, operator, secondValue);
        : displayedNum;
        }
    }

    //sees if clear key is pressed
    if (action === "clear") return 0;

      if (action === "calculate"){
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const modValue = calculator.dataset.modValue;

      if (firstValue) {
        return previousKeyType === "calculate"
          ? return calculate(firstValue, operator, secondValue)
          : calculate(firstValue, operator, displayedNum)
      } else {
        return displayedNum;
      }
    }
  }

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);

    //perform calculation and return calculated value
    if (operator === "add") {
      return firstNum + secondNum;
    }

    if (operator === "subtract") {
      return firstNum - secondNum;
    }

    if (operator === "multiply") {
      return firstNum * secondNum;
    }

    if (operator === "divide") {
      return firstNum / secondNum;
    }
  }

const getKeyType = (key) => {
  const { action } = key.dataset
  if (!action) return "number"

  if(action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide") {
    return "operator";
  }
  return action;
}

const updateCalculatorState = (key, calculator) => {
  calculator.dataset.previousKeyType = keyType;

  if (keyType === 'calculate'){
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
    ? modValue
    : displayedNum
  }
}

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key);
    //Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

    if (keyType === "operator") key.classList.add("is-depressed");

    if (keyType === "clear" && key.textContent !== "AC") {
      key.textContent = "AC";
    }

    if (keyType !== "clear"){
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = "CE";
    }
}

keys.addEventListener('click', e => {
  if (e.target.matches('button')) return
    const key = e.target;
    const displayedNum = display.textContent;

    //Pure Function
    const resultString = createResultString(key, displayedNum, calculator.dataset);
    //var previousKeyType = calculator.dataset.previousKeyType;

   //Update states
  display.textContent = resultString;
  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
});
