/**
 * Calculates the highest power of 2 that fits into a number without going over
 * @argument {number} num - The number to find the highest power of 2 in
 * @argument {boolean} signed - The current power - Only used for the recursion really
 * @returns {number} The highest power of 2 that fits into the first argument
**/
const highestPower = (num, pwr = -1) => {
	const power = Math.pow(2, pwr + 1);
	if(power >= num) return pwr;
	return highestPower(num, pwr + 1);
};



/**
 * Converts a floating point (real) number into binary exponant form
 * @argument {number} num - The floating point number to convert
 * @argument {number} totalBits - The amount of total bits that the exponant form has
 * @argument {number} expLength - The length of the exponant/ characteristic
 * @returns {string} The binary exponant form
**/
function convertToBinary(num, totalBits, expLength){
	const mantissaLength = totalBits - expLength - 1;
	const exponantOffset = Math.pow(2, expLength - 1) - 1;

	const sign = (num > 0) ? 0 : 1;
	if(sign === 1) num *= -1;

	const decimalString = num.toString();
	const decimalArray = decimalString.split(".");
	const leftSide = decimalArray[0]; // 56

	const exponantActual = highestPower(parseInt(leftSide));

	const charWithOffset = exponantActual + exponantOffset;
	let binCharacter = charWithOffset.toString(2); // Was too lazy to write out more fake binary conversion crap. COMPUTERS DO IT FOR US.

	let baseRemainder = parseInt(leftSide);
	const leftSideBinaryArray = [];
	while(baseRemainder !== 0){
		const remainder = baseRemainder % 2;
		leftSideBinaryArray.push(remainder);
		baseRemainder = (baseRemainder - remainder) / 2;
	}

	leftSideBinaryArray.reverse();
	if(leftSideBinaryArray[0] === 1) leftSideBinaryArray.splice(0, 1); // First number should be a 1
	const leftSideBinary = leftSideBinaryArray.join("");


	const rightSide = parseFloat("0." + decimalArray[1]); // 0.32

	let power = -1;
	let rollingTotal = 0;
	const rightSideBinaryArray = [];

	while(mantissaLength > rightSideBinaryArray.length){
		const mathPower = Math.pow(2, power);
		const bit = (rollingTotal + mathPower <= rightSide) ? 1 : 0;
		if(bit) rollingTotal += mathPower;
		rightSideBinaryArray.push(bit);

		power -= 1;
	}
	const rightSideBinary = rightSideBinaryArray.join("");
	let binMantissa = leftSideBinary + rightSideBinary;

	while(expLength > binCharacter.length) binCharacter = "0" + binCharacter;

	while(mantissaLength > binMantissa.length) binMantissa += "0";
	if(binMantissa.length > mantissaLength){
		const binArray = binMantissa.split("");
		binArray.splice(mantissaLength, binMantissa.length);
		binMantissa = binArray.join("");
	}

	const storedBinary = `${sign}${binCharacter}${binMantissa}`;
	return storedBinary;
}



/**
 * Converts a binary exponant into the stored decimal form
 * @argument {number} bin - The binary exponant
 * @argument {number} expLength - The length of the exponant/ characteristic
 * @returns {number} The final floating point/ real number as stored in the binary
**/
function convertToDecimal(bin, expLength){
	const binArray = bin.split("");
	const sign = binArray.shift();

	let characteristic = "";
	while(expLength > characteristic.length){
		characteristic += binArray.shift();
	}

	const exponantOffset = Math.pow(2, expLength - 1) - 1;
	const exponant = parseInt(characteristic, 2) - exponantOffset; // Was too lazy to write out more fake binary conversion crap. COMPUTERS DO IT FOR US.

	const mantissa = "1" + binArray.join("");

	let curPow = exponant;
	let rollingTotal = 0;
	for(const bit of mantissa){
		if(bit === "1") rollingTotal += Math.pow(2, curPow);
		curPow -= 1;
	}

	if(sign === "1") rollingTotal *= -1;
	return rollingTotal;
}

console.log(convertToBinary(48.25, 32, 8));
console.log(convertToDecimal("01000010010000010000000000000000", 8));