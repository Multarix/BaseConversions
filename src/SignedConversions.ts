import BaseConversion from "./BaseConversion.js";

import {
	sBinToOct, sBinToDec, sBinToHex,
	sOctToBin, sOctToDec, sOctToHex,
	sDecToBin, sDecToOct, sDecToHex,
	sHexToBin, sHexToDec, sHexToOct
} from "./conversions.js";

import {
	Conversion,
	ConversionFunction,
	ConversionOutput
} from "./types/interfaces";
import { Base, NumberLike } from "./types/types";

const BINARY = 2;
const OCTAL = 8;
const DECIMAL = 10;
const HEX = 16;

const sConversions: ConversionFunction = {
	"2:8": sBinToOct, "2:10": sBinToDec, "2:16": sBinToHex,
	"8:2": sOctToBin, "8:10": sOctToDec, "8:16": sOctToHex,
	"10:2": sDecToBin, "10:8": sDecToOct, "10:16": sDecToHex,
	"16:2": sHexToBin, "16:8": sHexToOct, "16:10": sHexToDec
};

Object.freeze(sConversions);

/** A class that converts a given signed number and base into another base. */
export default class SignedBaseConversion extends BaseConversion {
	constructor(currentBase: Base, number: NumberLike) {
		super(currentBase, number);
	}

	public asBinary(bits: number = 8): ConversionOutput {
		if(this.base === BINARY) return this._sameBase();

		const conversionFunc = sConversions[`${this.base}:2`];
		const data: Conversion = conversionFunc(this.number, bits);

		return {
			base: BINARY,
			number: data.newNumber,
			conversion: data.conversion
		};
	}

	public asOctal(bits: number = 8): ConversionOutput {
		if(this.base === OCTAL) return this._sameBase();

		const conversionFunc = sConversions[`${this.base}:8`];
		const data: Conversion = conversionFunc(this.number, bits);

		return {
			base: OCTAL,
			number: data.newNumber,
			conversion: data.conversion
		};
	}

	public asDecimal(bits: number = 8): ConversionOutput {
		if(this.base === DECIMAL) return this._sameBase();

		const conversionFunc = sConversions[`${this.base}:10`];
		const data: Conversion = conversionFunc(this.number, bits);

		return {
			base: DECIMAL,
			number: data.newNumber,
			conversion: data.conversion
		};
	}

	public asHex(bits: number = 8): ConversionOutput {
		if(this.base === HEX) return this._sameBase();

		const conversionFunc = sConversions[`${this.base}:16`];
		const data: Conversion = conversionFunc(this.number, bits);

		return {
			base: HEX,
			number: data.newNumber,
			conversion: data.conversion
		};
	}
}