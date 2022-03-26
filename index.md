<script>const page = "home"</script>
<h1><center><b>Base Converions</b></center></h1>
<div class="conversionArea divCenter">
	Input Format:<br>
	<select name = "fromBase" id="fromBase">
		<option value="2">Binary (Base 2)</option>
		<option value="8">Octal (Base 8)</option>
		<option value="10" selected="true">Decimal (Base 10)</option>
		<option value="16">Hexadecimal (Base 16)</option>
	</select><br>
	<div class="radioBtn">
		<label>
			<input type="radio" name="signed" value="true"> Signed
		</label>
		&nbsp;&nbsp;
		<label>
			<input type="radio" name="signed" value="false" checked="checked"> Unsigned
		</label>
	</div>
	<input type="text" id="ipt_baseConversion" value="15" placeholder="Enter a decimal number">
	<button id="btn_baseConversion" class="btn_convert" onclick="convertToBases()">Convert</button><br>
	<br>
	<div class="conversionContainer" id="binaryContainer">
		<h3>Binary</h3>
		<div class="embed divCenter">
			<p class="conversion" id="bin">
				<b>Decimal to Binary:</b><br>
				15 MOD 2 = 1<br>
				7 MOD 2 = 1<br>
				3 MOD 2 = 1<br>
				1 MOD 2 = 1<br>
				15₁₀ = 1111₂
			</p>
		</div>
		<br>
	</div>
	<div class="conversionContainer" id="octalContainer">
		<h3>Octal</h3>
		<div class="embed divCenter">
			<p class="conversion" id="oct">
				<b>Decimal to Binary:</b><br>
				15 MOD 2 = 1<br>
				7 MOD 2 = 1<br>
				3 MOD 2 = 1<br>
				1 MOD 2 = 1<br>
				15₁₀ = 1111₂<br>
				<br>
				<b>Binary to Octal:</b><br>
				1111₂ = 001-111₂<br>
				001 = 1<br>
				111 = 7<br>
				15₁₀ = 17₈	
			</p>
		</div>
		<br>
	</div>
	<div class="conversionContainer showHide" id="decimalContainer">
		<h3>Decimal</h3>
		<div class="embed divCenter">
			<p class="conversion" id="dec">
				<b>Decimal:</b><br>
				15₁₀ = 15₁₀
			</p>
		</div>
		<br>
	</div>
	<div class="conversionContainer" id="hexadecimalContainer">
		<h3>Hexadecimal</h3>
		<div class="embed divCenter">
			<p class="conversion" id="hex">
				<b>Decimal to Binary:</b><br>
				15 MOD 2 = 1<br>
				7 MOD 2 = 1<br>
				3 MOD 2 = 1<br>
				1 MOD 2 = 1<br>
				15₁₀ = 1111₂<br>
				<br>
				<b>Binary to Hexadecimal:</b><br>
				1111<br>
				1111 = F<br>
				15₁₀ = F₁₆
			</p>
		</div>
		<br>
	</div>
</div>



