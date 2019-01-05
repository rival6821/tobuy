//  로그인 모달 
function modal(text){
	let loginModal = document.getElementById('loginModal');
	let modalBG = document.getElementById('modalBG');
	if(text=='show'){
		loginModal.style.display = 'block';
		modalBG.style.display = 'block';
	}else if(text=='hide'){
		loginModal.style.display = 'none';
		modalBG.style.display = 'none';
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
					location.reload();
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

$(function(){

	//리스트 클릭시 구매 및 삭제 뜨게
	let listClickCnt = 0;
	$('#listWrap .list').click(function(){
		if(listClickCnt==0 && !$(this).hasClass('on')){
			$(this).addClass('on');
			listClickCnt++;
		}else if(listClickCnt==1 && $(this).hasClass('on')){
			$(this).removeClass('on');
			listClickCnt--;
		}else{
			$('#listWrap .list.on').removeClass('on');
			$(this).addClass('on');
		}
	});

	//구매 클릭
	$('.clicked .buy').click(function(){
		let idx = $(this).attr('data-idx');
		$.ajax({
			url:'./main/buyAction',
			data:{
				idx:idx
			},
			type:'post',
			success:(res)=>{
				if(res=='success'){
					alert('구매처리 되었습니다');
					location.reload();
				}else{
					alert(res);
				}
			},
			error:(a,b,c)=>{
				console.log(a);console.log(b);console.log(c);
			}
		});
		return false;
	});
	
	//삭제 클릭
	$('.clicked .delete').click(function(){
		let idx = $(this).attr('data-idx');
		$.ajax({
			url:'./main/deleteAction',
			data:{
				idx:idx
			},
			type:'post',
			success:(res)=>{
				if(res=='success'){
					alert('삭제처리 되었습니다');
					location.reload();
				}else{
					alert(res);
				}
			},
			error:(a,b,c)=>{
				console.log(a);console.log(b);console.log(c);
			}
		});
		return false;
	});
	

	$('#login').click(function(){

	});

});