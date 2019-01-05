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
		$data['lists'] = $this->main_model->get_list();
		$this->load->view('template/header');
		$this->load->view('main/main',$data);
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


}
