class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.clear();
  }

  clear() {
    this.currentValue = "";
    this.previousValue = "";
    this.operator = null;
    this.updateDisplay();
  }

  appendNumber(number) {
    this.currentValue += number;
    this.updateDisplay();
  }

  chooseOperator(operator) {
    if (this.currentValue === "") return;
    if (this.previousValue !== "") this.compute();
    this.operator = operator;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousValue);
    const curr = parseFloat(this.currentValue);

    switch (this.operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        if (curr === 0) {
          alert("Error: Division by zero is not allowed");
          return;
        }
        result = prev / curr;
        break;
      default:
        return;
    }
    this.currentValue = result.toString();
    this.operator = null;
    this.previousValue = "";
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.textContent = this.currentValue;
  }
}

let calculator = new Calculator(document.querySelector(".display"));

document.querySelectorAll(".nums").forEach((num) => {
  num.addEventListener("click", () => {
    calculator.appendNumber(num.textContent);
  });
});

document.querySelectorAll(".operator").forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.chooseOperator(operator.textContent);
  });
});

document.querySelector(".equal").addEventListener("click", () => {
  calculator.compute();
});

document.querySelector(".clear").addEventListener("click", () => {
  calculator.clear();
});
