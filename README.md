# BaseConversions
Convert between Binary, Octal, Decimal, HEX<br>
<br>
All functions/ class methods return an object with the following properties:
* newNumber - The converted number
* conversion - The steps you would take to convert the number by hand

## Signed
A class that allows for the conversion between signed binary, octal, decimal, and hex numbers.<br>

### Methods
#### .asDecimal( *bits* )
Converts the current value to a decimal number.<br>
* bits - The number of bits to use for the conversion. Default is 8.<br>

#### .asBinary( *bits* )
Converts the current value to a binary number.<br>
* bits - The number of bits to use for the conversion. Default is 8.<br>

#### .asOctal( *bits* )
Converts the current value to a octal number.<br>
* bits - The number of bits to use for the conversion. Default is 8.<br>

#### .asHex( *bits* )
Converts the current value to a hex number.<br>
* bits - The number of bits to use for the conversion. Default is 8.<br>

### Usage
```js
import { Signed } from 'base-conversions';

const base = 2;
const value = '10011001';

const signedNumber = new Signed(base, value);
console.log(signedNumber.asDecimal().newNumber) // -103
```

## Unsigned
A class that allows for the conversion between signed binary, octal, decimal, and hex numbers.<br>

### Methods
#### .asDecimal()
Converts the current value to a decimal number.<br>

#### .asBinary()
Converts the current value to a binary number.<br>

#### .asOctal()
Converts the current value to a octal number.<br>

#### .asHex()
Converts the current value to a hex number.<br>

### Usage
```js
import { Unsigned } from 'base-conversions';

const base = 2;
const value = '10011001';

const unsignedNumber = new Unsigned(base, value);
console.log(unsignedNumber.asDecimal().newNumber) // 153
```

## BinaryEncodedDecimal
Two functions that allow for the conversion between binary and decimal for "floating point/ real" numbers<br>

### toDecimal()
Converts the provided binary to a decimal number.<br>

### toBinary()
Converts the provided decimal number to a floating point binary number.<br>

# The purpose of this repo
The purpose of this repo, is/was to annoy the hell out of an idiotic maths professor. The professor insisted on forcing students to convert 12bit or 8bit signed/ floating point numbers by hand. Obviously, such a task is tedious and arguably a complete waste of time, especially when the chances of you coming across binary that is of those lengths are marginal at best. Soooo... being the petty person I am, I wrote this to do it all for me.<br>
<br>
Screw you professor! I hope your future students find this repo!
