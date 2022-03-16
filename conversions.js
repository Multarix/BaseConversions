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
		if(moddedNum !== num) conversionWorking.push(`${num} = ${moddedNum}`);

		const binarySplit = moddedNum.match(regex);
		conversionWorking.push(binarySplit.join(" | "));
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
		if(moddedNum !== num) conversionWorking.push(`${num} = ${moddedNum}`);

		const binarySplit = moddedNum.match(regex);
		conversionWorking.push(binarySplit.join(" | "));
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
function binaryToOctal(binary){ // Working as intended
	binary = binary.replace(/[^01]*/g, ""); // Clean the binary of anything that isn't a 0 or 1
	const finalConversion = workingSteps(binary, 2, 8);
	const working = finalConversion.working.join("\n");
	const finalString = `Convert from Binary to Octal:\n${working}\n${finalConversion.oldBase + toSub(2)} = ${finalConversion.newBase + toSub(8)}`;
	return finalString;
}

/**
 * Convert Binary to Decimal
 * @argument {string} binary - The binary to convert to decimal
 * @argument {boolean} signed - If the binary is supposed to be signed
 * @argument {number} bits - The amount of bits, if lower than the number can support, will use minimum amount of bits instead
 * @returns {string} - The working
**/
function binaryToDecimal(binary, signed, bits){ // Working as intended
	binary = binary.replace(/[^01]*/g, ""); // Clean the binary of anything that isn't a 0 or 1
	const finalConversion = workingSteps(binary, 2, 10, signed, bits);

	finalConversion.working.push(finalConversion.newBase);

	let equals = "";
	while(finalConversion.oldBase.toString().length > equals.length) equals += " ";
	equals = "\n" + equals + " = ";

	const finalString = `Convert from Binary to Decimal:\n${finalConversion.oldBase} = ` + finalConversion.working.join(equals) + `\n${finalConversion.oldBase + toSub(2)} = ${finalConversion.newBase + toSub(10)}`;
	return finalString;
}

/**
 * Convert Binary to Hex
 * @argument {string} binary - The binary to convert to decimal
 * @returns {string} - The working
**/
function binaryToHex(binary){ // Working as intended
	binary = binary.replace(/[^01]*/g, ""); // Clean the binary of anything that isn't a 0 or 1
	const finalConversion = workingSteps(binary, 2, 16);
	const working = finalConversion.working.join("\n");
	const finalString = `Convert from Binary to HEX:\n${working}\n${finalConversion.oldBase + toSub(2)} = ${finalConversion.newBase + toSub(16)}`;
	return finalString;
}



// Octal
/**
 * Convert Octal to Binary
 * @argument {string} bin - The Octal to convert to decimal
 * @returns {string} - The working
**/
function octalToBinary(octal){
	const finalConversion = workingSteps(octal, 8, 2);
	const working = finalConversion.working.join("\n");
	const finalString = `Convert from Octal to Binary:\n${working}\n${finalConversion.oldBase + toSub(8)} = ${finalConversion.newBase + toSub(2)}`;
	return finalString;
}

/**
 * Convert Octal to Decimal
 * @argument {string} bin - The Octal to convert to decimal
 * @argument {boolean} signed - Whether or not it's a signed number
 * @returns {string} - The working
**/
function octalToDecimal(octal, signed){ // Working as intended
	// Convert to binary, show working, then convert to decimal and show working
	const firstConversion = workingSteps(octal, 8, 2); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `Convert from Octal to Binary:\n${firstWorking}\n${firstConversion.oldBase + toSub(8)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 10, signed); // Convert to decimal
	finalConversion.working.push(finalConversion.newBase);
	let equals = "";
	while(finalConversion.oldBase.toString().length > equals.length) equals += " ";
	equals = "\n" + equals + " = ";

	const finalWorking = `${finalConversion.oldBase} = ` + finalConversion.working.join(equals);
	const finalString = firstString + "\nConvert from Binary to Decimal:\n" + finalWorking + `\n\n${firstConversion.oldBase + toSub(8)} = ${finalConversion.newBase + toSub(10)}`;

	return finalString;
}

/**
 * Convert Octal to Hex
 * @argument {string} bin - The Octal to convert to decimal
 * @returns {string} - The working
**/
function octalToHex(octal){ // Currently Broken
	// Convert to binary, show working, then convert to hex and show working
	const firstConversion = workingSteps(octal, 8, 2); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `Convert from Octal to Binary:\n${firstWorking}\n${firstConversion.oldBase + toSub(8)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 16, true); // Convert to hex
	const finalWorking = finalConversion.working.join("\n");
	const finalString = firstString + "\nConvert from Binary to HEX\n" + finalWorking + `\n\n${firstConversion.oldBase + toSub(8)} = ${finalConversion.newBase + toSub(16)}`;

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
function decimalToBinary(decimal, signed, bits){
	const finalConversion = workingSteps(decimal, 10, 2, signed, bits);
	const working = finalConversion.working.join("\n");
	const finalString = `Convert from Decimal to Binary:\n${working}\n${finalConversion.oldBase + toSub(10)} = ${finalConversion.newBase + toSub(2)}`;
	return finalString;
}

/**
 * Convert Decimal to Octal
 *  @argument {deciaml} dec - The Decimal to convert to octal
 * @returns {string} - The working
**/
function decimalToOctal(decimal, signed, bits){
	const firstConversion = workingSteps(decimal, 10, 2, signed, bits); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `Convert from Decimal to Binary:\n${firstWorking}\n${firstConversion.oldBase + toSub(10)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 8); // Convert to octal
	const finalWorking = finalConversion.working.join("\n");
	const finalString = firstString + "\nConvert from Binary to Octal\n" + finalWorking + `\n${firstConversion.oldBase + toSub(10)} = ${finalConversion.newBase + toSub(8)}`;
	return finalString;
}

/**
 * Convert Decimal to Hexadecimal
 * @argument {number} decimal - The Decimal to convert to HEX
 * @returns {string} - The working
**/
function decimalToHex(decimal, signed, bits){
	const firstConversion = workingSteps(decimal, 10, 2, signed, bits); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `Convert from Decimal to Binary:\n${firstWorking}\n${firstConversion.oldBase + toSub(10)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 16);
	const finalWorking = finalConversion.working.join("\n");
	const finalString = firstString + "\nConvert from Binary to HEX\n" + finalWorking + `\n${firstConversion.oldBase + toSub(10)} = ${finalConversion.newBase + toSub(16)}`;
	return finalString;
}



// Hexadecimal
/**
 * Convert Hexadecimal to Binary
 * @argument {number} hex - The HEX to convert to Decimal
 * @returns {string} - The working
**/
function hexToBinary(hex){
	const finalConversion = workingSteps(hex, 16, 2);
	const working = finalConversion.working.join("\n");
	const finalString = `Convert from HEX to Binary:\n${working}\n${finalConversion.oldBase + toSub(16)} = ${finalConversion.newBase + toSub(2)}`;
	return finalString;
}

/**
 * Convert Hexadecimal to Octal
 * @argument {number} hex - The HEX to convert to Decimal
 * @returns {string} - The working
**/
function hexToOctal(hex){
	// Convert to binary, show working, then convert to octal and show working
	const firstConversion = workingSteps(hex, 16, 2); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `Convert from HEX to Binary:\n${firstWorking}\n${firstConversion.oldBase + toSub(16)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 8, true); // Convert to hex
	const finalWorking = finalConversion.working.join("\n");
	const finalString = firstString + "\nConvert from Binary to Octal\n" + finalWorking + `\n\n${firstConversion.oldBase + toSub(16)} = ${finalConversion.newBase + toSub(8)}`;

	return finalString;
}

/**
 * Convert Hexadecimal to Decimal
 * @argument {string} bin - The Octal to convert to decimal
 * @argument {boolean} signed - Whether or not it's a signed number
 * @returns {string} - The working
**/
function hexToDecimal(hex, signed){
	// Convert to binary, show working, then convert to decimal and show working
	const firstConversion = workingSteps(hex, 16, 2); // Convert to binary
	const firstWorking = firstConversion.working.join("\n");
	const firstString = `Convert from HEX to Binary:\n${firstWorking}\n${firstConversion.oldBase + toSub(16)} = ${firstConversion.newBase + toSub(2)}\n`;

	const finalConversion = workingSteps(firstConversion.newBase, 2, 10, signed); // Convert to decimal
	finalConversion.working.push(finalConversion.newBase);
	let equals = "";
	while(finalConversion.oldBase.toString().length > equals.length) equals += " ";
	equals = "\n" + equals + " = ";

	const finalWorking = `${finalConversion.oldBase} = ` + finalConversion.working.join(equals);
	const finalString = firstString + "\nConvert from Binary to Decimal:\n" + finalWorking + `\n\n${firstConversion.oldBase + toSub(16)} = ${finalConversion.newBase + toSub(10)}`;

	return finalString;
}


// BINARY to other bases
// console.log(binaryToOctal("0011 1001 1111"));
// console.log("\n");
// console.log(binaryToOctal("1011 1001 1111"));
// console.log("\n");

// console.log(binaryToDecimal("0011 1001 1111", true, 12));
// console.log("\n");
// console.log(binaryToDecimal("1011 1001 1111", true));
// console.log("\n");

// console.log(binaryToHex("0011 1001 1111"));
// console.log("\n");
// console.log(binaryToHex("1011 1001 1111"));
// console.log("\n");


// OCTAL to other bases
// console.log(octalToBinary("47"));
// console.log("\n");
// console.log(octalToBinary("745"));
// console.log("\n");

// console.log(octalToDecimal("747", false));
// console.log("\n");
// console.log(octalToDecimal("145", true));
// console.log("\n");

// console.log(octalToHex("747"));
// console.log("\n");
// console.log(octalToHex("145"));
// console.log("\n");


// DECIMAL to other bases
/* Need to add negative working */
// console.log(decimalToBinary(1739, false));
// console.log("\n");
// console.log(decimalToBinary(-1739, true, 12));
// console.log("\n");

// console.log(decimalToOctal(1739, false));
// console.log("\n");
// console.log(decimalToOctal(-1739, true, 12));
// console.log("\n");

// console.log(decimalToHex(1739, false));
// console.log("\n");
// console.log(decimalToHex(-1739, true, 12));
// console.log("\n");


// HEX to other bases
// console.log(hexToBinary("6CB"));
// console.log("\n");
// console.log(hexToBinary("935"));
// console.log("\n");
// console.log("\n");

// console.log(hexToOctal("6CB"));
// console.log("\n");
// console.log(hexToOctal("935"));
// console.log("\n");

// console.log(hexToDecimal("6CB", false));
// console.log("\n");
// console.log(hexToDecimal("935", true));