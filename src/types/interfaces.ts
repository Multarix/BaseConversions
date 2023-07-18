import { NumberLike } from "./types";

interface ConversionOutput {
	base: number
	number: NumberLike
	conversion: string
}

interface DeciBin {
	num: number | "..."
	bitMath: string
	include: boolean
}

interface Conversion {
	newNumber: NumberLike
	conversion: string
}

interface SubScript {
	"2" : string
	"8" : string
	"10": string
	"16": string
}

interface HexObject {
	"0" : string
	"1" : string
	"2" : string
	'3' : string
	"4" : string
	"5" : string
	"6" : string
	"7" : string
	"8" : string
	"9" : string
	"10": string
	"11": string
	"12": string
	"13": string
	"14": string
	"15": string
	"A" : string
	"B" : string
	"C" : string
	"D" : string
	"E" : string
	"F" : string
}

interface BinaryHexObject {
	"0000": string
	"0001": string
	"0010": string
	"0011": string
	"0100": string
	"0101": string
	"0110": string
	"0111": string
	"1000": string
	"1001": string
	"1010": string
	"1011": string
	"1100": string
	"1101": string
	"1110": string
	"1111": string
	"0": string
	"1": string
	"2": string
	"3": string
	"4": string
	"5": string
	"6": string
	"7": string
	"8": string
	"9": string
	"A": string
	"B": string
	"C": string
	"D": string
	"E": string
	"F": string
}

interface BinaryOctalObject {
	"000": string
	"001": string
	"010": string
	"011": string
	"100": string
	"101": string
	"110": string
	"111": string
	"0": string
	"1": string
	"2": string
	"3": string
	"4": string
	"5": string
	"6": string
	"7": string
}

interface ConversionFunction {
	"2:8": Function
	"2:10": Function
	"2:16": Function
	"8:2": Function
	"8:10": Function
	"8:16": Function
	"10:2": Function
	"10:8": Function
	"10:16": Function
	"16:2": Function
	"16:8": Function
	"16:10": Function
}

export {
	ConversionOutput,
	DeciBin,
	Conversion,
	SubScript,
	HexObject,
	BinaryHexObject,
	BinaryOctalObject,
	ConversionFunction
};