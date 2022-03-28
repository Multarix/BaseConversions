<script>const page = "home"</script>
<script defer src="{{ site.baseurl }}/assets/javascript/baseConversion.js"></script>
<script defer src="{{ site.baseurl }}/assets/javascript/scripts-conversions.js"></script>
<h1><center><b>Base Converions</b></center></h1>
<div class="conversionArea divCenter">
	<div class="inputArea">
		<div class="input">
			Input Format: 
			<select class="dropDownInput" name = "fromBase" id="fromBase">
				<option value="2">Binary</option>
				<option value="8">Octal</option>
				<option value="10" selected="true">Decimal</option>
				<option value="16">Hexadecimal</option>
			</select>
		</div><br>
		<div class="input">
			<label>
				<input type="radio" name="signed" value="true" onclick="updateInputField()"> Signed
			</label>
			&nbsp;&nbsp;
			<label>
				<input type="radio" name="signed" value="false" onclick="updateInputField()" checked="checked"> Unsigned
			</label>
		</div><br>
		<div class="input hidden" id="numBits">
			Bits: 
			<select class="dropDownInput" name="totalBits" id="totalBits">
				<option value="8">8</option>
				<option value="12">12</option>
				<option value="16" selected="true">16</option>
				<option value="24">24</option>
				<option value="32">32</option>
			</select>
		</div><br>
		<div class="input">
			<input class="manualInput" type="number" id="input_baseConversion" data-value="104" data-signed="false" data-bits="false" data-base="10" value="104" placeholder="Input number" required>
			<button id="btn_baseConversion" class="btn_convert" onclick="convertSubmit()">Convert</button><br>
		</div>
		<div class="error hidden" id="error"></div>
	</div><br>
	<div class="conversionContainer" id="binaryContainer">
		<h3><b>Binary</b></h3>
		<div class="embed divCenter">
			<p class="conversion" id="bin">
				<b>Decimal to Binary:</b><br>
				104 <i>mod</i> 2 = 0<br>
				52 <i>mod</i> 2 = 0<br>
				26 <i>mod</i> 2 = 0<br>
				13 <i>mod</i> 2 = 1<br>
				6 <i>mod</i> 2 = 0<br>
				3 <i>mod</i> 2 = 1<br>
				1 <i>mod</i> 2 = 1<br>
				<br>
				104<sub>10</sub> = 1101000<sub>2</sub>
			</p>
		</div>
		<br>
	</div>
	<div class="conversionContainer" id="octalContainer">
		<h3><b>Octal</b></h3>
		<div class="embed divCenter">
			<p class="conversion" id="oct">
				<b>Decimal to Binary:</b><br>
				104 <i>mod</i> 2 = 0<br>
				52 <i>mod</i> 2 = 0<br>
				26 <i>mod</i> 2 = 0<br>
				13 <i>mod</i> 2 = 1<br>
				6 <i>mod</i> 2 = 0<br>
				3 <i>mod</i> 2 = 1<br>
				1 <i>mod</i> 2 = 1<br>
				<br>
				104<sub>10</sub> = 1101000<sub>2</sub><br>
				<br>
				<b>Binary to Octal:</b><br>
				1101000 = 001-101-000<br>
				001 = 1<br>
				101 = 5<br>
				000 = 0<br>
				<br>
				104<sub>10</sub> = 150<sub>8</sub>
			</p>
		</div>
		<br>
	</div>
	<div class="conversionContainer hidden" id="decimalContainer">
		<h3><b>Decimal</b></h3>
		<div class="embed divCenter">
			<p class="conversion" id="dec">
				<b>Decimal:</b><br>
				104<sub>10</sub> = 104<sub>10</sub>
			</p>
		</div>
		<br>
	</div>
	<div class="conversionContainer" id="hexadecimalContainer">
		<h3><b>Hexadecimal</b></h3>
		<div class="embed divCenter">
			<p class="conversion" id="hex">
				<b>Decimal to Binary:</b><br>
				104 <i>mod</i> 2 = 0<br>
				52 <i>mod</i> 2 = 0<br>
				26 <i>mod</i> 2 = 0<br>
				13 <i>mod</i> 2 = 1<br>
				6 <i>mod</i> 2 = 0<br>
				3 <i>mod</i> 2 = 1<br>
				1 <i>mod</i> 2 = 1<br>
				<br>
				104<sub>10</sub> = 1101000<sub>2</sub><br>
				<br>
				<b>Binary to Hexadecimal:</b><br>
				1101000 = 0110-1000<br>
				0110 = 6<br>
				1000 = 8<br>
				<br>
				104<sub>10</sub> = 68<sub>16</sub>
			</p>
		</div>
		<br>
	</div>
</div>



