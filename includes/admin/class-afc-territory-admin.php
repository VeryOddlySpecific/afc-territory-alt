<?php 

class AFC_Territory_Admin {

    public function add_plugin_page() {
        add_menu_page(
            'AFC Territory',
            'AFC Territory',
            'manage_options',
            'afc-territory-admin',
            array( $this, 'create_admin_page' ),
            'dashicons-location-alt',
            6
        );
    }

    public function create_admin_page() {
        echo "<div id='afc-territory-admin'></div>";
    }

    private function handle_src( $src ) {
        if ( strpos( $src, 'http' ) === false ) {
            return AFCT_URL_B . $src;
        }

        return $src;
    }

    public function enqueue_styles_and_scripts() {
        $styles_and_scripts = json_decode( file_get_contents( AFCT_DIR_B . 'includes/assets/styles-and-scripts.json' ), true );

        foreach ( $styles_and_scripts as $item ) {
            $type   = $item['type'];
            $handle = $item['handle'];
            $src    = $this->handle_src( $item['src'] );
            $deps   = $item['deps'];
            $ver    = $item['ver'];
            $footer = isset( $item['in_footer'] ) ? $item['in_footer'] : false;
            $local  = isset( $item['localize'] ) ? $item['localize'] : false;

            if ( $type === 'style' ) {
                wp_enqueue_style( $handle, $src, $deps, $ver );
            } else if ( $type === 'script' ) {
                wp_enqueue_script( $handle, $src, $deps, $ver, $footer );
            }

            // if ( $local ) {
            //     $data_to_localize = array(
            //         'ajaxUrl' => admin_url( 'admin-ajax.php' ),
            //         'mapData' => $this->get_map_data()
            //     );

            //     wp_localize_script( $handle, 'AfctData', $data_to_localize );
            // }
        }
    }

    public function run() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles_and_scripts' ) );    
    }
}