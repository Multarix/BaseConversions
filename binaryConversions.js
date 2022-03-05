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
	0: "₀",
	1: "₁",
	2: "₂",
	3: "₃",
	4: "₄",
	5: "₅",
	6: "₆",
	7: "₇",
	8: "₈",
	9: "₉",
	10: "₁₀",
	16: "₁₆"
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
 * Gets the highest power of 2 to fit within a specified number
 *  @argument {number} n - The number to find the highest power of 2 within
**/
function bin(n){
	let i = 0;
	while(true){ // eslint-disable-line no-constant-condition
		if(n >= Math.pow(2, i + 1)){
			i += 1;
			continue;
		}
		break;
	}
	return i;
}



/**
 * Inverts the 1's and 0's in a binary for changing between negative and postive
 * @argument {string} binary - The binary string to be converted
 * @returns {string} The binary in string form
**/
function invert(binary){
	let newBinary = "";
	for(const bit of binary){
		newBinary += (bit === "0") ? "1" : "0";
	}
	return newBinary;
}



/**
 * Creates the artifical working steps that idiot Math teachers thing programs require to show
 * @argument {number} dec - The decimal number for which the working will be based on
 * @argument {boolean} toBinary - Whether or not the working is for converting to binary, or from binary
**/
function working(dec, toBinary, bits){
	const [fullStatement, reqStatement, numberWorking, powersArray, workingArray] = [[], [], [], [], []];

	const plus = " + ";
	const equals = "= ";

	let remainder = dec;
	while(remainder > 0){
		if(remainder === 0) break;

		const maxPow = bin(remainder); // Get the maximum power of 2 that fits into the remainder
		powersArray.push(maxPow);

		const power = Math.pow(2, maxPow); // 2 to the power of maxPow
		numberWorking.push(power);

		remainder = dec % Math.pow(2, maxPow); // The new remainder
		if(remainder) workingArray.push(`${equals}${numberWorking.join(" + ")} + ${remainder}`); // 256 + 128 + 64 + remainder... etc

		reqStatement.push(`1×2${toSup(maxPow)}`); // 1×2⁵ etc
	}
	// At this point we now have the working lines and the required bits that are "1"
	// What we do not have yet are the bits that should be a 0, so we cannot yet construct our binary, so lets solve that
	let finalBinary = "";
	for(let i = powersArray[0]; i >= 0; i--){
		const currentPower = i;
		const bit = (powersArray.includes(currentPower)) ? "1" : "0";
		finalBinary += bit;
		fullStatement.push(`${bit}×2${toSup(i)}`);
	}

	if(!finalBinary) finalBinary += "0";
	if(finalBinary !== dec.toString(2)) throw `Does not match! Was expecting: "${dec.toString(2)}" but got "${finalBinary}"`; // Throw an error if the binary doesn't match somehow

	let finalArray = [];
	const startArray = [];
	if(bits > fullStatement.length - 1){
		for(let i = bits; i > fullStatement.length - 1 ; i--){
			startArray.push(`0×2${toSup(i)}`);
			finalBinary = `0${finalBinary}`;
		}
	}
	const completeStatement = startArray.concat(fullStatement);

	if(toBinary){
		finalArray = finalArray.concat(workingArray);
		finalArray.push(equals + reqStatement.join(plus));
		finalArray.push(equals + completeStatement.join(plus));
		finalArray.push(equals + finalBinary);
	} else {
		const reverse = workingArray.reverse();

		finalArray.push(completeStatement.join(plus));
		finalArray.push(reqStatement.join(plus));
		finalArray.push(reverse[0].replace("= ", ""));
		finalArray.push(dec);
	}

	return {
		"decimal": dec,
		"binary": finalBinary,
		"working": finalArray
	};
}



/**
 * Converts a number to binary the brute force way
 *  @argument {number} dec - The number to convert to binary
 * 	@argument {boolean} [signed] - Specify if the number should be signed, if first argument is a negative number, will be true
 * 	@argument {number} [bits=false] - How many bits the binary should contain, if specified bits is too low for the number, will use the minimum required bits instead
 *	@returns {string} The working out that idiot Math teachers asks you to provide in order to prove you didn't just go to a website to convert the decimal
**/
function convertToBinary(decimal, signed, bits){
	let dec = decimal;
	let negative = false;
	if(dec < 0){
		dec = (dec + 1) * -1;
		signed = true;
		negative = true;
	}
	if(signed) bits -= 1;
	if(negative) negative = `${dec} = (${decimal} + 1) × -1\n`;

	const work = working(dec, true, bits);
	const spaces = work.decimal.toString().length + 1;
	let equals = "\n";
	for(let i = 0; spaces > i; i++) equals += " ";

	// take first number from binary and replace with a 1 if negative
	if(negative){
		const x = work.binary.split("");
		x.shift();
		work.binary = "1" + invert(x);
	}

	const negs = (negative) ? `${equals}= ${work.binary}` : "";

	const finalWorking = `${(negative) ? negative : ""}${work.decimal} ` + work.working.join(equals) + negs;
	return finalWorking;
}



/**
 * Converts a number to decimal the brute force way
 * @argument {string} bin - The number to convert to binary
 * @argument {boolean} signed - Whether or not the given binary is signed
 * @returns {string} The working out that idiot Math teachers asks you to provide in order to prove you didn't just go to a website to convert the binary
**/
function convertToDecimal(bin, signed){
	bin = bin.replace(/ /g, "");
	let binary = bin;
	let sign;
	binary = binary.split("");
	if(signed) sign = binary.shift();
	const initialStatement = [];

	if(sign === "1"){
		const invertString = invert(binary);
		binary = invertString.split("");
	}

	const maxPow = binary.length - 1;
	const maxNum = Math.pow(2, maxPow + 1) - 1;

	(signed) ? console.log(`Range:  ${-(maxNum + 1)} to ${maxNum}`) : console.log(`Range:  0 : ${maxNum}`);

	let dec = 0;
	let pow = maxPow;
	for(const bit of binary){
		if(bit === "1") dec += Math.pow(2, pow);
		pow -= 1;
	}
	const work = working(dec, false, binary.length);
	let finalStatement = initialStatement.concat(work.working);


	if(sign === "1"){
		dec = (dec * -1) - 1;
		const spareArray = [];
		for(const statement of finalStatement){
			spareArray.push(`-(${statement}) - 1`);
		}
		finalStatement = spareArray;
		finalStatement.push(dec);
	}

	const spaces = bin.length + 2;
	let equals = "\n";
	for(let i = 0; spaces > i; i++) equals += " ";
	equals += "= ";

	const finalWorking = `${bin + subScript[2]} = ${finalStatement.join(equals)}`;
	return finalWorking;
}

/* convertToBinary(1, 2, 3) =
  * 1 = Decimal Number, negative or positive
  * 2 = If it's a signed number, if the number is negative, this will be true regardless of this
  * 3 = The amount of bits the binary should have
*/

const b = convertToBinary(-492, true, 12);
console.log(b);

console.log("\n");

/* convertToDecimal(1, 2) =
  * 1 = Binary String, removes spaces in the function
  * 2 = If it's a signed binary integer
*/

const d = convertToDecimal("0110 0001", true);
console.log(d);