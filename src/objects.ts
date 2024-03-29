import {
	BinaryOctalObject,
	HexObject,
	SubScript
} from "./types/interfaces";


const subScript: SubScript = {
	"2": "₂",
	"8": "₈",
	"10": "₁₀",
	"16": "₁₆"
};

Object.freeze(subScript);

const hexObject: HexObject = {
	"0" : "0",
	"1" : "1",
	"2" : "2",
	'3' : "3",
	"4" : "4",
	"5" : "5",
	"6" : "6",
	"7" : "7",
	"8" : "8",
	"9" : "9",
	"10" : "A",
	"11" : "B",
	"12" : "C",
	"13" : "D",
	"14" : "E",
	"15" : "F",
	"A" : "10",
	"B" : "11",
	"C" : "12",
	"D" : "13",
	"E" : "14",
	"F" : "15"
};

Object.freeze(hexObject);

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

Object.freeze(binaryHexObject);

const binaryOctalObject: BinaryOctalObject = {
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

Object.freeze(binaryOctalObject);

export {
	binaryHexObject,
	binaryOctalObject, hexObject, subScript
};

