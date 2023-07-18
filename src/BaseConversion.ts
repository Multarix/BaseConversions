import { subScript } from "./objects.js";
import { cleanBinary, cleanOctal, cleanDecimal, cleanHex } from "./funcs.js";
import { ConversionOutput } from "./types/interfaces";
import { Base, NumberLike } from "./types/types";


abstract class BaseConversion {
	private _originalBase: Base;
	private _originalNumber : NumberLike;

	constructor(currentBase: Base, number: NumberLike) {
		if([2, 8, 10, 16].indexOf(currentBase) === -1) throw new Error("Invalid base. Base must be 2, 8, 10 or 16.");

		if(typeof number !== "string" && typeof number !== "number") throw new Error("Invalid number. Number must be a number or number-like string.");

		this._originalBase = currentBase;
		this._originalNumber = this.cleanBase(this._originalBase, number);

		if(this._originalNumber === "") throw new Error("Invalid number. Number must be a valid for the respective base.");
	}

	/** Cleans the number of any invalid characters */
	private cleanBase(base: Base, number: NumberLike) {
		switch(base){
			case 2:return cleanBinary(number.toString());
			case 8: return cleanOctal(number.toString());
			case 10: return cleanDecimal(number.toString());
			case 16: return cleanHex(number.toString().toUpperCase());
		}
	}

	protected _sameBase(): ConversionOutput {
		return {
			base: this._originalBase,
			number: this._originalNumber,
			conversion: `${this._originalNumber}${subScript[this._originalBase]} = ${this._originalNumber}${subScript[this._originalBase]}`
		};
	}

	/** The base of the original number */
	public get base(): Base {
		return this._originalBase;
	}

	/** The original number */
	public get number(): NumberLike {
		return this._originalNumber;
	}

	/** Returns a relevant object with the number in Binary */
	public abstract asBinary(): ConversionOutput;

	/** Returns a relevant object with the number in Octal */
	public abstract asOctal(): ConversionOutput;

	/** Returns a relevant object with the number in Decimal */
	public abstract asDecimal(): ConversionOutput;

	/** Returns a relevant object with the number in Hexadecimal */
	public abstract asHex(): ConversionOutput;
}

export default BaseConversion;