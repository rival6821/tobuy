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
//  로그인 모달 

$(function(){

	let listClickCnt = 0;
	$('#listWrap .list').click(function(){
		if(listClickCnt==0 && !$(this).hasClass('on')){
			$(this).addClass('on');
			listClickCnt++;
		}else if(listClickCnt==1 && $(this).hasClass('on')){
			$(this).removeClass('on');
			listClickCnt--;
		}else if(listClickCnt==1 && !$(this).hasClass('on')){
			$('#listWrap .list.on').removeClass('on');
			listClickCnt--;
		}
	});
	//리스트 클릭시 구매 및 삭제 뜨게

	$('.clicked .buy').click(function(){
		console.log('buy');
		return false;
	});
	//구매 클릭

	$('.clicked .delete').click(function(){
		console.log('delete');
		return false;
	});
	//삭제 클릭

	$('#login').click(function(){

	});

});