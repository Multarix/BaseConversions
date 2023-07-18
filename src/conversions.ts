import { getBounds, invertBinary, nextHighestPower, removeLeadingZeros, superScript } from "./funcs.js";
import { binaryHexObject, binaryOctalObject, hexObject, subScript } from "./objects.js";
import { BinaryHexObject, BinaryOctalObject, Conversion, DeciBin, HexObject } from "./types/interfaces";
import { NumberLike } from "./types/types";


// Unsigned Binary To X
function uBinToOct(binary: NumberLike): Conversion {
	const BINARY = binary.toString();

	let tribble = BINARY;
	while(tribble.length % 3 !== 0){
		tribble = "0" + tribble;
	}

	const tribbles = tribble.match(/[01]{3,3}/g) ?? [];
	const octalNumbers = [...tribbles.map(bits => binaryOctalObject[bits as keyof BinaryOctalObject])];

	const conversion: string[] = [];

	conversion.push(`${BINARY} = ${tribbles.join("-")}`);
	for(let i = 0; i < octalNumbers.length; i++){
		conversion.push(`${tribbles[i]} = ${octalNumbers[i]}`);
	}

	const octal = removeLeadingZeros(octalNumbers.join(""));
	conversion.push("", `${BINARY}${subScript[2]} = ${octal}${subScript[8]}`);

	return { newNumber: octal, conversion: conversion.join("\n") };
}

function uBinToDec(binary: NumberLike): Conversion {
	const BINARY = binary.toString();

	const bits = BINARY.split("").reverse(); // [1, 0, 1, 0] -> [0, 1, 0, 1] So we can use the index as the power;
	const conversion: string[] = [];
	const preConvert: DeciBin[] = [];
	let deciCount = 0;

	for(let i = 0; i < bits.length; i++){
		const sup = superScript(i.toString());
		const bitMath = `(${bits[i]} \u00d7 2${sup})`;

		const bitInt = parseInt(bits[i]);

		const num = Math.pow(2, i);
		deciCount += num * bitInt;

		preConvert.push({ num, bitMath, include: !!bitInt }); // Double ! to turn into a boolean
	}
	preConvert.reverse();

	const bitMathArray = preConvert.map(item => item.bitMath);
	if(bitMathArray.length >= 5){
		const first = bitMathArray.shift();
		const second = bitMathArray.shift();
		const last = bitMathArray.pop();

		bitMathArray.splice(0, bitMathArray.length);
		bitMathArray.push(first as string, second as string, "...", last as string);
	}
	const bitMath = bitMathArray.join(" + ");

	const onlyIncluded = preConvert.filter(item => item.include);
	if(onlyIncluded.length >= 5){
		const first = onlyIncluded.shift();
		const second = onlyIncluded.shift();
		const last = onlyIncluded.pop();

		onlyIncluded.splice(0, onlyIncluded.length);
		onlyIncluded.push(first as DeciBin, second as DeciBin, { num: "...", bitMath: "...", include: true }, last as DeciBin);
	}

	const relevantBitMathString = onlyIncluded.map(item => item.bitMath).join(" + ");
	const numString = onlyIncluded.map(item => item.num).join(" + ");

	conversion.push(
		`${BINARY} = ${bitMath}`,
		`= ${relevantBitMathString}`,
		`= ${numString}`,
		`= ${deciCount}`,
		"",
		`${BINARY}${subScript[2]} = ${deciCount}${subScript[10]}`
	);

	return { newNumber: deciCount, conversion: conversion.join("\n") };
}

function uBinToHex(binary: NumberLike): Conversion {
	const BINARY = binary.toString();

	let triCleaned = BINARY;
	while(triCleaned.length % 4 !== 0){
		triCleaned = "0" + triCleaned;
	}

	const nibbles = triCleaned.match(/[01]{4,4}/g) ?? [];
	const hexNumbers = [...nibbles.map(bits => binaryHexObject[bits as keyof BinaryHexObject])];

	const conversion: string[] = [];

	conversion.push(`${BINARY} = ${nibbles.join("-")}`);
	for(let i = 0; i < hexNumbers.length; i++){
		conversion.push(`${nibbles[i]} = ${hexNumbers[i]}`);
	}

	const hex = removeLeadingZeros(hexNumbers.join(""));
	conversion.push("", `${BINARY}${subScript[2]} = ${hex}${subScript[16]}`);

	return { newNumber: hex, conversion: conversion.join("\n") };
}



// Unsigned Octal To X
function uOctToBin(octal: NumberLike): Conversion {
	const OCTAL = octal.toString();
	const conversion: string[] = [];

	let binary = "";

	const octSplit = OCTAL.split("");
	for(const oct of octSplit){
		const nibble = binaryOctalObject[oct as keyof BinaryOctalObject];

		binary += nibble;
		conversion.push(`${oct} = ${nibble}`);
	}

	binary = removeLeadingZeros(binary);

	conversion.push("", `${OCTAL}${subScript[8]} = ${binary}${subScript[2]}`);

	return { newNumber: binary, conversion: conversion.join("\n") };
}

function uOctToDec(octal: NumberLike): Conversion {
	const cleaned = octal.toString();

	const octs = cleaned.split("").reverse();
	const conversion: string[] = [];
	const preConvert: DeciBin[] = [];
	let deciCount = 0;

	for(let i = 0; i < octs.length; i++){
		const sup = superScript(i.toString());
		const octMath = `(${octs[i]} \u00d7 8${sup})`;

		const octInt = parseInt(octs[i]);

		const num = Math.pow(8, i);
		deciCount += num * octInt;

		preConvert.push({ num, bitMath: octMath, include: !!octInt }); // Double ! to turn into a boolean
	}
	preConvert.reverse();

	const octMathArray = preConvert.map(item => item.bitMath);
	if(octMathArray.length >= 5){
		const first = octMathArray.shift();
		const second = octMathArray.shift();
		const last = octMathArray.pop();

		octMathArray.splice(0, octMathArray.length);
		octMathArray.push(first as string, second as string, "...", last as string);
	}
	const octMath = octMathArray.join(" + ");

	const onlyIncluded = preConvert.filter(item => item.include);
	if(onlyIncluded.length >= 5){
		const first = onlyIncluded.shift();
		const second = onlyIncluded.shift();
		const last = onlyIncluded.pop();

		onlyIncluded.splice(0, onlyIncluded.length);
		onlyIncluded.push(first as DeciBin, second as DeciBin, { num: "...", bitMath: "...", include: true }, last as DeciBin);
	}

	const relevantOctMathString = onlyIncluded.map(item => item.bitMath).join(" + ");
	const numString = onlyIncluded.map(item => item.num).join(" + ");

	conversion.push(
		`${cleaned} = ${octMath}`,
		`= ${relevantOctMathString}`,
		`= ${numString}`,
		`= ${deciCount}`,
		"",
		`${cleaned}${subScript[8]} = ${deciCount}${subScript[10]}`
	);

	return { newNumber: deciCount, conversion: conversion.join("\n") };
}

function uOctToHex(octal: NumberLike): Conversion {
	const bin = uOctToBin(octal);
	const hex = uBinToHex(bin.newNumber);

	const conversion: string[] = [];
	conversion.push(bin.conversion, "", hex.conversion);

	return { newNumber: hex.newNumber, conversion: conversion.join("\n") };
}

/*
255 % 2 = 1
127 % 2 = 1
63 % 2 = 1
31 % 2 = 1

15 % 2 = 1
7 % 2 = 1
3 % 2 = 1
1 % 2 = 1
*/

// Unsigned Decimal To X
function uDecToBin(decimal: NumberLike): Conversion {
	const DECIMAL = decimal.toString();
	let deci = parseInt(DECIMAL);

	const conversion: string[] = [];
	const binary: string[] = [];

	while(deci !== 0){
		const remainder = deci % 2;
		conversion.push(`${deci} % 2 = ${remainder}`);
		binary.push(remainder.toString());

		deci = (deci - remainder) / 2;
	}

	const bin = removeLeadingZeros(binary.reverse().join(""));
	conversion.push("", `${DECIMAL}${subScript[10]} = ${bin}${subScript[2]}`);

	return { newNumber: bin, conversion: conversion.join("\n") };
}

function uDecToOct(decimal: NumberLike): Conversion {
	const DECIMAL = decimal.toString();
	let deci = parseInt(DECIMAL);

	const conversion: string[] = [];
	const octal: string[] = [];

	while(deci !== 0){
		const remainder = deci % 8;
		conversion.push(`${deci} % 8 = ${remainder}`);
		octal.push(remainder.toString());

		deci = (deci - remainder) / 8;
	}

	const oct = removeLeadingZeros(octal.reverse().join(""));
	conversion.push("", `${DECIMAL}${subScript[10]} = ${oct}${subScript[8]}`);

	return { newNumber: oct, conversion: conversion.join("\n") };
}

function uDecToHex(decimal: NumberLike): Conversion {
	const DECIMAL = decimal.toString();
	let deci = parseInt(DECIMAL);

	const conversion: string[] = [];
	const hexadecimal: string[] = [];

	while(deci !== 0){
		const remainder = deci % 16;

		const hexChar = hexObject[remainder.toString() as keyof HexObject];
		let convertString = `${deci} % 16 = ${remainder}`;
		if(remainder >= 10) convertString += ` (${hexChar})`;

		conversion.push(convertString);
		hexadecimal.push(hexChar);

		deci = (deci - remainder) / 16;
	}

	const hex = removeLeadingZeros(hexadecimal.reverse().join(""));
	conversion.push("", `${DECIMAL}${subScript[10]} = ${hex}${subScript[16]}`);

	return { newNumber: hex, conversion: conversion.join("\n") };
}



// Unsigned Hex To X
function uHexToBin(hexadecimal: NumberLike): Conversion {
	const HEXADECIMAL = hexadecimal.toString();

	const hexSplit = HEXADECIMAL.split("");
	const conversion: string[] = [];

	let binary = "";
	for(const hex of hexSplit){
		const nibble = binaryHexObject[hex as keyof BinaryHexObject];

		binary += nibble;
		conversion.push(`${hex} = ${nibble}`);
	}

	const bin = removeLeadingZeros(binary);
	conversion.push("", `${HEXADECIMAL}${subScript[16]} = ${bin}${subScript[2]}`);

	return { newNumber: bin, conversion: conversion.join("\n") };
}

function uHexToDec(hexadecimal: NumberLike): Conversion {
	const HEXADECIMAL = hexadecimal.toString();

	const hexSplit = HEXADECIMAL.split("").reverse();
	const conversion: string[] = [];
	const preConvert: DeciBin[] = [];
	let deciCount = 0;

	for(let i = 0; i < hexSplit.length; i++){
		const sup = superScript(i.toString());
		const hexNum = hexObject[hexSplit[i] as keyof HexObject];
		const hexMath = `(${hexNum} \u00d7 16${sup})`;

		const hexInt = parseInt(hexNum);

		const num = Math.pow(16, i);
		deciCount += num * hexInt;

		preConvert.push({ num, bitMath: hexMath, include: !!hexInt }); // Double ! to turn into a boolean
	}

	preConvert.reverse();

	const hexMathArray = preConvert.map(item => item.bitMath);
	if(hexMathArray.length >= 5){
		const first = hexMathArray.shift();
		const second = hexMathArray.shift();
		const last = hexMathArray.pop();

		hexMathArray.splice(0, hexMathArray.length);
		hexMathArray.push(first as string, second as string, "...", last as string);
	}
	const hexMath = hexMathArray.join(" + ");

	const onlyIncluded = preConvert.filter(item => item.include);
	if(onlyIncluded.length >= 5){
		const first = onlyIncluded.shift();
		const second = onlyIncluded.shift();
		const last = onlyIncluded.pop();

		onlyIncluded.splice(0, onlyIncluded.length);
		onlyIncluded.push(first as DeciBin, second as DeciBin, { num: "...", bitMath: "...", include: true }, last as DeciBin);
	}

	const relevantHexMathString = onlyIncluded.map(item => item.bitMath).join(" + ");
	const numString = onlyIncluded.map(item => item.num).join(" + ");

	conversion.push(
		`${HEXADECIMAL} = ${hexMath}`,
		`= ${relevantHexMathString}`,
		`= ${numString}`,
		`= ${deciCount}`,
		"",
		`${HEXADECIMAL}${subScript[16]} = ${deciCount}${subScript[10]}`
	);

	return { newNumber: deciCount, conversion: conversion.join("\n") };
}

function uHexToOct(hexadecimal: NumberLike): Conversion {
	const bin = uHexToBin(hexadecimal);
	const oct = uBinToOct(bin.newNumber);

	const conversion: string[] = [];
	conversion.push(bin.conversion, "", oct.conversion);

	return { newNumber: oct.newNumber, conversion: conversion.join("\n") };
}



// Signed Binary To X
function sBinToOct(binary: NumberLike, _bits: number): Conversion {
	return uBinToOct(binary);
}

function sBinToDec(binary: NumberLike, _bits: number): Conversion {
	const BINARY = binary.toString();

	if(BINARY.length === 1) return { newNumber: BINARY, conversion: `${BINARY}${subScript[2]} = ${BINARY}${subScript[10]}` };

	const conversion: string[] = [];
	const preConvert: DeciBin[] = [];

	const bits = BINARY.split("");
	const isNegative = (bits[0] === "1");

	conversion.push(`Sign bit: ${bits[0]} (${isNegative ? "Negative" : "Positive"})`);
	bits.splice(0, 1);
	bits.reverse();

	if(isNegative){
		const uninvertedBits = [...bits];
		invertBinary(bits); // Invert the bits, because it's negative
		conversion.push(`Invert bits: ${uninvertedBits.join("")} -> ${bits.join("")}`);
	}

	let deciCount = 0;

	for(let i = 0; i < bits.length; i += 1){
		const sup = superScript(i.toString());
		const bitMath = `(${bits[i]} \u00d7 2${sup})`;

		const bitInt = parseInt(bits[i]);

		const num = Math.pow(2, i);
		deciCount += num * bitInt;

		preConvert.push({ num, bitMath, include: !!bitInt }); // Double ! to turn into a boolean
	}
	preConvert.reverse();

	const bitMathArray = preConvert.map(item => item.bitMath);
	if(bitMathArray.length >= 5){
		const first = bitMathArray.shift();
		const second = bitMathArray.shift();
		const last = bitMathArray.pop();

		bitMathArray.splice(0, bitMathArray.length);
		bitMathArray.push(first as string, second as string, "...", last as string);
	}

	const onlyIncluded = preConvert.filter(item => item.include);
	if(onlyIncluded.length >= 5){
		const first = onlyIncluded.shift();
		const second = onlyIncluded.shift();
		const last = onlyIncluded.pop();

		onlyIncluded.splice(0, onlyIncluded.length);
		onlyIncluded.push(first as DeciBin, second as DeciBin, { num: "...", bitMath: "...", include: true }, last as DeciBin);
	}

	let bitMath = bitMathArray.join(" + ");
	let relevantBitMathString = onlyIncluded.map(item => item.bitMath).join(" + ");
	let numString = onlyIncluded.map(item => item.num).join(" + ");

	bitMath = (isNegative) ? `= ((${bitMath}) + 1) \u00d7 -1` : `= ${bitMath}`;
	relevantBitMathString = (isNegative) ? `= ((${relevantBitMathString || "0"}) + 1) \u00d7 -1` : `= ${relevantBitMathString}`;
	numString = (isNegative) ? `= ((${numString || "0"}) + 1) \u00d7 -1` : `= ${numString}`;
	const deciString = (isNegative) ? `= (${deciCount} + 1) \u00d7 -1` : "";

	if(bitMath !== relevantBitMathString) conversion.push(bitMath);
	if(relevantBitMathString !== numString) conversion.push(relevantBitMathString);
	conversion.push(numString);

	if(deciString) conversion.push(deciString);

	if(isNegative){
		deciCount += 1;
		conversion.push(`= ${deciCount} \u00d7 -1`);
		deciCount *= -1;
	}

	conversion.push(
		`= ${deciCount}`,
		"",
		`${BINARY}${subScript[2]} = ${deciCount}${subScript[10]}`
	);

	return { newNumber: deciCount, conversion: conversion.join("\n") };
}

function sBinToHex(binary: NumberLike, _bits: number): Conversion {
	return uBinToHex(binary);
}


// Signed Octal To X
function sOctToBin(octal: NumberLike, bits: number): Conversion {
	const OCTAL = octal.toString();
	const conversion: string[] = [];

	let binary = "";

	const octSplit = OCTAL.split("");
	for(const oct of octSplit){
		const tribble = binaryOctalObject[oct as keyof BinaryOctalObject];

		binary += tribble;
		conversion.push(`${oct} = ${tribble}`);
	}

	// Remove the leading zeros, then add back any zeros that are needed to make the binary number the correct length
	binary = removeLeadingZeros(binary);
	for(let i = binary.length; i < bits; i++) binary = "0" + binary;

	conversion.push("", `${OCTAL}${subScript[8]} = ${binary}${subScript[2]}`);

	return { newNumber: binary, conversion: conversion.join("\n") };
}

function sOctToDec(octal: NumberLike, bits: number): Conversion {
	const BINARY = sOctToBin(octal, bits);
	const DECIMAL = sBinToDec(BINARY.newNumber, bits);

	const conversion: string[] = [];
	conversion.push(BINARY.conversion, "", DECIMAL.conversion);

	return { newNumber: 0, conversion: conversion.join("\n") };
}

function sOctToHex(octal: NumberLike, bits: number): Conversion {
	const BINARY = sOctToBin(octal, bits);
	const HEX = sBinToHex(BINARY.newNumber, bits);

	const conversion: string[] = [];
	conversion.push(BINARY.conversion, "", HEX.conversion);

	return { newNumber: 0, conversion: conversion.join("\n") };
}

// Signed Decimal To X
function sDecToBin(decimal: NumberLike, bits: number): Conversion {
	const DECIMAL = parseInt(decimal.toString());

	const signBit = (DECIMAL >= 0) ? "0" : "1";
	const isNegative = (signBit === "1");

	const bounds = getBounds(bits);
	if(DECIMAL > bounds.upper || DECIMAL < bounds.lower){
		const pow = nextHighestPower(DECIMAL, true);

		/* eslint-disable-next-line no-console */
		console.warn(`The number '${DECIMAL}' is out of bounds for '${bits}' bits, using '${pow + 1}' bits instead.`);

		bits = pow + 1;

		const newBounds = getBounds(pow + 1);
		bounds.lower = newBounds.lower;
		bounds.upper = newBounds.upper;
	}

	const conversion: string[] = [];
	const binary: string[] = [];

	let deci = (isNegative) ? (DECIMAL + 1) * -1 : DECIMAL;

	while(deci !== 0){
		const remainder = deci % 2;
		conversion.push(`${deci} % 2 = ${remainder}`);
		binary.push(remainder.toString());

		deci = (deci - remainder) / 2;
	}

	conversion.push(`Sign bit: ${signBit} (${isNegative ? "Negative" : "Positive"})`);
	binary.reverse();

	if(isNegative){
		const uninvertedBits = [...binary];
		invertBinary(binary); // Invert the bits, because it's negative
		conversion.push(`Invert bits: ${uninvertedBits.join("")} -> ${binary.join("")}`);
	}

	while(binary.length + 1 < bits){
		// Add leading 1/ 0's to make the binary number the correct length
		(isNegative) ? binary.unshift("1") : binary.unshift("0");
	}

	const bin = `${signBit}${binary.join("")}`;
	conversion.push("", `${DECIMAL}${subScript[10]} = ${bin}${subScript[2]}`);

	return { newNumber: bin, conversion: conversion.join("\n") };
}

function sDecToOct(decimal: NumberLike, bits: number): Conversion {
	const bin = sDecToBin(decimal, bits);
	const oct = uBinToOct(bin.newNumber);

	const conversion: string[] = [];
	conversion.push(bin.conversion, "", oct.conversion);

	return { newNumber: oct.newNumber, conversion: conversion.join("\n") };
}


function sDecToHex(decimal: NumberLike, bits: number): Conversion {
	const bin = sDecToBin(decimal, bits);
	const hex = uBinToHex(bin.newNumber);

	const conversion: string[] = [];
	conversion.push(bin.conversion, "", hex.conversion);

	return { newNumber: hex.newNumber, conversion: conversion.join("\n") };
}


// Signed Hexadecimal To X
function sHexToBin(hexadecimal: NumberLike, bits: number): Conversion {
	const HEXADECIMAL = hexadecimal.toString();
	const conversion: string[] = [];

	let binary = "";

	const hexSplit = HEXADECIMAL.split("");
	for(const hex of hexSplit){
		const nibble = binaryHexObject[hex as keyof BinaryHexObject];

		binary += nibble;
		conversion.push(`${hex} = ${nibble}`);
	}

	// Remove the leading zeros, then add back any zeros that are needed to make the binary number the correct length
	binary = removeLeadingZeros(binary);
	for(let i = binary.length; i < bits; i++) binary = "0" + binary;

	conversion.push("", `${HEXADECIMAL}${subScript[16]} = ${binary}${subScript[2]}`);

	return { newNumber: binary, conversion: conversion.join("\n") };
}

function sHexToOct(hexadecimal: NumberLike, bits: number): Conversion {
	const bin = sHexToBin(hexadecimal, bits);
	const oct = uBinToOct(bin.newNumber);

	const conversion: string[] = [];
	conversion.push(bin.conversion, "", oct.conversion);

	return { newNumber: oct.newNumber, conversion: conversion.join("\n") };
}

function sHexToDec(hexadecimal: NumberLike, bits: number): Conversion {
	const bin = sHexToBin(hexadecimal, bits);
	const dec = sBinToDec(bin.newNumber, bits);

	const conversion: string[] = [];
	conversion.push(bin.conversion, "", dec.conversion);

	return { newNumber: dec.newNumber, conversion: conversion.join("\n") };
}

export {
	sBinToDec, sBinToHex, sBinToOct, sDecToBin, sDecToHex, sDecToOct, sHexToBin, sHexToDec, sHexToOct, sOctToBin, sOctToDec, sOctToHex,
	uBinToDec, uBinToHex, uBinToOct, uDecToBin, uDecToHex, uDecToOct, uHexToBin, uHexToDec, uHexToOct, uOctToBin, uOctToDec, uOctToHex
};