<?php
class Main_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // 리스트 내용 가져오기
    public function get_list(){
    	$sql = "select * from tb_list where is_buy = 'n' and is_delete = 'n' order by regdate desc";
    	return $this->db->query($sql)->result_array();
    }

    //	리스트 입력하기
    public function insert_list($text){
    	$sql = "insert into tb_list(text,regdate) values(?,now())";
    	return $this->db->query($sql,$text);
    }

    //	리스트 정보 업데이트
    public function update_list($idx,$type){
    	if($type == 'buy'){
    		$sql = "update tb_list set is_buy = 'y', buy_date = now() where idx = ?";
    	}else if($type == 'delete'){
    		$sql = "update tb_list set is_delete = 'y', delete_date = now() where idx = ?";
    	}
    	$this->db->query($sql,$idx);
    	return $this->db->affected_rows();
    }

    // 로그인
    public function get_login($pw){
    	$sql = "select count(*) as cnt from tb_admin where password = ?";
    	return $this->db->query($sql,$pw)->row()->cnt;
    }

}
 ?>
