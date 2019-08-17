<?php
/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 14/04/2017
 * Time: 11:48
 */
class dsScripts {

    public function __construct() {
        //Load admin scripts
        add_action( 'admin_enqueue_scripts', array($this, 'direct_stripe_load_admin_scripts' ) );
        //Styles and Script for ajax handling
        add_action( 'wp_enqueue_scripts', array( $this, 'direct_stripe_scripts' ) );
    }

    /**
     * Load admin Scripts
     *
     * @since 2.0.0
     */
    function direct_stripe_load_admin_scripts() {

        $screen = get_current_screen();
        if( $screen->id === 'toplevel_page_direct_stripe' ){

            //wp_enqueue_style( 'ds-vuetify', DSCORE_URL . 'admin-app/src/assets/css/vuetify.min.css' );
            wp_enqueue_style( 'direct-stripe-admin-app-icons', DSCORE_URL . 'admin-app/src/assets/css/material-design-icons.css' );
            wp_enqueue_style( 'wp-color-picker');
            wp_enqueue_media();
            wp_enqueue_script('direct-stripe-admin-app', DSCORE_URL . 'admin-app/dist/build.js', array('jquery', 'wp-color-picker'), ('0.0.1'), true );
            wp_localize_script('direct-stripe-admin-app', 'ds_admin_app_vars', self::direct_stripe_localization() );

        }

        wp_enqueue_script('direct-stripe-admin-script', DSCORE_URL . 'assets/admin/dist/js/main.js', array( 'jquery' ), ('1.0.0'), true );

        wp_enqueue_style( 'direct-stripe-style', DSCORE_URL . 'assets/public/dist/css/style.css' );
        include( DSCORE_PATH . 'includes/styles.php');
        wp_add_inline_style( 'direct-stripe-style', $custom_css );
    }

    /**
     * Styles and Handles ajax request of button
     *
     * @since 2.0.0
     */
    function direct_stripe_scripts() {

        wp_enqueue_style( 'direct-stripe-style', DSCORE_URL . 'assets/public/dist/css/style.css' );
        include( DSCORE_PATH . 'includes/styles.php');
        wp_add_inline_style( 'direct-stripe-style', $custom_css );
        
	    wp_register_script('direct-stripe-checkout-script',  '//js.stripe.com/v3/' );
        wp_register_script('direct-stripe-handler-script', DSCORE_URL . 'assets/public/dist/js/main.min.js', array('jquery' ), false, false);

        $style_settings = get_option( 'direct_stripe_styles_settings' );
        if( isset($style_settings['direct_stripe_tc_error_bubble']) && !empty($style_settings['direct_stripe_tc_error_bubble']) ){
            $checkTC = $style_settings['direct_stripe_tc_error_bubble'];
        } else {
            $checkTC = 'Please check the T&C';
        }

        $general_settings = get_option( 'direct_stripe_general_settings' );
        if($general_settings["direct_stripe_checkbox_api_keys"] === true){
            $p_key = $general_settings['direct_stripe_test_publishable_api_key'];
        } else {
            $p_key = $general_settings['direct_stripe_publishable_api_key'];
        }
        
        wp_localize_script('direct-stripe-handler-script', 'direct_stripe_script_vars', array(
                'p_key' => $p_key,
                'text'  => array(
                    'checkTC'       => __( $checkTC, 'direct-stripe' ),
                    'enterAmount'   => __( 'Please enter amount', 'direct-stripe' ),
                )
            )
        );

    }

    /**
     * Texts for js files
     *
     * @since 2.1.0
     */
    function direct_stripe_localization() {
        include( DSCORE_PATH . 'includes/localized-texts.php');
        return $texts;
    }

}
$dsScripts = new dsScripts;