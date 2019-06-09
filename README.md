# Keypad

[![Build Status](https://travis-ci.com/asmeikal/keypad-lib.svg?branch=master)](https://travis-ci.com/asmeikal/keypad-lib)
[![Coverage Status](https://coveralls.io/repos/github/asmeikal/keypad-lib/badge.svg?branch=master)](https://coveralls.io/github/asmeikal/keypad-lib?branch=master)

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

