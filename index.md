<script>const page = "home"</script>
<h1><center><b>Base Converions</b></center></h1>
<div class="conversionArea divCenter">
	<p>Convert between bases</p>
	Input Format:<br>
	<select name = "fromBase" id="fromBase">
		<option value="2">Binary (Base 2)</option>
		<option value="8">Octal (Base 8)</option>
		<option value="10" selected="true">Decimal (Base 10)</option>
		<option value="16">Hexadecimal (Base 16)</option>
	</select><br>
	<br>
	<input type="text" id="ipt_baseConversion" value="15" placeholder="Enter a decimal number">
	<button id="btn_baseConversion" class="btn_convert" onclick="convertToBases()">Convert</button><br>
	<br>
	<div class="conversionContainer" id="binaryContainer">
		<h3>Binary</h3>
		<div class="embed divCenter">
			<p class="conversion" id="bin" data-content=" ">
				Convert from Decimal to Binary:<br>
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
			<p class="conversion" id="oct" data-content=" ">
				Convert from Decimal to Binary:<br>
				15 MOD 2 = 1<br>
				7 MOD 2 = 1<br>
				3 MOD 2 = 1<br>
				1 MOD 2 = 1<br>
				15₁₀ = 1111₂<br>
				<br>
				Convert from Binary to Octal<br>
				1111 = 001111<br>
				001 | 111<br>
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
			<p class="conversion" id="dec" data-content=" ">
				Decimal to Decimal:<br>
				15₁₀ = 15₁₀
			</p>
		</div>
		<br>
	</div>
	<div class="conversionContainer" id="hexadecimalContainer">
		<h3>Hexadecimal</h3>
		<div class="embed divCenter">
			<p class="conversion" id="hex" data-content=" ">
				Convert from Decimal to Binary:<br>
				15 MOD 2 = 1<br>
				7 MOD 2 = 1<br>
				3 MOD 2 = 1<br>
				1 MOD 2 = 1<br>
				15₁₀ = 1111₂<br>
				<br>
				Convert from Binary to HEX<br>
				1111<br>
				1111 = F<br>
				15₁₀ = F₁₆
			</p>
		</div>
		<br>
	</div>
</div>



