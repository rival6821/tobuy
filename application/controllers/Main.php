<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('main_model');
	}

	public function index()
	{	
		$data['lists'] = $this->main_model->get_list();
		$this->load->view('template/header');
		$this->load->view('main/main',$data);
		$this->load->view('template/footer');
	}

}
