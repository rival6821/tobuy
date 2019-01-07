<?php 
	if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){ ?>
<div id="addBtn">
	<img src="dist/img/new.png" alt="addBtn">
</div>
<?php } ?>

<footer>
	<div class="inner">

		<div class="left"
		<?php 
	if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){ ?>
		id="beforeList"
<?php } ?>
		><img src="dist/img/list01.png" alt="menu"></div>

		<div class="center">Copyright &copy; By leeilhoon</div>

		<div class="right">
			<div class="innerImg clearfix">
				<a href="http://blog.rival6821.xyz/" target="_blank"><img src="dist/img/blog.png" alt="blog"></a>
				<a href="https://github.com/rival6821" target="_blank"><img src="dist/img/git.png" alt="git"></a>
			</div>
		</div>

	</div>
</footer>
<script src="dist/js/common.js?v=20190108" type="text/javascript"></script>
</body>
</html>