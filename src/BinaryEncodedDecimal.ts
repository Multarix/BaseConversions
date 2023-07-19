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

function toBinary(int: number, bits: number, exponantLength?: number): Conversion {
	if(!exponantLength) exponantLength = getExponantLength(bits);
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

	conversion.push(`Sign Bit: ${signBit} (${isNegative ? "Negative" : "Positive"})`, `Split whole and fractional: ${wholeNumber} | 0.${fractional}`);

	const wholeNumberBinary = parseInt(wholeNumber).toString(2); // Convert whole number to binary
	conversion.push(`Whole to binary: ${wholeNumber} = ${wholeNumberBinary}`);

	const parsedFractional = parseFloat(`0.${fractional}`).toString(2).slice(1) || ".0"; // Convert fractional to binary & remove leading 0
	conversion.push(`Fract to binary: 0.${fractional} = 0${parsedFractional}`);

	const wholePlusFractional = wholeNumberBinary + parsedFractional;
	conversion.push(`Whole + Fract = ${wholePlusFractional}`);

	// Find the first instance of a "1" and "." in the wholePlusFractional string
	const firstOne = wholePlusFractional.indexOf("1");
	let decimal = wholePlusFractional.indexOf(".");

	// Because the decimal is a character in the string, it moves one less than it thinks it does when going in the negative direction
	if(firstOne > decimal) decimal += 1;
	const decimalShouldBeAt = firstOne + 1;

	// The distance the decimal needs to move to be after the first "1"
	const expMove = decimal - decimalShouldBeAt;
	conversion.push(`Decimal movement: ${expMove}`);

	// The maximum that the exponant can be, based on the number of bits
	const expAdd = getBounds(exponantLength).upper;
	const exponant = expMove + expAdd;
	conversion.push(`Exp + Exp max: ${expMove} + ${expAdd} = ${exponant}`);

	let exponantBinary = exponant.toString(2);
	if(exponantBinary.length < exponantLength) exponantBinary = "0".repeat(exponantLength - exponantBinary.length) + exponantBinary;
	conversion.push(`Exp to binary: ${exponant} = ${exponantBinary}`);

	// Remove the decimal, and slice the mantissa to the first one, then slice it up to the length of the mantissa
	let mantissaBinary = wholePlusFractional.replace(".", "").slice(decimalShouldBeAt).slice(0, mantissaLength);

	// If for some reason we didn't have enough bits to get the mantissa, add 0's to the end (rare exception, will probs only happen with >32bit or really small numbers)
	if(mantissaBinary.length < mantissaLength) mantissaBinary += "0".repeat(mantissaLength - mantissaBinary.length);
	conversion.push(`Mantissa: ${mantissaBinary}`);

	// Add the sign bit, exponant, and mantissa together
	const fullBinary = `${signBit}${exponantBinary}${mantissaBinary}`;
	conversion.push("", `${int}${subScript[10]} = ${fullBinary}${subScript[2]}`);

	return { newNumber: fullBinary, conversion: conversion.join("\n") };
}


function toDecimal(bin: string, exponantLength?: number) {
	const bits = bin.length;
	if(!exponantLength) exponantLength = getExponantLength(bits);

	return parseInt(bin, 2);
}

export {
	toDecimal,
	toBinary
};