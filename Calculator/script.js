let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  document.getElementById('display').innerText = displayValue;
}

function appendNumber(number) {
    if (displayValue === '0' || waitingForSecondOperand) {
      displayValue = String(number);
      waitingForSecondOperand = false;
    } else {
      displayValue += number;
    }
    updateDisplay();
  }
  
  function setOperator(op) {
    if (operator !== null && !waitingForSecondOperand) {
      calculate();
    }
    firstOperand = parseFloat(displayValue);
    operator = op;
    displayValue += op; 
    waitingForSecondOperand = true;
    updateDisplay(); 
  }

function calculate() {
  if (operator === null || waitingForSecondOperand) {
    return;
  }
  const secondOperand = parseFloat(displayValue);
  let result = 0;
  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      result = firstOperand / secondOperand;
      break;
  }
  displayValue = String(result);
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function calculateMod() {
  const secondOperand = parseFloat(displayValue);
  displayValue = String(firstOperand % secondOperand);
  updateDisplay();
}

function calculateSquare() {
  displayValue = String(parseFloat(displayValue) ** 2);
  updateDisplay();
}

function clearDisplay() {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

document.addEventListener('keydown', (event) => {
    const { key } = event;
    if (/[0-9]/.test(key)) {
      appendNumber(parseInt(key));
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      setOperator(key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Escape') {
      clearDisplay();
    }
  });