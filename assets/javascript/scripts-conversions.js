const bitMax = {
	"8": [-128, 127],
	"12": [-2048, 2047],
	"16": [-32768, 32767],
	"24": [-8388608, 8388607],
	"32": [-2147483648, 2147483647]
};



function checkIfSigned(){
	const signedElems = document.getElementsByName("signed");
	let signed;
	for(const element of signedElems){
		if(element.checked) signed = element.value;
	}
	signed = (signed === "true");
	return signed;
}


// Update the input field regardless of what was changed
function updateInputField(event, clear){
	const inputField = document.getElementById("input_baseConversion");

	const fromBase = Number.parseInt(document.getElementById("fromBase").value);
	const signed = checkIfSigned();
	const totalBits = Number.parseInt(document.getElementById("totalBits").value);

	showHide('numBits', signed);

	if(fromBase === 10){ // Base 10 is somewhat special
		inputField.removeAttribute("pattern");
		inputField.type = "number";

		if(signed){
			inputField.min = bitMax[totalBits][0];
			inputField.max = bitMax[totalBits][1];
			if(clear) inputField.value = "";
			return;
		}
		inputField.removeAttribute("min");
		inputField.removeAttribute("max");
		if(clear) inputField.value = "";
		return;
	}

	// min, max won't be needed
	inputField.removeAttribute("min");
	inputField.removeAttribute("max");

	// Set regex pattern
	let pattern;
	switch(fromBase){
		case 2:
			pattern = "[01]+";
			break;

		case 8:
			pattern = "[0-7]+";
			break;

		case 16:
			pattern = "[0-9A-Fa-f]+";
			break;
	}
	inputField.type = "text";
	inputField.pattern = pattern;
	if(clear) inputField.value = "";
	return;
}



// Function to run when the bits value gets changed
function bitsChange(){
	return updateInputField();
}



// Function to run when the base input type is changed
function changeBase(event){
	updateInputField(null, true);
	const value = this.value;

	const baseIDS = [
		{ base: "2", id: "binaryContainer" },
		{ base: "8", id: "octalContainer" },
		{ base: "10", id: "decimalContainer" },
		{ base: "16", id: "hexadecimalContainer" }
	];

	for(const item of baseIDS){
		const bool = !(item.base === value);
		showHide(item.id, bool);
	}
}



// Check if the there is an error with the inputs and if so what type
function checkIfError(value, regArray, maxMatches, signed, numBits){
	const error = { type: 0, message: "" };
	if(!value){
		error.type = 1;
		error.message = "Error: Please input a number";
		return error;
	}
	if(Number.parseInt(value) === 0){
		error.type = 1;
		error.message = "Error: Number must be greater or less than 0";
		return error;
	}
	if(regArray?.length > maxMatches){
		error.type = 2;
		error.message = "Error: Number contains invalid characters";
		return error;
	}
	// If signed && value is smaller than min || signed && value is greater than max
	if((signed && value < bitMax[numBits][0]) || (signed && value > bitMax[numBits][1])){
		error.type = 1;
		error.message = "Error: Number is outside of range";
		return error;
	}
	return error;
}

// Handle what to do if there was an error with the inputs
function doErrorHandling(error, inputField){
	const errorDiv = document.getElementById("error");
	errorDiv.innerHTML = error.message;
	showHide("error", true);
	if(error.type === 2) inputField.value = ""; // Remove values from the input
	return;
}

// Convert and Show the working for each base after pressing the "convert" button
function convertSubmit(){
	const inputField = document.getElementById("input_baseConversion");
	const value = inputField.value.toString();
	if(inputField.dataset.oldvalue.toString() === value) return;
	inputField.dataset.oldvalue = value;

	const fromBase = document.getElementById("fromBase").value.toString();
	const signed = checkIfSigned();

	const bitValue = document.getElementById("totalBits").value.toString();
	const numBits = (signed) ? parseInt(bitValue) : false;

	const pattern = (fromBase !== "10") ? `[^${inputField.pattern.slice(1)}` : ".*?";
	const reg = new RegExp(pattern, "g");
	const regArray = value.match(reg);

	let maxMatches = 0;
	if(fromBase === "10") maxMatches = Infinity; // If the base is 10 and the value is less than 0

	// Input error handling
	const error = checkIfError(value, regArray, maxMatches, signed, numBits);
	if(error.type !== 0) return doErrorHandling(error, inputField);
	showHide("error", false);
	document.getElementById("error").innerHTML = "";

	let bin, oct, dec, hex;
	const lineBreak = /\n/g;
	switch(fromBase){
		case "2":
			bin = `<b>Binary:</b><br>${value}<sub>₂</sub> = ${value}<sub>₂</sub>`;
			oct = binToOct(value);
			dec = binToDec(value, signed, numBits);
			hex = binToHex(value);
			break;

		case "8":
			bin = octToBin(value);
			oct = `<b>Octal:</b><br>${value}<sub>8</sub> = ${value}<sub>8</sub>`;
			dec = octToDec(value, signed);
			hex = octToHex(value);
			break;

		case "10":
			bin = decToBin(value, signed, numBits);
			oct = decToOct(value, signed, numBits);
			dec = `<b>Decimal:</b><br>${value}<sub>10</sub> = ${value}<sub>10</sub>`;
			hex = decToHex(value, signed, numBits);
			break;

		case "16":
			bin = hexToBin(value);
			oct = hexToOct(value);
			dec = hexToDec(value, signed);
			hex = `<b>Hexadecimal:</b><br>${value}<sub>16</sub> = ${value}<sub>16</sub>`;
			break;
		default:
	}

	const binElem = document.getElementById("bin");
	const octElem = document.getElementById("oct");
	const decElem = document.getElementById("dec");
	const hexElem = document.getElementById("hex");

	const elements = [binElem, octElem, decElem, hexElem];

	for(const element of elements){
		element.classList.add("fade");
	}

	setTimeout(() => {
		binElem.innerHTML = bin.replace(lineBreak, "<br>");
		octElem.innerHTML = oct.replace(lineBreak, "<br>");
		decElem.innerHTML = dec.replace(lineBreak, "<br>");
		hexElem.innerHTML = hex.replace(lineBreak, "<br>");
	}, 490);

	setTimeout(() => {
		for(const element of elements){
			element.classList.remove("fade");
		}
	}, 1010);
}

try {
	document.getElementById("totalBits").onchange = updateInputField;
} catch (e){ null; }

try {
	document.getElementById("fromBase").onchange = changeBase;
} catch (e){ null; }