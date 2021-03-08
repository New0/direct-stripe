<?php

/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 14/04/2017
 * Time: 11:27
 */
class dsAdmin {

    public function __construct() {

        // Admin actions
        if ( is_admin() ) {
            // Add admin settings area
            add_action( 'admin_menu', [$this, 'direct_stripe_add_admin_menu'] );
            add_action( 'media_buttons', [$this, 'direct_stripe_add_shortcode_button'], 20);
            add_action( 'admin_footer', [$this, 'direct_stripe_mce_popup'] );
        }
    }

    /**
     * Add admin page
     *
     * @since 2.0.0
     */
    function direct_stripe_add_admin_menu() {
        add_menu_page( 'Direct Stripe', 'Direct Stripe', 'manage_options', 'direct_stripe', [ $this,'direct_stripe_options_page' ], 'dashicons-money' );
        add_submenu_page( 'direct_stripe', __( 'Settings', 'direct-stripe' ), __( 'Settings', 'direct-stripe' ), 'manage_options', 'direct_stripe' );
    }

    //Build admin settings page
    function direct_stripe_options_page() {
        include( DSCORE_PATH . '/includes/admin-app.html');
    }

    /**
     * Add button above edition areas
     *
     * @since 2.0.0
     */
    function direct_stripe_add_shortcode_button() {
        include( DSCORE_PATH . 'includes/shortcode_button.php' );
    }
    /**
     * Add popup form to generate and insert the shortcode
     *
     * @since 2.0.0
     */
    function direct_stripe_mce_popup(){
        include_once( DSCORE_PATH . 'includes/shortcode_button_form.php' );
    }
}
$dsadmin = new \dsAdmin;