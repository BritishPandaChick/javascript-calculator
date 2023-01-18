import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');

  // Change all numbers
  const handleNumber = (event) => {
    const number = event.target.textContent;

    //Adds onto the number instead of replacing number in display
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  // Gets operators to work on the display
  const handleOperator = (event) => {
    const operator = event.target.textContent;
    setDisplay(display + ' ' + operator + ' ');
  };

  // Gets equal sign to work 
  const handleEqual = () => {
    //Evaluate numbers in the display
    setDisplay(eval(display));
  };

  // Gets decimal to work
  const handleDecimal = () => {
    const array = display.split(' ');
    const lastElement = array[array.length - 1];

    //Checks last number to see if it includes a decimal.
    if (!lastElement.includes('.')) {
      setDisplay(display + '.');
    }
  };

  //Handle clear button to clear screen
  const handleClear = () => {
    setDisplay('0');
  }

  return (
    <div className="App">
      <div className="calculator">
        <div id="display">
          {display}
        </div>

        <div className="buttons">
          <div className="row">
            <div id="clear" className="key" onClick={handleClear}>
              AC
            </div>

            <div id="subtract" className="key" onClick={handleOperator}>
              -
            </div>

            <div id="add" className="key" onClick={handleOperator}>
              +
            </div>
          </div>

          <div className="row">
            <div id="seven" className="key" onClick={handleNumber}>
              7
            </div>

            <div id="eight" className="key" onClick={handleNumber}>
              8
            </div>

            <div id="nine" className="key" onClick={handleNumber}>
              9
            </div>

            <div id="multiply" className="key" onClick={handleOperator}>
              *
            </div>
          </div>

          <div className="row">
            <div id="four" className="key" onClick={handleNumber}>
              4
            </div>

            <div id="five" className="key" onClick={handleNumber}>
              5
            </div>

            <div id="six" className="key" onClick={handleNumber}>
              6
            </div>

            <div id="divide" className="key" onClick={handleOperator}>
              /
            </div>
          </div>

          <div className="row">
            <div id="one" className="key" onClick={handleNumber}>
              1
            </div>

            <div id="two" className="key" onClick={handleNumber}>
              2
            </div>

            <div id="three" className="key" onClick={handleNumber}>
              3
            </div>

            <div id="decimal" className="key" onClick={handleDecimal}>
              .
            </div>
          </div>

          <div class="row">
            <div id="zero" className="key" onClick={handleNumber}>
              0
            </div>

            <div id="equals" className="key" onClick={handleEqual}>
              =
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
