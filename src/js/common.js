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
}

// 로그아웃
function logout(){
	if(confirm('로그아웃 하시겠습니까?')){
		location.href='./main/logout';
	}
}

//	리스트 새로고침
function listReload(){
	$.ajax({
		url:'./main/listReload',
		success:(res)=>{
			$('#listWrap').html(res);
			$('#addBtn').removeClass('out');
		},
		error:(a,b,c)=>{
			console.log(a);console.log(b);console.log(c);
		}
	});
}

$(function(){

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
		if($('#inputPage').css('display')=='flex'){
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
		}
	});

	//	살것 등록하기 버튼 클릭
	$('#addBtn').on('touch click',function(){
		if($('#inputPage').css('display')=='none'){
			$('#inputPage').css('display','flex');
			$('body').scrollTop(0);
			$('input[name=newbuy]').focus();
		}else{
			$('#inputPage').css('display','none');
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
			$('#beforeList img').attr('src','dist/img/list01.png');
			$('#addBtn').removeClass('out');
			$('#logo').text('살것 리스트');
			listReload();
		}
	});

});