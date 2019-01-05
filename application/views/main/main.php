<div id="mainWrap">
	<div id="inputPage" class="clearfix">
		<input type="text" name="newbuy">
		<div class="inputBtn" onclick="textSubmit()">등록</div>
	</div>
	<div id="listWrap">
		
		<?php foreach ($lists as $row) { ?>
		<div class="list clearfix">
			<div class="info"><?php echo $row['text']; ?></div>
			<div class="clicked">
				<div class="buy" data-idx="<?php echo $row['idx']; ?>">구매</div>
				<div class="delete" data-idx="<?php echo $row['idx']; ?>">삭제</div>
			</div>
		</div>
		<?php } ?>

	</div>
</div>
<!-- mainWrap -->