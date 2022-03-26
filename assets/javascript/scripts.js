const supScript = {
	"0": "⁰",
	"1": "¹",
	"2": "²",
	"3": "³",
	"4": "⁴",
	"5": "⁵",
	"6": "⁶",
	"7": "⁷",
	"8": "⁸",
	"9": "⁹"
};

const subScript = {
	"2": "₂",
	"8": "₈",
	"10": "₁₀",
	"16": "₁₆"
};

const hexObject = {
	"0" : 0,
	"1" : 1,
	"2" : 2,
	'3' : 3,
	"4" : 4,
	"5" : 5,
	"6" : 6,
	"7" : 7,
	"8" : 8,
	"9" : 9,
	"10" : "A",
	"11" : "B",
	"12" : "C",
	"13" : "D",
	"14" : "E",
	"15" : "F",
	"A" : 10,
	"B" : 11,
	"C" : 12,
	"D" : 13,
	"E" : 14,
	"F" : 15
};

const binaryHexObject = {
	"0000" : "0",
	"0001" : "1",
	"0010" : "2",
	"0011" : "3",
	"0100" : "4",
	"0101" : "5",
	"0110" : "6",
	"0111" : "7",
	"1000" : "8",
	"1001" : "9",
	"1010" : "A",
	"1011" : "B",
	"1100" : "C",
	"1101" : "D",
	"1110" : "E",
	"1111" : "F",
	"0" : "0000",
	"1" : "0001",
	"2" : "0010",
	"3" : "0011",
	"4" : "0100",
	"5" : "0101",
	"6" : "0110",
	"7" : "0111",
	"8" : "1000",
	"9" : "1001",
	"A" : "1010",
	"B" : "1011",
	"C" : "1100",
	"D" : "1101",
	"E" : "1110",
	"F" : "1111"
};

const binaryOctalObject = {
	"000" : "0",
	"001" : "1",
	"010" : "2",
	"011" : "3",
	"100" : "4",
	"101" : "5",
	"110" : "6",
	"111" : "7",
	"0" : "000",
	"1" : "001",
	"2" : "010",
	"3" : "011",
	"4" : "100",
	"5" : "101",
	"6" : "110",
	"7" : "111"
};



/**
 * Converts the number to SuperScript
 *  @argument {number} n The number to convert
**/
function toSup(n){
	const str = n.toString();
	const strArr = str.split("");
	let newStr = "";
	for(const num of strArr){
		newStr += supScript[num];
	}
	return newStr;
}

/**
 * Converts the number to SubScript
 *  @argument {number} n The number to convert
**/
function toSub(n){
	const str = n.toString();
	return subScript[str];
}



/**
 * Inverts the 1's and 0's in a binary for changing between negative and postive
 * @argument {string} binary - The binary string to be converted
 * @returns {string} The binary in string form
**/
function binaryInvert(binary){
	let newBinary = "";
	for(const bit of binary){
		newBinary += (bit === "0") ? "1" : "0";
	}
	return newBinary;
}



/**
 * Creates the artifical working steps that idiot Math teachers think you should show
 * @argument {string|number} num - The number or string to convert
 * @argument {number} fromBase - The base that the first argument is in
 * @argument {number} toBase - The base to convert to
 * @argument {boolean} signed - If a binary number is supposed to be signed
 * @argument {number} bits - The amount of bits a binary is supposed to contain
**/
function workingSteps(num, fromBase, toBase, signed, bits){
	if(!num || !fromBase || !toBase) throw "Unable to convert";
	if(fromBase === 10){
		num = parseInt(num);
		if(isNaN(num)) throw "Argument 0 Was not a number";
	}
	const [finalWorking, conversion, conversionWorking] = [[], [], []];


	// Negative handling here.
	// Convert numbers to binary, then convert every 3bits (octal) or 4bits (hex). (Correct way, no mention of negative octals or hex)

	// Signed binary inversion
	let negative = false;
	let numA = num;
	let sign;
	if(bits) signed = true;
	if(fromBase === 2 && signed){
		const numSplit = num.split("");
		sign = numSplit.shift();
		numA = numSplit.join("");
		if(sign === "1"){
			negative = true;
			numA = binaryInvert(numA);
		}
	}

	let convertedBase;
	let baseRemainder = num;
	if(toBase === 2 && fromBase === 10){
		// Handle negative numbers - Need to add working steps
		if(toBase === 2 && numA < 0){
			negative = true;
			signed = true;
			const negativeString = `(${numA} + 1) × -1`;
			const invertedNum = (numA + 1) * -1;
			conversionWorking.push(`${invertedNum} = ${negativeString}`);
			baseRemainder = invertedNum;
		}
		// Converting from Decimal to another base with working.
		while(baseRemainder !== 0){
			const remainder = baseRemainder % toBase;

			const hexExtra = (toBase === 16) ? `${hexObject[remainder.toString()]}` : ""; // Hex is a bit weird cause it also uses letters, so we clarify
			const modString = `${baseRemainder} MOD ${toBase} = ${remainder}${(hexExtra) ? ` (${hexExtra})` : ""}`;

			const pushObject = (hexExtra) ? hexExtra : remainder;
			conversion.push(pushObject);
			conversionWorking.push(modString);

			baseRemainder = (baseRemainder - remainder) / toBase;
		}
		conversion.reverse();
		convertedBase = conversion.join("");

		// Negative binary handling here - Need to add working steps
		if(toBase === 2 && negative){
			const convertString = convertedBase;
			const baseLength = convertedBase.length;
			for(let i = bits; i > (baseLength + 1); i--){
				convertedBase = "0" + convertedBase;
			}
			convertedBase = binaryInvert(convertedBase);
			conversionWorking.push(`${convertString} invert ${convertedBase}`);
			convertedBase = "1" + convertedBase;
			conversionWorking.push(convertedBase + " (Add bit sign)");
		}

		finalWorking.push(...conversionWorking);

		return {
			"oldBase": num,
			"newBase": convertedBase,
			"working": finalWorking
		};
	}

	if(toBase === 10 && fromBase === 2){
		const splitNum = numA.split("");
		const maxPower = splitNum.length - 1;
		const [reqWorking, allWorking] = [[], []];

		convertedBase = 0;
		let currPower = maxPower;
		for(let part of splitNum){
			if(fromBase === 16) part = hexObject[part];
			part = parseInt(part);

			const pow = Math.pow(fromBase, currPower);
			convertedBase += part * pow;

			// part × base^pow + part × base^pow + part × base^pow... etc
			const workingString = `${part}×${fromBase}${toSup(currPower)}`;
			allWorking.push(workingString); // everything
			if(part > 0){
				reqWorking.push(workingString); // anything that isn't 0
				conversion.push(pow); // number + number + number... etc
			}

			currPower -= 1;
		}

		const allWorkString = (negative) ? `-(${allWorking.join(" + ")})` : allWorking.join(" + ");
		const reqWorkingString = (negative) ? `-(${reqWorking.join(" + ")})` : reqWorking.join(" + ");
		const convString = (negative) ? `-(${conversion.join(" + ")})` : conversion.join(" + ");

		if(negative) convertedBase = (convertedBase + 1) * -1;

		conversionWorking.push(allWorkString, reqWorkingString, convString);
		finalWorking.push(...conversionWorking);

		return {
			"oldBase": num,
			"newBase": convertedBase,
			"working": finalWorking
		};
	}


	let regex = /.{1,4}/g;
	if(fromBase === 16 && toBase === 2){
		// convert from hex to binary

		const hexSplit = num.split("");
		for(const hex of hexSplit){
			const nibble = binaryHexObject[hex]; // nibbles are 4 bits

			conversion.push(nibble);
			conversionWorking.push(`${hex} = ${nibble}`);
		}

		convertedBase = conversion.join("");
		finalWorking.push(...conversionWorking);

		return {
			"oldBase": num,
			"newBase": convertedBase,
			"working": finalWorking
		};
	}

	if(fromBase === 2 && toBase === 16){
		// convert from binary to hex
		let moddedNum = num;
		while(moddedNum.length % 4 !== 0) moddedNum = "0" + moddedNum; // add 0's to the front till % 4 = 0
		// if(moddedNum !== num) conversionWorking.push(`${num} = ${moddedNum}`);

		const binarySplit = moddedNum.match(regex);
		conversionWorking.push(`${num} = ` + binarySplit.join("-"));
		for(const nibble of binarySplit){
			const hex = binaryHexObject[nibble];

			conversion.push(hex);
			conversionWorking.push(`${nibble} = ${hex}`);
		}

		convertedBase = conversion.join("");
		finalWorking.push(...conversionWorking);

		return {
			"oldBase": num,
			"newBase": convertedBase,
			"working": finalWorking
		};
	}


	regex = /.{1,3}/g;
	if(fromBase === 8 && toBase === 2){
		// convert from octal to binary
		const octSplit = num.split("");
		for(const oct of octSplit){
			const nib = binaryOctalObject[oct]; // nibbles are 4 bits

			conversion.push(nib);
			conversionWorking.push(`${oct} = ${nib}`);
		}

		convertedBase = conversion.join("");
		finalWorking.push(...conversionWorking);

		return {
			"oldBase": num,
			"newBase": convertedBase,
			"working": finalWorking
		};
	}

	if(fromBase === 2 && toBase === 8){
		// convert from binary to octal
		let moddedNum = num;
		while(moddedNum.length % 3 !== 0) moddedNum = "0" + moddedNum; // add 0's to the front till % 3 = 0

		const binarySplit = moddedNum.match(regex);
		conversionWorking.push(`${num} = ` + binarySplit.join("-"));
		for(const nibble of binarySplit){
			const binOct = binaryOctalObject[nibble];

			conversion.push(binOct);
			conversionWorking.push(`${nibble} = ${binOct}`);
		}

		convertedBase = conversion.join("");
		finalWorking.push(...conversionWorking);

		return {
			"oldBase": num,
			"newBase": convertedBase,
			"working": finalWorking
		};
	}

	// Octal to HEX and vice versa are not possible; Convert to binary instead.
}


// Binary
/**
 * Convert Binary to Octal
 * @argument {string} binary - The binary to convert to decimal
 * @returns {string} - The working
**/
function binToOct(binary){ // Working as intended
	binary = binary.replace(/[^01]*/g, ""); // Clean the binary of anything that isn't a 0 or 1
	const finalConversion = workingSteps(binary, 2, 8);
	const working = finalConversion.working.join("\n");
	const finalString = `<b>Binary to Octal:</b>\n${working}\n${finalConversion.oldBase + toSub(2)} = ${finalConversion.newBase + toSub(8)}`;
	return finalString;
}

/**
 * Convert Binary to Decimal
 * @argument {string} binary - The binary to convert to decimal
 * @argument {boolean} signed - If the binary is supposed to be signed
 * @argument {number} bits - The amount of bits, if lower than the number can support, will use minimum amount of bits instead
 * @returns {string} - The working
**/
function binToDec(binary, signed, bits){ // Working as intended
	binary = binary.replace(/[^01]*/g, ""); // Clean the binary of anything that isn't a 0 or 1
	const finalConversion = workingSteps(binary, 2, 10, signed, bits);

	finalConversion.working.push(finalConversion.newBase);

	let equals = "";
	while(finalConversion.oldBase.toString().length > equals.length) equals += " ";
	equals = "\n" + equals + " = ";

	const finalString = `<b>Binary to Decimal:</b>\n${finalConversion.oldBase} = ` + finalConversion.working.join(equals) + `\n${finalConversion.oldBase + toSub(2)} = ${finalConversion.newBase + toSub(10)}`;
	return finalString;
}

/**
 * Convert Binary to Hex
 * @argument {string} binary - The binary to convert to decimal
 * @returns {string} - The working
**/
function binToHex(binary){ // Working as intended
	binary = binary.replace(/[^01]*/g, ""); // Clean the binary of anything that isn't a 0 or 1
	const finalConversion = workingSteps(binary, 2, 16);
	const working = finalConversion.working.join("\n");
	const finalString = `<b>Binary to Hexadecimal:</b>\n${working}\n${finalConversion.oldBase + toSub(2)} = ${finalConversion.newBase + toSub(16)}`;
	return finalString;
}



// Octal
/**
 * Convert Octal to Binary
 * @argument {string} bin - The Octal to convert to decimal
 * @returns {string} - The working
**/
function octToBin(octal){
	const finalConversion = workingSteps(octal, 8, 2);
	const working = finalConversion.working.join("\n");
	const finalString = `<b>Octal to Binary:</b>\n${working}\n${finalConversion.oldBase + toSub(8)} = ${finalConversion.newBase + toSub(2)}`;
	return finalString;
}

/**
 * Convert Octal to Decimal
 * @argument {string} bin - The Octal to convert to decimal
 * @argument {boolean} signed - Whether or not it's a signed number
 * @returns {string} - The working
**/
function octToDec(octal, signed){ // Working as intended
	// Convert to binary, show working, then convert to decimal and show working
	const firstConversion = workingSteps(octal, 8, 2); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `<b>Octal to Binary:</b>\n${firstWorking}\n${firstConversion.oldBase + toSub(8)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 10, signed); // Convert to decimal
	finalConversion.working.push(finalConversion.newBase);
	let equals = "";
	while(finalConversion.oldBase.toString().length > equals.length) equals += " ";
	equals = "\n" + equals + " = ";

	const finalWorking = `${finalConversion.oldBase} = ` + finalConversion.working.join(equals);
	const finalString = firstString + "\n<b>Binary to Decimal:</b>\n" + finalWorking + `\n\n${firstConversion.oldBase + toSub(8)} = ${finalConversion.newBase + toSub(10)}`;

	return finalString;
}

/**
 * Convert Octal to Hex
 * @argument {string} bin - The Octal to convert to decimal
 * @returns {string} - The working
**/
function octToHex(octal){ // Currently Broken
	// Convert to binary, show working, then convert to hex and show working
	const firstConversion = workingSteps(octal, 8, 2); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `<b>Octal to Binary:</b>\n${firstWorking}\n${firstConversion.oldBase + toSub(8)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 16, true); // Convert to hex
	const finalWorking = finalConversion.working.join("\n");
	const finalString = firstString + "\n<b>Binary to Hexadecimal:</b>\n" + finalWorking + `\n\n${firstConversion.oldBase + toSub(8)} = ${finalConversion.newBase + toSub(16)}`;

	return finalString;
}



// Decimal - All of these need to be looked at
/**
 * Convert Decimal to Binary
 * @argument {number} decimal - The decimal to convert to binary
 * @argument {boolean} signed - If the binary is supposed to be signed
 * @argument {number} bits - The amount of bits, if lower than the number can support, will use minimum amount of bits instead. Includes sign bit if signed.
 * @returns {string} - The working
**/
function decToBin(decimal, signed, bits){
	const finalConversion = workingSteps(decimal, 10, 2, signed, bits);
	const working = finalConversion.working.join("\n");
	const finalString = `<b>Decimal to Binary:</b>\n${working}\n${finalConversion.oldBase + toSub(10)} = ${finalConversion.newBase + toSub(2)}`;
	return finalString;
}

/**
 * Convert Decimal to Octal
 *  @argument {deciaml} dec - The Decimal to convert to octal
 * @returns {string} - The working
**/
function decToOct(decimal, signed, bits){
	const firstConversion = workingSteps(decimal, 10, 2, signed, bits); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `<b>Decimal to Binary:</b>\n${firstWorking}\n${firstConversion.oldBase + toSub(10)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 8); // Convert to octal
	const finalWorking = finalConversion.working.join("\n");
	const finalString = firstString + "\n<b>Binary to Octal:</b>\n" + finalWorking + `\n${firstConversion.oldBase + toSub(10)} = ${finalConversion.newBase + toSub(8)}`;
	return finalString;
}

/**
 * Convert Decimal to Hexadecimal
 * @argument {number} decimal - The Decimal to convert to HEX
 * @returns {string} - The working
**/
function decToHex(decimal, signed, bits){
	const firstConversion = workingSteps(decimal, 10, 2, signed, bits); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `<b>Decimal to Binary:</b>\n${firstWorking}\n${firstConversion.oldBase + toSub(10)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 16);
	const finalWorking = finalConversion.working.join("\n");
	const finalString = firstString + "\n<b>Binary to Hexadecimal:</b>\n" + finalWorking + `\n${firstConversion.oldBase + toSub(10)} = ${finalConversion.newBase + toSub(16)}`;
	return finalString;
}



// Hexadecimal
/**
 * Convert Hexadecimal to Binary
 * @argument {number} hex - The HEX to convert to Decimal
 * @returns {string} - The working
**/
function hexToBin(hex){
	const finalConversion = workingSteps(hex, 16, 2);
	const working = finalConversion.working.join("\n");
	const finalString = `<b>HEX to Binary:</b>\n${working}\n${finalConversion.oldBase + toSub(16)} = ${finalConversion.newBase + toSub(2)}`;
	return finalString;
}

/**
 * Convert Hexadecimal to Octal
 * @argument {number} hex - The HEX to convert to Decimal
 * @returns {string} - The working
**/
function hexToOct(hex){
	// Convert to binary, show working, then convert to octal and show working
	const firstConversion = workingSteps(hex, 16, 2); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `<b>HEX to Binary:</b>\n${firstWorking}\n${firstConversion.oldBase + toSub(16)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 8, true); // Convert to hex
	const finalWorking = finalConversion.working.join("\n");
	const finalString = firstString + "\n<b>Binary to Octal:</b>\n" + finalWorking + `\n\n${firstConversion.oldBase + toSub(16)} = ${finalConversion.newBase + toSub(8)}`;

	return finalString;
}

/**
 * Convert Hexadecimal to Decimal
 * @argument {string} bin - The Octal to convert to decimal
 * @argument {boolean} signed - Whether or not it's a signed number
 * @returns {string} - The working
**/
function hexToDec(hex, signed){
	// Convert to binary, show working, then convert to decimal and show working
	const firstConversion = workingSteps(hex, 16, 2); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `<b>HEX to Binary:</b>\n${firstWorking}\n${firstConversion.oldBase + toSub(16)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 10, signed); // Convert to decimal
	finalConversion.working.push(finalConversion.newBase);
	let equals = "";
	while(finalConversion.oldBase.toString().length > equals.length) equals += " ";
	equals = "\n" + equals + " = ";

	const finalWorking = `${finalConversion.oldBase} = ` + finalConversion.working.join(equals);
	const finalString = firstString + "\n<b>Binary to Decimal:</b>\n" + finalWorking + `\n\n${firstConversion.oldBase + toSub(16)} = ${finalConversion.newBase + toSub(10)}`;

	return finalString;
}


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
 * Converts a binary exponant into the stored decimal form
 * @argument {number} bin - The binary exponant
 * @argument {number} expLength - The length of the exponant/ characteristic
 * @returns {number} The final floating point/ real number as stored in the binary
**/
function floatToDec(bin, expLength){
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



/**
 * Converts a floating point (real) number into binary exponant form
 * @argument {number} num - The floating point number to convert
 * @argument {number} totalBits - The amount of total bits that the exponant form has
 * @argument {number} expLength - The length of the exponant/ characteristic
 * @returns {string} The binary exponant form
**/
function decToFloat(num, totalBits, expLength){
	const standard32Bit = !!(totalBits === 32 && expLength === 8);

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

	// Loop down until we hit -mantissaLength + 10 or the target
	let total = 0;
	let firstMatch = !!leftSideBinary;
	let rightSideBinary = "";
	let largestNegPower = false;
	for(let i = -1; mantissaLength + 10 > rightSideBinary.length; i--){
		let bit = 0;
		const minPow = Math.pow(2, i);
		if(rightSideInt >= total + minPow){
			total += minPow;
			bit = 1;
			if(!largestNegPower) largestNegPower = i;
		}
		if(!firstMatch && bit === 1) firstMatch = true;
		if(firstMatch) rightSideBinary += bit;
		if(rightSideInt === total) break;
	}

	let mantissa = `${leftSideBinary}${rightSideBinary}`;
	mantissa = mantissa.slice(1, mantissa.length); // Slice off the leading 1
	while(mantissaLength > mantissa.length) mantissa += "0"; // if the mantissa is too short
	let truncated = false;
	if(mantissa.length > mantissaLength){
		mantissa = mantissa.slice(0, mantissaLength); // if the mantissa is too long
		truncated = true;
	}


	// Character/ Exponant - Highest power of 2 + the offset
	const maxPow = (leftSide === "0") ? largestNegPower : highestPower(parseInt(leftSide));
	const exponantOffset = Math.pow(2, expLength - 1) - 1;

	let character = maxPow + exponantOffset;
	character = character.toString(2);
	while(expLength > character.length) character = "0" + character;
	if(character.length > expLength) character = character.slice(0, expLength);

	let fullBinary = `${signBit}${character}${mantissa}`;
	console.log(fullBinary);

	if(standard32Bit && truncated){ // Rounding for single precision
		const bitPatterns = ["000", "001", "010", "011", "100", "101", "110", "111"];
		const preRound = mantissa.slice(0, mantissa.length - 3);
		let bestFit = fullBinary;
		for(const bits of bitPatterns){
			const newBiny = `${signBit}${character}${preRound}${bits}`;
			const newPattern = Math.abs(floatToDec(newBiny, expLength) - num); // Return the absolute value difference from num
			const oldPattern = Math.abs(floatToDec(bestFit, expLength) - num); // Return the absolute value difference from num

			if(newPattern > oldPattern) continue; // If the old value is smaller than the new value, we continue
			bestFit = newBiny;
			mantissa = `${preRound}${bits}`;
		}
		fullBinary = bestFit;
	}

	console.log(`Sign: ${signBit}`);
	console.log(`Characteristic: ${character}`);
	console.log(`Mantissa: ${mantissa}`);
	console.log(`Binary Split: ${signBit} | ${character} | ${mantissa}`);
	console.log(`Full Binary: ${fullBinary}`);

	return fullBinary;
}



// Navbar related
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e){
		e.preventDefault();
		const anchorLink = `[name=${this.getAttribute('href').replace("#", "")}]`;
		document.querySelector(anchorLink).scrollIntoView({
			behavior: 'smooth'
		});
	});
});

function topNavMobile(){
	const x = document.getElementById("topNav");
	if(x.className === "topnav"){
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

function activeNavBar(elementID){
	if(!elementID) return;
	const e = document.getElementById(elementID);
	e.className = "active";
}

if(page) activeNavBar(page);

// Custom Scripts

// Show or hide an element
function showHide(){
	const val = this.value;
	const divToHide = document.getElementById("totalBitsDiv");
	if(val === "to") divToHide.style.display = "block";
	if(val === "from") divToHide.style.display = "none";
}
try {
	document.getElementById("toFrom").onchange = showHide;
} catch (e){ null; }

function changeConversion(){
	const value = this.value;

	const elementObj = {
		"2": "binaryContainer",
		"8": "octalContainer",
		"10": "decimalContainer",
		"16": "hexadecimalContainer"
	};

	for(const key in elementObj){
		const val = elementObj[key];
		document.getElementById(val).style.display = (value.toString() === key.toString()) ? "none" : "block";
	}

	const inputField = document.getElementById("ipt_baseConversion");
	inputField.value = "";

	const base = elementObj[value.toString()].replace("Container", "");
	inputField.placeholder = `Enter a${(base === "octal") ? "n" : ""} ${base} number`;
}
try {
	document.getElementById("fromBase").onchange = changeConversion;
} catch (e){ null; }


// Convert and Show the working for each base
function convertToBases(){
	const fromBase = document.getElementById("fromBase").value.toString();
	const value = document.getElementById("ipt_baseConversion").value.toString();

	let signed;
	const signedElems = document.getElementsByName("signed");
	for(const element of signedElems){
		console.log(typeof element.value);
		if(element.checked) signed = element.value;
	}
	signed = (signed === "true");

	if(!value) return;

	let bin, oct, dec, hex;

	const lineBreak = /\n/g;
	switch(fromBase){
		case "2":
			bin = `<b>Binary:</b><br>${value}₂ = ${value}₂`;
			oct = binToOct(value).replace(lineBreak, "<br>");
			dec = binToDec(value, signed).replace(lineBreak, "<br>");
			hex = binToHex(value).replace(lineBreak, "<br>");
			break;

		case "8":
			bin = octToBin(value).replace(lineBreak, "<br>");
			oct = `<b>Octal:</b><br>${value}₈ = ${value}₈`;
			dec = octToDec(value, signed).replace(lineBreak, "<br>");
			hex = octToHex(value).replace(lineBreak, "<br>");
			break;

		case "10":
			bin = decToBin(value, signed).replace(lineBreak, "<br>");
			oct = decToOct(value, signed).replace(lineBreak, "<br>");
			dec = `<b>Decimal:</b><br>${value}₁₀ = ${value}₁₀`;
			hex = decToHex(value, signed).replace(lineBreak, "<br>");
			break;

		case "16":
			bin = hexToBin(value).replace(lineBreak, "<br>");
			oct = hexToOct(value).replace(lineBreak, "<br>");
			dec = hexToDec(value, signed).replace(lineBreak, "<br>");
			hex = `<b>Hexadecimal:</b><br>${value}₁₆ = ${value}₁₆`;
			break;
	}

	const binElem = document.getElementById("bin");
	const octElem = document.getElementById("oct");
	const decElem = document.getElementById("dec");
	const hexElem = document.getElementById("hex");

	binElem.classList.add("fade");
	octElem.classList.add("fade");
	decElem.classList.add("fade");
	hexElem.classList.add("fade");

	setTimeout(() => {
		binElem.innerHTML = bin;
		octElem.innerHTML = oct;
		decElem.innerHTML = dec;
		hexElem.innerHTML = hex;
	}, 490);

	setTimeout(() => {
		binElem.classList.remove("fade");
		octElem.classList.remove("fade");
		decElem.classList.remove("fade");
		hexElem.classList.remove("fade");
	}, 520);
}