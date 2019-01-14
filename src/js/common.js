//  로그인 모달 
function modal(text){
	let loginModal = document.getElementById('loginModal');
	let modalBG = document.getElementById('modalBG');
	if(text=='show'){
		loginModal.style.display = 'block';
		modalBG.style.display = 'block';
		$('input[name=password]').focus();
	}else if(text=='hide'){
		loginModal.style.display = 'none';
		modalBG.style.display = 'none';
	}
}

//	로그인 기능
function login(){
	let password = $('input[name=password]').val();
	if($.trim(password).length>0){
		$.ajax({
			url:'./main/login',
			data:{
				password:password
			},
			type:'post',
			success:(res)=>{
				if(res == 'success'){
					location.reload();
				}else{
					alert('비밀번호를 확인해주세요');
				}
			},
			error:(a,b,c)=>{
				console.log(a);console.log(b);console.log(c);
			}
		});
	}else{
		alert('비밀번호를 입력해주세요');
	}
}

//살것 내용 등록
function textSubmit(){
	let text = $.trim($('input[name=newbuy]').val());
	if(text.length>0){
		$.ajax({
			url:'./main/textSubmit',
			data:{
				text:text
			},
			type:'post',
			success:(res)=>{
				if(res=='success'){
					$('#inputPage').hide();
					$('input[name=newbuy]').val('');
					listReload(1,15);
				}else{
					alert(res);
				}
			},
			error:(a,b,c)=>{
				console.log(a);console.log(b);console.log(c);
			}
		});
	}
}

// 로그아웃
function logout(){
	if(confirm('로그아웃 하시겠습니까?')){
		location.href='./main/logout';
	}
}

//	리스트 새로고침
function listReload(page,pagelist,type){
	$.ajax({
		url:'./main/listReload',
		data:{
			page:page,
			pagelist:pagelist
		},
		type:'post',
		dataType:'json',
		success:(res)=>{
			if(type == 'first'){
				$('#listWrap').html(res.lists);
			}else{
				if(res.cnt == 0){
					document.getElementById('is_last').value = 'y';
					$('#addBtn').removeClass('out');
					return false;
				}
				$('#listWrap').append(res.lists);
			}
			$('#addBtn').removeClass('out');
		},
		error:(a,b,c)=>{
			console.log(a);console.log(b);console.log(c);
		}
	});
}

$(function(){

	//	현재 페이지 확인
	//	now , before
	let section = 'now';

	// 살것리스트 페이지
	let page = 1;
	// 이전목록 페이지
	let beforePage = 1;

	// 한번에 보여줄 리스트 갯수
	const pagelist = 15;

	//	첫 화면 살것 리스트
	listReload(page,pagelist,'first');

	//무한스크롤 
	$(window).scroll(function() {
		if($("body").height() >= $(window).height()){
			if ($(window).scrollTop() == $(document).height() - $(window).height()) {
				if(section == 'now' && document.getElementById('is_last').value != 'y'){
					listReload(++page,pagelist,'notFirst');
					console.warn('page',page);
				}
	    	}	
		}
	});


	//리스트 클릭시 구매 및 삭제 뜨게
	let listClickCnt = 0;
	$('#listWrap').on('touch click','.list',function(){
		if($(this).hasClass('nolist')){
			return false;
		}
		if(!$(this).hasClass('log')){
			alert('로그인 후 사용가능합니다');
			return false;
		}
		if($('#inputPage').css('display')=='block'){
			$('#inputPage').css('display','none');
			$('input[name=newbuy]').val('');
		}
		let $addBtn = $('#addBtn');
		if(listClickCnt==0 && !$(this).hasClass('on')){
			$(this).addClass('on');
			$addBtn.addClass('out');
			listClickCnt++;
		}else if(listClickCnt==1 && $(this).hasClass('on')){
			$(this).removeClass('on');
			$addBtn.removeClass('out');
			listClickCnt--;
		}else{
			$('#listWrap .list.on').removeClass('on');
			$(this).addClass('on');
			if(!$addBtn.hasClass('out')){
				$addBtn.addClass('out');
			}
		}
	});

	//	살것 등록하기 버튼 클릭
	$('#addBtn').on('touch click',function(){
		if($('#inputPage').css('display')=='none'){
			/*$('#inputPage').css('display','block');*/
			$('#inputPage').slideDown();
			$('body').scrollTop(0);
			$('input[name=newbuy]').focus();
		}else{
			/*$('#inputPage').css('display','none');*/
			$('#inputPage').slideUp();
			$('input[name=newbuy]').val('');
		}
	});

	//구매 클릭
	$('#listWrap').on('touch click','.buy',function(){
		if(confirm('구매처리 하시겠습니까?')){
			let idx = $(this).attr('data-idx');
			$.ajax({
				url:'./main/buyAction',
				data:{
					idx:idx
				},
				type:'post',
				success:(res)=>{
					if(res=='success'){
						listReload();
					}else{
						alert(res);
					}
				},
				error:(a,b,c)=>{
					console.log(a);console.log(b);console.log(c);
				}
			});
		}
		return false;
	});
	
	//삭제 클릭
	$('#listWrap').on('touch click','.delete',function(){
		if(confirm('삭제처리 하시겠습니까?')){
			let idx = $(this).attr('data-idx');
			$.ajax({
				url:'./main/deleteAction',
				data:{
					idx:idx
				},
				type:'post',
				success:(res)=>{
					if(res=='success'){
						listReload();
					}else{
						alert(res);
					}
				},
				error:(a,b,c)=>{
					console.log(a);console.log(b);console.log(c);
				}
			});
		}
		return false;
	});

	//	이전 리스트 보기
	$('#beforeList').on('touch click',function(){
		if(!$(this).hasClass('before')){
			$(this).addClass('before');
			section = 'now';
			$('#beforeList img').attr('src','dist/img/list02.png');
			$.ajax({
				url:'./main/before',
				success:(res)=>{
					$('#listWrap').html(res);
					$('#addBtn').addClass('out');
					$('#logo').text('이전 리스트');
				},
				error:(a,b,c)=>{
					console.log(a);console.log(b);console.log(c);
				}
			});
		}else{
			$(this).removeClass('before');
			section = 'before';
			$('#beforeList img').attr('src','dist/img/list01.png');
			$('#logo').text('살것 리스트');
			listReload(1);
		}
	});

});