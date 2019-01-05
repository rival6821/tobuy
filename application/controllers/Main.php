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
		$text = $this->input->post('text');
		echo ($this->main_model->insert_list($text))? 'success':'error01';
	}

	//	구매 클릭 ajax
	public function buyAction(){
		$idx = $this->input->post('idx');
		echo ($this->main_model->update_list($idx,'buy') == '1')? 'success':'error01';
	}

	//	삭제 클릭 ajax
	public function deleteAction(){
		$idx = $this->input->post('idx');
		echo ($this->main_model->update_list($idx,'delete') == '1')? 'success':'error01';
	}

}
