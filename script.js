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
    if (number === "." && this.currentValue.includes(".")) return; // prevent multiple decimals
    this.currentValue += number;
    this.updateDisplay();
  }

  chooseOperator(operator) {
    if (!this.currentValue) return;
    if (this.previousValue) this.compute();

    this.operator = operator;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  }

  compute() {
    const prev = parseFloat(this.previousValue);
    const curr = parseFloat(this.currentValue);
    if (isNaN(prev) || isNaN(curr)) return;

    const operations = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => (b === 0 ? NaN : a / b),
    };

    const result = operations[this.operator]?.(prev, curr);
    if (isNaN(result)) {
      alert("Error: Invalid operation (maybe division by zero)");
      return this.clear();
    }

    this.currentValue = result.toString();
    this.operator = null;
    this.previousValue = "";
    this.updateDisplay();
  }

  deleteNumber() {
    this.currentValue = this.currentValue.slice(0, -1);
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.textContent = this.currentValue || "0";
  }
}

// ---------- Setup ----------
const calculator = new Calculator(document.querySelector(".display"));

const actions = {
  ".nums": (el) => calculator.appendNumber(el.textContent),
  ".operator": (el) => calculator.chooseOperator(el.textContent),
  ".equal": () => calculator.compute(),
  ".clear": () => calculator.clear(),
  ".del": () => calculator.deleteNumber(),
};

// attach events dynamically
for (const [selector, handler] of Object.entries(actions)) {
  document
    .querySelectorAll(selector)
    .forEach((el) => el.addEventListener("click", () => handler(el)));
}
