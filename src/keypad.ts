import Decimal from "decimal.js";

export class Keypad {
  private readonly digits: number;
  private readonly maxlog: Decimal;
  private readonly decimal_places: number;

  readonly value: Decimal;

  constructor(digits: number, decimals: number, value: Decimal | number | string = 0) {
    this.digits = digits;
    this.maxlog = new Decimal(this.digits).minus(1);
    this.decimal_places = decimals;
    this.value = this.cleanup(new Decimal(value));
  }

  private cleanup(value: Decimal): Decimal {
    return value.toDecimalPlaces(this.decimal_places, Decimal.ROUND_DOWN);
  }

  backspace() {
    return new Keypad(this.digits, this.decimal_places, this.value.dividedBy(10));
  }

  addDigit(digit: string | number) {
    if (typeof digit === 'string') {
      if (!/^\d$/.test(digit)) {
        throw new Error("Digit should be a number between 0 and 9");
      }
    } else {
      if (digit < 0 || digit > 10) {
        throw new Error("Digit should be between 0 and 9");
      }
    }
    if (this.value.logarithm() > this.maxlog) return this;
    return new Keypad(this.digits, this.decimal_places, this.value.times(10).plus(new Decimal(digit).dividedBy(Decimal.pow(10, this.decimal_places))));
  }

  addDoubleZero() {
    return this.addDigit(0).addDigit(0);
  }

  toString() {
    return this.value.toFixed(this.decimal_places);
  }
}
