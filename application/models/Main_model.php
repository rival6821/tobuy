<?php
class Main_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function get_list(){
    	$sql = "select * from tb_list where is_buy = 'n' and is_delete = 'n' order by regdate desc";
    	return $this->db->query($sql)->result_array();
    }

}
 ?>
