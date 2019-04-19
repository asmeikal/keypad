import Decimal from 'decimal.js';

import { Keypad } from '../index';

describe('Test keypad function', () => {
  it('checks default value', () => {
    const d = new Keypad(7, 2);
    expect(d.toString()).toBe('0.00');
  });

  it('checks backspace behaviour', () => {
    let d = new Keypad(7, 2);
    d = d.backspace();
    expect(d.toString()).toBe('0.00');
    d = d.addDigit(1);
    expect(d.toString()).toBe('0.01');
    d = d.backspace();
    expect(d.toString()).toBe('0.00');
  });

  it('checks max digits', () => {
    let d = new Keypad(7, 2);
    d = d.addDigit(1);
    expect(d.toString()).toBe('0.01');
    d = d.addDigit(2);
    expect(d.toString()).toBe('0.12');
    d = d.addDigit(3);
    expect(d.toString()).toBe('1.23');
    d = d.addDigit(4);
    expect(d.toString()).toBe('12.34');
    d = d.addDigit(5);
    expect(d.toString()).toBe('123.45');
    d = d.addDigit(6);
    expect(d.toString()).toBe('1234.56');
    d = d.addDigit(7);
    expect(d.toString()).toBe('12345.67');
    d = d.addDigit(8);
    expect(d.toString()).toBe('123456.78');
    d = d.addDigit(9);
    expect(d.toString()).toBe('1234567.89');
    d = d.addDigit(0);
    expect(d.toString()).toBe('1234567.89');
    d = d.backspace();
    expect(d.toString()).toBe('123456.78');
  });

  it('checks double zero', () => {
    let d = new Keypad(7, 2);
    d = d.addDigit(1);
    expect(d.toString()).toBe('0.01');
    d = d.addDoubleZero();
    expect(d.toString()).toBe('1.00');
  });

  it('checks add double zero edge case', () => {
    let d = new Keypad(7, 2);
    for (let i = 1; i <= 8; ++i) {
      d = d.addDigit(i);
    }
    expect(d.toString()).toBe('123456.78');
    d = d.addDoubleZero();
    expect(d.toString()).toBe('1234567.80');
  });

  it('adds a non digit character', () => {
    const d = new Keypad(7, 2);
    expect(() => d.addDigit('c')).toThrow();
  });

  it('adds a digit character', () => {
    let d = new Keypad(7, 2);
    d = d.addDigit('1');
    expect(d.toString()).toBe('0.01');
  });

  it('adds a negative number', () => {
    const d = new Keypad(7, 2);
    expect(() => d.addDigit(-1)).toThrow();
  });

  it('adds two digits characters', () => {
    const d = new Keypad(7, 2);
    expect(() => d.addDigit('10')).toThrow();
  });

  it('adds a number greater than 10', () => {
    const d = new Keypad(7, 2);
    expect(() => d.addDigit(12)).toThrow();
  });

  it('tests concatenation', () => {
    let d = new Keypad(7, 2);
    d = d
      .addDigit(1)
      .addDigit(2)
      .addDigit(3);
    expect(d.toString()).toBe('1.23');
  });

  it('tests Decimal value', () => {
    let d = new Keypad(7, 2);
    d = d.addDigit(1);
    expect(new Decimal('0.01').equals(d.value)).toBeTruthy();
    d = d.addDigit(2);
    expect(new Decimal('0.12').equals(d.value)).toBeTruthy();
    d = d.addDigit(3);
    expect(new Decimal('1.23').equals(d.value)).toBeTruthy();
  });

  it('adds some zero at the beginning', () => {
    let d = new Keypad(7, 2);

    for (let i = 0; i < 8; ++i) {
      d = d.addDigit(0);
    }
    expect(d.toString()).toBe('0.00');

    for (let i = 1; i <= 9; ++i) {
      d = d.addDigit(i);
    }
    expect(d.toString()).toBe('1234567.89');
  });

  it('tests a different number of decimals', () => {
    let d = new Keypad(8, 8);

    d = d.addDigit(1);
    expect(d.toString()).toBe('0.00000001');
  });
});
