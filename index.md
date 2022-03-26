<script>const page = "home"</script>
<script defer src="{{ site.baseurl }}/assets/javascript/baseConversion.js"></script>
<h1><center><b>Base Converions</b></center></h1>
<div class="conversionArea divCenter">
	<div class="inputArea">
		<div class="input">
			Input Format: 
			<select class="dropDownInput" name = "fromBase" id="fromBase">
				<option value="2">Binary (Base 2)</option>
				<option value="8">Octal (Base 8)</option>
				<option value="10" selected="true">Decimal (Base 10)</option>
				<option value="16">Hexadecimal (Base 16)</option>
			</select>
		</div><br>
		<div class="input">
			<label>
				<input type="radio" name="signed" value="true" onclick="showHide('numBits', true)"> Signed
			</label>
			&nbsp;&nbsp;
			<label>
				<input type="radio" name="signed" value="false" onclick="showHide('numBits', false)" checked="checked"> Unsigned
			</label>
		</div><br>
		<div class="input hidden" id="numBits">
			Bits: 
			<select class="dropDownInput" name = "totalBits" id="totalBits">
				<option value="8">6</option>
				<option value="12">12</option>
				<option value="16" selected="true">16</option>
				<option value="24" selected="true">16</option>
				<option value="32">32</option>
			</select>
		</div><br>
		<div class="input">
			<input class="manualInput" type="text" pattern="[0-9]+" id="input_baseConversion" value="104" placeholder="Enter a decimal number" required>
			<button id="btn_baseConversion" class="btn_convert" onclick="convertToBases()">Convert</button><br>
		</div>
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
				104₁₀ = 1101000₂
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
				104₁₀ = 1101000₂<br>
				<br>
				<b>Binary to Octal:</b><br>
				1101000 = 001-101-000<br>
				001 = 1<br>
				101 = 5<br>
				000 = 0<br>
				<br>
				104₁₀ = 150₈
			</p>
		</div>
		<br>
	</div>
	<div class="conversionContainer hidden" id="decimalContainer">
		<h3><b>Decimal</b></h3>
		<div class="embed divCenter">
			<p class="conversion" id="dec">
				<b>Decimal:</b><br>
				104₁₀ = 104₁₀
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
				104₁₀ = 1101000₂<br>
				<br>
				<b>Binary to Hexadecimal:</b><br>
				1101000 = 0110-1000<br>
				0110 = 6<br>
				1000 = 8<br>
				<br>
				104₁₀ = 68₁₆
			</p>
		</div>
		<br>
	</div>
</div>



