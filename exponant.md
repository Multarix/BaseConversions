<script>const page = "exponant"</script>
<script defer src="{{ site.baseurl }}/assets/javascript/floatingPoint.js"></script>
<script defer src="{{ site.baseurl }}/assets/javascript/scripts-floating.js"></script>
<h1><center><b>Work in Progress - Binary Exponant</b></center></h1>
<div class="conversionArea center">
	<div class="inputArea">
		<div id="toFromDiv">
			<select class="dropDownInput" name="toFrom" id="toFrom">
				<option value="to" onclick="showHide('totalBits', true)" selected="selected">To Binary</option>
				<option value="from" onclick="showHide('totalBits', false)">From Binary</option>
			</select><br>
			<br>
		</div>
		<div id="totalBitsDiv">
			<b>Total Bits</b><br>
			<select class="dropDownInput" name="totalBits" id="totalBits">
				<option value="8">8</option>
				<option value="12">12</option>
				<option value="16">16</option>
				<option value="24">24</option>
				<option value="32" selected="selected">32</option>
			</select><br>
			<br>
		</div>
		<div id="totalBits">
			<b>Exponant/ Characteristic Length</b><br>
			<select class="dropDownInput" name="expLength" id="expLength">
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8" selected="selected">8</option>
			</select><br>
			<br>
		</div>
		<input class="manualInput" type="number" id="inputExpField" data-value="10" data-tofrom="to" data-totalbits="32" data-expLength="8" placeholder="Input number" value="10.10" step="0.1" required> 
		<button id="btn_expConversion" class="btn_convert" onclick="doOutput()">Convert</button>
	</div><br>
	<div class="error hidden" id ="error"></div>
		<h3><b>Output</b></h3>
		<div class="output divCenter">
		<p id="output">
		</p>
		</div><br>
</div>