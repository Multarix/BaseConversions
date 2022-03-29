function updateInputExpField(event){
	const inputExpField = document.getElementById("inputExpField");
	const toFrom = document.getElementById("toFrom").value;
	const totalBits = document.getElementById("totalBits").value;
	const expLength = document.getElementById("expLength").value;

	if(toFrom === "to"){
		inputExpField.type = "number";
		inputExpField.value = "";
		inputExpField.removeAttribute("pattern");
		inputExpField.step = "0.1";
		inputExpField.placeholder = "Input number";
		return;
	}

	inputExpField.type = "text";
	inputExpField.value = "";
	inputExpField.pattern = "[01]+";
	inputExpField.removeAttribute("step");
	inputExpField.placeholder = "Input binary";
	return;
}


// Hide total bits when From Binary is selected
function toFromUpdate(event){
	const value = this.value;
	showHide("totalBitsDiv", (value === "to"));
	updateInputExpField(null);
}

// Check if the there is an error with the inputs and if so what type
function checkIfError(value, regArray, maxMatches){
	const error = { type: 0, message: "" };
	if(!value){
		error.type = 1;
		error.message = "Error: Please input a number";
		return error;
	}
	if(regArray?.length > maxMatches){
		error.type = 2;
		error.message = "Error: Number contains invalid characters";
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

function getOutput(value, toFrom, totalBits, expLength){
	if(toFrom === "to") return decToFloat(value, totalBits, expLength);
	return floatToDec(value, expLength).toString();
}

// Function to run and update the output
function doOutput(){
	const outputDiv = document.getElementById("output");

	const inputExpField = document.getElementById("inputExpField");
	const toFrom = document.getElementById("toFrom").value;
	const totalBits = document.getElementById("totalBits").value;
	const expLength = document.getElementById("expLength").value;

	const value = inputExpField.value;

	const dataValue = inputExpField.dataset.value;
	const dataToFrom = inputExpField.dataset.tofrom;
	const dataTotalBits = inputExpField.dataset.totalbits;
	const dataExpLength = inputExpField.dataset.explength;

	console.log(typeof dataValue, typeof inputExpField.value);
	console.log(typeof dataToFrom, typeof toFrom);
	console.log(typeof dataTotalBits, typeof totalBits);
	console.log(typeof dataExpLength, typeof expLength);

	// Return if the last inputs are the same as the current
	if(dataValue === inputExpField.value && dataToFrom === toFrom && dataTotalBits === totalBits && dataExpLength === expLength) return;
	inputExpField.dataset.value = inputExpField.value;
	inputExpField.dataset.tofrom = toFrom;
	inputExpField.dataset.totalbits = totalBits;
	inputExpField.dataset.explength = expLength;

	const pattern = (toFrom === "from") ? `[^${inputExpField.pattern.slice(1)}` : ".*?";
	const reg = new RegExp(pattern, "g");
	const regArray = value.match(reg);

	let maxMatches = 0;
	if(toFrom === "to") maxMatches = Infinity;

	// Input error handling
	const error = checkIfError(value, regArray, maxMatches);
	if(error.type !== 0) return doErrorHandling(error, inputExpField);
	showHide("error", false);
	document.getElementById("error").innerHTML = "";

	const output = getOutput(value, toFrom, totalBits, expLength);

	const lineBreak = /\n/g;
	outputDiv.classList.add("fade");

	setTimeout(() => {
		outputDiv.innerHTML = output.replace(lineBreak, "<br>");
	}, 490);

	setTimeout(() => {
		outputDiv.classList.remove("fade");
	}, 1010);
}

try {
	document.getElementById("toFrom").onchange = toFromUpdate;
} catch (e){ null; }