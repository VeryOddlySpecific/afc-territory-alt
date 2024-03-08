<?php

class AFC_Territory {

    private $admin;

    public function __construct() {
        $this->load_dependencies();
    }

    private function load_dependencies() {
        require_once AFCT_DIR_B . 'includes/admin/class-afc-territory-admin.php';
    }

    public function run() {
        $this->admin = new AFC_Territory_Admin();
        $this->admin->run();
    }
}