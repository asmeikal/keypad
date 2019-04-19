import Decimal from 'decimal.js';

export class Keypad {
  public readonly value: Decimal;
  private readonly digits: number;
  private readonly maxlog: Decimal;
  private readonly decimalPlaces: number;

  constructor(
    digits: number,
    decimals: number,
    value: Decimal | number | string = 0
  ) {
    this.digits = digits;
    this.maxlog = new Decimal(this.digits).minus(1);
    this.decimalPlaces = decimals;
    this.value = this.cleanup(new Decimal(value));
  }

  public backspace() {
    return new Keypad(
      this.digits,
      this.decimalPlaces,
      this.value.dividedBy(10)
    );
  }

  public addDigit(digit: string | number) {
    if (typeof digit === 'string') {
      if (!/^\d$/.test(digit)) {
        throw new Error('Digit should be a number between 0 and 9');
      }
    } else {
      if (digit < 0 || digit > 10) {
        throw new Error('Digit should be between 0 and 9');
      }
    }
    if (this.value.logarithm() > this.maxlog) {
      return this;
    }
    return new Keypad(
      this.digits,
      this.decimalPlaces,
      this.value
        .times(10)
        .plus(new Decimal(digit).dividedBy(Decimal.pow(10, this.decimalPlaces)))
    );
  }

  public addDoubleZero() {
    return this.addDigit(0).addDigit(0);
  }

  public toString() {
    return this.value.toFixed(this.decimalPlaces);
  }

  private cleanup(value: Decimal): Decimal {
    return value.toDecimalPlaces(this.decimalPlaces, Decimal.ROUND_DOWN);
  }
}
