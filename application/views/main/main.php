<div id="mainWrap">
	<?php if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){  ?>
	<div id="inputPage" class="clearfix">
		<input type="text" name="newbuy" onkeypress="if(event.keyCode==13){textSubmit(); return false;}">
		<div class="inputBtn" onclick="javascript:textSubmit()">등록</div>
	</div>
	<?php } ?>
	<div id="listWrap"></div>
	<input type="hidden" id="is_last">
</div>
<!-- mainWrap -->