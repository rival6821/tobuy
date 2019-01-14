<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('main_model');
	}

	//	메인페이지
	public function index()
	{	
		$this->load->view('template/header');
		$this->load->view('main/main');
		$this->load->view('template/footer');
	}

	//	살것 입력 ajax
	public function textSubmit(){
		if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){
			$text = $this->input->post('text');
			echo ($this->main_model->insert_list($text))? 'success':'error01';
		}else{
			echo 'error02';
		}
	}

	//	구매 클릭 ajax
	public function buyAction(){
		if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){
			$idx = $this->input->post('idx');
			echo ($this->main_model->update_list($idx,'buy') == '1')? 'success':'error01';
		}else{
			echo 'error02';
		}
	}

	//	삭제 클릭 ajax
	public function deleteAction(){
		if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){
			$idx = $this->input->post('idx');
			echo ($this->main_model->update_list($idx,'delete') == '1')? 'success':'error01';
		}else{
			echo 'error02';
		}
	}

	//	로그인 ajax
	public function login(){
		$user_pw = $this->input->post('password');
		$user_pw1 = hash("sha256",$user_pw);
		$user_pw1 = strtoupper($user_pw1);
		$result = $this->main_model->get_login($user_pw1);
		if($result == 1 ){
			$newdata = array(
				'is_login' => 'true'
			);
			$this->session->set_userdata($newdata);
			echo "success";
		}else{
			echo "fail";
		}
	}

	// 로그아웃
	public function logout(){
		session_destroy();
		redirect('main','refresh');
	}

	//	리스트 새로고침 ajax
	public function listReload(){
		$page = $this->input->post('page');
		$pagelist = $this->input->post('pagelist');
		if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){
			$login = true;
		}else{
			$login = false;
		}
		$lists = $this->main_model->get_list($page,$pagelist);
		$result = "";
		if(count($lists)==0){
			$result = "<div class='list nolist'>목록이 없습니다.</div>";
		}
		foreach ($lists as $row){
			$result .= "<div class='list ";
			if($login){
				$result .= "log";
			}
			$result .= "'><div class='info'>";
			$result .= $row['text'];
			$result .= "</div>";
			if($login){
				$result .= "<div class='clicked'><div class='buy' data-idx='".$row['idx']."'>구매</div><div class='delete' data-idx='".$row['idx']."'>삭제</div></div>";
			}
			$result .= "</div>";
		}
		$return['cnt'] = count($lists);
		$return['lists'] = $result;
		echo json_encode($return,JSON_UNESCAPED_UNICODE);
	}

	//	이전 리스트 뿌려주기 ajax
	public function before(){
		if(isset($_SESSION['is_login']) && $_SESSION['is_login'] == 'true'){
			$lists = $this->main_model->get_before_model();
			$result = "";
			if(count($lists)==0){
				$result = "<div class='beforelist nolist'>목록이 없습니다.</div>";
			}
			foreach ($lists as $row){
				$result .= "<div class='beforelist'><div class='info'>";
				$result .= "<span class='";
				$result .= ($row['is_buy']=='y')? 'buy':'cancel';
				$result .= "'>";
				$result .= ($row['is_buy']=='y')? '구매':'취소';
				$result .= "</span>".$row['text']."</div>";
				$result .= "<div class='optionDate'>";
				$result .= ($row['is_buy']=='y')? substr($row['buy_date'], 0,10) : substr($row['delete_date'], 0,10);
				$result .= "</div></div>";
			}
			echo $result;
		}else{
			echo 'error';
		}
	}


}
