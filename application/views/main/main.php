<div id="mainWrap">
	<?php if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){  ?>
	<div id="inputPage" class="clearfix">
		<input type="text" name="newbuy">
		<div class="inputBtn" onclick="textSubmit()">등록</div>
	</div>
	<?php } ?>
	<div id="listWrap">
		
		<?php foreach ($lists as $row) { ?>
		<div class="list clearfix <?php 
	if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){
		 ?>log<?php } ?>">
			<div class="info"><?php echo $row['text']; ?></div>

		<?php if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){  ?>
			<div class="clicked">
				<div class="buy" data-idx="<?php echo $row['idx']; ?>">구매</div>
				<div class="delete" data-idx="<?php echo $row['idx']; ?>">삭제</div>
			</div>
		<?php } ?>

		</div>
		<?php } ?>

	</div>
</div>
<!-- mainWrap -->