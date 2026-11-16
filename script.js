const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function inputDigit(digit) {
  if (waitingForSecondValue) {
    currentValue = digit;
    waitingForSecondValue = false;
  } else {
    currentValue = currentValue === "0" ? digit : currentValue + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (waitingForSecondValue) {
    currentValue = "0.";
    waitingForSecondValue = false;
    updateDisplay();
    return;
  }

  if (!currentValue.includes(".")) {
    currentValue += ".";
    updateDisplay();
  }
}

function handleOperator(nextOperator) {
  const inputValue = Number(currentValue);

  if (firstValue === null) {
    firstValue = inputValue;
  } else if (operator) {
    const result = calculate(firstValue, inputValue, operator);
    currentValue = String(result);
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
}

function calculate(first, second, op) {
  switch (op) {
    case "+":
      return first + second;
    case "−":
      return first - second;
    case "×":
      return first * second;
    case "÷":
      return second === 0 ? "Error" : first / second;
    default:
      return second;
  }
}

function clearCalculator() {
  currentValue = "0";
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateDisplay();
}

function handleEquals() {
  if (!operator || firstValue === null) return;

  const inputValue = Number(currentValue);
  const result = calculate(firstValue, inputValue, operator);

  currentValue = String(result);
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("number")) {
      inputDigit(value);
      return;
    }

    if (button.classList.contains("operator")) {
      handleOperator(value);
      return;
    }

    if (button.classList.contains("clear")) {
      clearCalculator();
      return;
    }

    if (button.classList.contains("equals")) {
      handleEquals();
    }
  });
});

updateDisplay();