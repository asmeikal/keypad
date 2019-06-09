# Keypad

![Travis (.com)](https://img.shields.io/travis/com/asmeikal/keypad-lib.svg)
![Coveralls github](https://img.shields.io/coveralls/github/asmeikal/keypad-lib.svg)
![npm](https://img.shields.io/npm/v/keypad-lib.svg)

This is a challenge.

Implement a keypad utility class, with the following methods:

* add a digit to the keypad
* add two zeros to the keypad
* remove a digit to the keypad
* convert keypad to a string

The keypad constructor takes the max number of integer digits and the number of decimal places.

The keypad is immutable.

```typescript
const Keypad = require('keypad-lib').Keypad;
// import { Keypad } from 'keypad-lib';

let d = new Keypad(7,2);

console.log(d.toString());
// outputs "0.00"

d = d.addDigit(1)
 .addDigit(2)
 .addDigit(3)
 .addDigit(4)
 .addDigit(5)
 .addDigit(6)
 .addDigit(7)
 .addDigit(8)
 .addDigit(9)
 .addDigit(0);

console.log(d.toString());
// outputs "1234567.89"
```

