<?php
/**
 * Plugin Name: AFC Territory
 * Description: A plugin to manage the territory map for AFC
 * Version 3.0.0
 * Author: Alexander Steadman
 */

// if this file is called directly, abort
if ( ! defined( 'WPINC' ) ) {
    die;
}

// define constants
define( 'AFCT_DIR_B', plugin_dir_path( __FILE__ ) );
define( 'AFCT_URL_B', plugin_dir_url( __FILE__ ) );

// include the main plugin class
require_once AFCT_DIR_B . 'includes/class-afc-territory.php';

// instantiate the main plugin class
$afc_territory = new AFC_Territory();
$afc_territory->run();