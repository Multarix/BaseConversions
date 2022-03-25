<script>const page = "exponant"</script>
<h1><center><b>Work in Progress - Binary Exponant</b></center></h1>
<div class="conversionArea center">
		<form id="exponantForm">
			<div id="toFromDiv">
				<select class="notTooSmall" name="toFrom" id="toFrom">
					<option value="to" onclick="showHide('totalBits', true)" selected="selected">To Binary</option>
					<option value="from" onclick="showHide('totalBits', false)">From Binary</option>
				</select><br>
				<br>
			</div>
			<div id="totalBitsDiv">
				<b>Total Bits</b><br>
				<select class="notTooSmall" name="totalBits" id="totalBits">
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
				<select class="notTooSmall" name="totalBits" id="totalBits">
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8" selected="selected">8</option>
				</select><br>
				<br>
			</div>
			<input type="text"> 
			<button id="btn_expConversion" class="btn_convert">Convert</button>
		</form>
		<br>
		<br>
		<div class="embed divCenter">
			<br>
			<br>
			<br>
			<br>
		</div>
</div>