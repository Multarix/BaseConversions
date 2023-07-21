import { getBounds } from "./funcs.js";
import { subScript } from "./objects.js";

import { Conversion } from "./types/interfaces";


function getExponantLength(bits: number) {
	if(bits === 8) return 3;
	if(bits === 12) return 4;
	if(bits === 16) return 5;
	if(bits === 32) return 8;
	if(bits === 64) return 11;

	const remainder = bits % 4;
	const num = (bits - remainder);

	const expLength = (num / 4) + 1;
	return expLength;
}


function placeDecimal(exponant: number, mantissaArray: string[]): string {
	const decimalLocation = (exponant < 0) ? exponant * -1 : exponant;
	const mantissa = `1${mantissaArray.join("")}`;

	if(exponant >= 0) return mantissa.slice(0, decimalLocation + 1) + "." + mantissa.slice(decimalLocation + 1);

	const preBits = "0".repeat(decimalLocation - 1);
	return `${preBits}1.${mantissa}`;

}


function getFraction(binaryFraction: string) {
	const binaryArray = binaryFraction.split("");
	let decimalTotal = 0;

	for(let i = 0; i < binaryFraction.length; i++){
		if(parseInt(binaryArray[i])) decimalTotal += 1 / Math.pow(2, i + 1);
	}

	return decimalTotal;
}


function toBinary(int: number, bits: number, exponantLength?: number): Conversion {
	if(!exponantLength) exponantLength = getExponantLength(bits); // Dynamically get the exponant length if it wasn't supplied
	const mantissaLength = bits - exponantLength - 1;

	const conversion: string[] = [];

	// Handle NaN
	if(isNaN(parseFloat(int.toString()))){
		const signPlusExp = "0" + "1".repeat(exponantLength);
		let mantissa = "01".repeat(Math.ceil(mantissaLength / 2));
		if(mantissa.length > mantissaLength) mantissa = mantissa.slice(0, mantissaLength);

		const fullBinary = `${signPlusExp}${mantissa}`;

		conversion.push(`NaN = ${fullBinary}`);

		return { newNumber: fullBinary, conversion: conversion.join("\n") };
	}

	// Handle the 0's
	const zero = 0;
	if(int === zero){
		const fullBinary = "0".repeat(bits);
		conversion.push(`0 = ${fullBinary}`);
		return { newNumber: fullBinary, conversion: conversion.join("\n") };
	}
	if(int === -zero){
		const fullBinary = "1" + "0".repeat(bits - 1);
		conversion.push(`-0 = ${fullBinary}`);
		return { newNumber: fullBinary, conversion: conversion.join("\n") };
	}

	// Handle Infinity
	if(int == Infinity){
		const fullBinary = "0" + "1".repeat(exponantLength) + "0".repeat(bits - (exponantLength - 1));
		conversion.push(`Infinity = ${fullBinary}`);
		return { newNumber: fullBinary, conversion: conversion.join("\n") };
	}
	if(int == -Infinity){
		const fullBinary = "1" + "1".repeat(exponantLength) + "0".repeat(bits - (exponantLength - 1));
		conversion.push(`-Infinity = ${fullBinary}`);
		return { newNumber: fullBinary, conversion: conversion.join("\n") };
	}

	// Handle negative numbers
	const isNegative: boolean = (int < 0);
	const number = (isNegative) ? int * -1 : int;

	// On with the show
	const signBit = (isNegative) ? "1" : "0";
	const numArray = number.toString().split("."); // Split the number into the whole and fractional parts
	const wholeNumber = numArray[0];
	const fractional = numArray[1];

	conversion.push(`Sign Bit:\n${signBit} (${isNegative ? "Negative" : "Positive"})`, `Split into whole and fraction:\n${wholeNumber} | 0.${fractional}`);

	const wholeNumberBinary = parseInt(wholeNumber).toString(2); // Convert whole number to binary
	conversion.push(`Whole to Base2:\n${wholeNumber} = ${wholeNumberBinary}`);

	const parsedFractional = parseFloat(`0.${fractional}`).toString(2).slice(1) || ".0"; // Convert fractional to binary & remove leading 0
	conversion.push(`Fraction to Base2:\n0.${fractional} = 0${parsedFractional}`);

	const wholePlusFractional = wholeNumberBinary + parsedFractional;
	conversion.push(`Combine Whole & Fraction: \n${wholePlusFractional}`);

	// Find the first instance of a "1" and "." in the wholePlusFractional string
	const firstOne = wholePlusFractional.indexOf("1");
	let decimal = wholePlusFractional.indexOf(".");

	// Because the decimal is a character in the string, it moves one less than it thinks it does when going in the negative direction
	if(firstOne > decimal) decimal += 1;
	const decimalShouldBeAt = firstOne + 1;

	// The distance the decimal needs to move to be after the first "1"
	const expMove = decimal - decimalShouldBeAt;
	conversion.push(`Places to move decimal point:\n${expMove}`);

	// The maximum that the exponant can be, based on the number of bits
	const expAdd = getBounds(exponantLength).upper;
	const exponant = expMove + expAdd;
	conversion.push(`Exponant + Exponant max:\n${expMove} + ${expAdd} = ${exponant}`);

	let exponantBinary = exponant.toString(2);
	if(exponantBinary.length < exponantLength) exponantBinary = "0".repeat(exponantLength - exponantBinary.length) + exponantBinary;
	conversion.push(`Exponant to Base2:\n${exponant} = ${exponantBinary}`);

	// Remove the decimal, and slice the mantissa to the first one, then slice it up to the length of the mantissa
	let mantissaBinary = wholePlusFractional.replace(".", "").slice(decimalShouldBeAt).slice(0, mantissaLength);

	// If for some reason we didn't have enough bits to get the mantissa, add 0's to the end (rare exception, will probs only happen with >32bit or really small numbers)
	if(mantissaBinary.length < mantissaLength) mantissaBinary += "0".repeat(mantissaLength - mantissaBinary.length);

	const fullBinary = `${signBit}${exponantBinary}${mantissaBinary}`;

	// We do some extra rounding here, because we're truncating the mantissa
	// As such, we play with the last 3 bits to see if we can get a closer fit to the number we want
	const bitPatterns = ["000", "001", "010", "011", "100", "101", "110", "111"];
	const preRound = mantissaBinary.slice(0, mantissaBinary.length - 3);
	let bestFit = fullBinary;

	for(const tribble of bitPatterns){
		const newBinary = `${signBit}${exponantBinary}${preRound}${tribble}`;
		const newPattern = toDecimal(newBinary, exponantLength).newNumber;
		const oldPattern = toDecimal(bestFit, exponantLength).newNumber;

		if(Math.abs(newPattern - int) > Math.abs(oldPattern - int)) continue;
		bestFit = newBinary;
		mantissaBinary = preRound + tribble;
	}

	conversion.push(`Mantissa:\n${mantissaBinary}`);

	// Add the sign bit, exponant, and mantissa together
	conversion.push(`${int}${subScript[10]} = ${bestFit}${subScript[2]}`);

	return { newNumber: bestFit, conversion: conversion.join("\n\n") };
}

function toDecimal(bin: string, exponantLength?: number) {
	const bits = bin.length;
	if(!exponantLength) exponantLength = getExponantLength(bits); // Dynamically get the exponant length if it wasn't supplied

	const binArray = bin.split("");
	const signBit = binArray.shift();

	const isNegative = (signBit === "1");
	const conversion: string[] = [];

	// If there are no 1's in the binary (excluding the sign bit), it's either 0 or -0
	if(binArray.indexOf("1") === -1){
		if(signBit === "1") return { newNumber: -0, conversion: `${bin}${subScript[2]} = -0${subScript[10]}` };
		return { newNumber: 0, conversion: `${bin}${subScript[2]} = 0${subScript[10]}` };
	}

	const exponantArray = binArray.slice(0, exponantLength);
	const mantissaArray = binArray.slice(exponantLength);

	if(exponantArray.indexOf("1") === -1){ // It's either NaN or Infinity. So we check the mantissa
		// If the mantissa has 1's in it, so it's NaN
		if(mantissaArray.indexOf("1") !== -1) return { newNumber: NaN, conversion: `${bin}${subScript[2]} = NaN` };
		// if it has no 1's, it's an Infinity
		if(signBit === "1") return { newNumber: -Infinity, conversion: `${bin}${subScript[2]} = -Infinity` };
		return { newNumber: Infinity, conversion: `${bin}${subScript[2]} = Infinity` };
	}

	const expMinus = getBounds(exponantLength).upper;
	let exponant = parseInt(exponantArray.join(""), 2);

	conversion.push(
		`Sign Bit:\n${signBit} (${isNegative ? "Negative" : "Positive"})`,
		`Exponant:\n${exponantArray.join("")}`,
		`Exponant to Base10:\n${exponant}`,
		`Places to move decimal point:\n${exponant} - ${expMinus} = ${exponant - expMinus}`
	);

	exponant -= expMinus;

	const wholeFraction = (exponant < 0) ? placeDecimal(exponant, mantissaArray) : placeDecimal(exponant, mantissaArray);
	conversion.push(`Move the decimal:\n${wholeFraction}`);

	const wholeFractionArray = wholeFraction.split(".");
	const wholeBinary = wholeFractionArray[0];
	const fractionBinary = wholeFractionArray[1];

	conversion.push(`Split into whole and fraction:\n${wholeBinary} | ${fractionBinary}`);

	const whole = parseInt(wholeBinary, 2);
	const fraction = getFraction(fractionBinary);

	conversion.push(`Whole to Base10:\n${whole}`, `Fraction to Base10:\n${fraction}`);

	const combined = whole + fraction;

	const decimal = (isNegative) ? -combined : combined;
	conversion.push(`${bin}${subScript[2]} = ${decimal}${subScript[10]}`);

	return { newNumber: decimal, conversion: conversion.join("\n\n") };
}

export {
	toDecimal,
	toBinary
};