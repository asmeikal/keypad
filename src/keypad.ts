import Decimal from "decimal.js";

export class Keypad {
  private digits: Decimal;
  private maxlog: Decimal;
  private decimals: number;

  value: Decimal;

  constructor(digits: number, decimals: number, value: number | string = 0) {
    this.digits = new Decimal(digits);
    this.maxlog = this.digits.minus(1);
    this.decimals = decimals;
    this.value = new Decimal(value);
  }

  private cleanup() {
    this.value = this.value.toDecimalPlaces(this.decimals, Decimal.ROUND_DOWN);
  }

  backspace() {
    this.value = this.value.dividedBy(10);
    this.cleanup();
    return this;
  }

  addDigit(digit: string | number) {
    if (this.value.logarithm() > this.maxlog) return;
    if (typeof digit === 'string') {
      if (!/^\d$/.test(digit)) {
        throw new Error("Digit should be a number between 0 and 9");
      }
    } else {
      if (digit < 0 || digit > 10) {
        throw new Error("Digit should be between 0 and 9");
      }
    }
    this.value = this.value.times(10).plus(new Decimal(digit).dividedBy(100));
    this.cleanup();
    return this;
  }

  addDoubleZero() {
    this.addDigit(0);
    this.addDigit(0);
    return this;
  }

  toString() {
    return this.value.toFixed(this.decimals);
  }
}
