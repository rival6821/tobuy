<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>살것 리스트</title>
    <meta name="description" content="살것 리스트">

    <!-- common css -->
    <link rel="stylesheet" href="dist/css/common.css?v=20190107">

    <!-- jquery -->
	<script src="vendor/jquery-3.3.1.min.js" type="text/javascript"></script>
</head>
<body>
<header>
    <div class="inner clearfix">
        <div id="logo">살것 리스트</div>
        <?php if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){  ?>
            <div id="logout" class="log" onclick="javascript:logout();">로그아웃</div>
        <?php }else{ ?>
            <div id="login" class="log" onclick="javascript:modal('show');">로그인</div>
        <?php } ?>        
        
    </div>
</header>
<div id="loginModal">
    <div class="contents">
        <div class="title">비밀번호 입력</div>
        <div class="close" onclick="javascript:modal('hide');"><img src="dist/img/close.png" alt="close"></div>
        <div class="password">
            <input type="password" name="password" onkeypress="if(event.keyCode==13){login(); return false;}">
        </div>
        <div class="loginBtn" onclick="javascript:login()">로그인</div>
    </div>
</div>
<div id="modalBG" onclick="javascript:modal('hide');"></div>