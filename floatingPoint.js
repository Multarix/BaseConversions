/**
 * Calculates the highest power of 2 that fits into a number without going over
 * @argument {number} num - The number to find the highest power of 2 in
 * @argument {boolean} signed - The current power - Only used for the recursion really
 * @returns {number} The highest power of 2 that fits into the first argument
**/
const highestPower = (num) => {
	let i = 0;
	while(num >= Math.pow(2, i + 1)) i += 1;
	return i;
};


/**
 * Converts a floating point (real) number into binary exponant form
 * @argument {number} num - The floating point number to convert
 * @argument {number} totalBits - The amount of total bits that the exponant form has
 * @argument {number} expLength - The length of the exponant/ characteristic
 * @returns {string} The binary exponant form
**/
function convertToBinary(num, totalBits, expLength){
	// Deal with when the number is exactly 0
	if(num === 0){
		let bin = "";
		while(totalBits > bin.length) bin += "0";
		return bin;
	}
	const mantissaLength = totalBits - expLength - 1;

	const signBit = (num < 0) ? 1 : 0;
	const numArray = num.toString().split(".");
	const leftSide = numArray[0];
	const rightSide = numArray[1];


	// Mantissa
	// The left side of the decimal point in binary
	const leftSideBinary = (leftSide === "0") ? "" : parseInt(leftSide).toString(2);

	// The right side of the decimal point in binary - This requires some maffs
	const rightSideInt = parseFloat(`0.${rightSide}`);

	// Loop down until we hit -mantissaLength
	let total = 0;
	let firstMatch = !!leftSideBinary;
	let rightSideBinary = "";
	let largestNegPower = false;
	for(let i = -1; mantissaLength + 1 > rightSideBinary.length; i--){
		let bit = 0;
		const minPow = Math.pow(2, i);
		if(rightSideInt >= total + minPow){
			total += minPow;
			bit = 1;
			if(!largestNegPower) largestNegPower = i;
		}
		if(!firstMatch && bit === 1) firstMatch = true;
		if(firstMatch) rightSideBinary += bit;
	}

	let mantissa = `${leftSideBinary}${rightSideBinary}`;
	mantissa = mantissa.slice(1, mantissa.length);
	while(mantissaLength > mantissa.length) mantissa += "0"; // if the mantissa is too short
	if(mantissa.length > mantissaLength) mantissa = mantissa.slice(0, mantissaLength); // if the mantissa is too long


	// Character/ Exponant - Highest power of 2 + the offset
	const maxPow = (leftSide === "0") ? largestNegPower : highestPower(parseInt(leftSide));
	const exponantOffset = Math.pow(2, expLength - 1) - 1;

	let character = maxPow + exponantOffset;
	character = character.toString(2);
	while(expLength > character.length) character = "0" + character;
	if(character.length > expLength) character = character.slice(0, expLength);


	// Here would be great to add support for 32bit/64bit rounding - Main goal is just functional 12bit
	console.log(`Sign: ${signBit}`);
	console.log(`Characteristic: ${character}`);
	console.log(`Mantissa: ${mantissa}`);
	console.log(`Binary Split: ${signBit} ${character} ${mantissa}`);
	console.log(`Full Binary: ${signBit}${character}${mantissa}`);

	return `${signBit}${character}${mantissa}`;
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

	let nonZero = false;
	for(const bit of binArray){
		if(bit === "1"){
			nonZero = true;
			break;
		}
	}
	if(!nonZero) return 0;

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

const num = 10.25;
const exp = 5;
const leng = 12;
// Number | Total bits | Exponant length
// console.log(convertToBinary(num, leng, exp));
// Binary | Exponant length
console.log(convertToDecimal(convertToBinary(num, leng, exp), exp));