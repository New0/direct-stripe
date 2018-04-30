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
        add_action('admin_enqueue_scripts', array($this, 'direct_stripe_load_admin_scripts'));
        //Styles and Script for ajax handling
        add_action( 'wp_enqueue_scripts', array( $this, 'direct_stripe_scripts') );

    }

    /**
     * Load admin Scripts
     *
     * @since 2.0.0
     */
    function direct_stripe_load_admin_scripts( $hook ) {


        wp_enqueue_style( 'direct-stripe-admin-style', DSCORE_URL . 'assets/admin/dist/css/style.css', array( 'wp-blocks' ) );
        wp_enqueue_media();
        wp_enqueue_style('wp-color-picker');

        wp_register_script(
            'vue',
            'https://unpkg.com/vue@2.5.16/dist/vue.js'
        //PROD 'https://cdn.jsdelivr.net/npm/vue'
        );
        wp_enqueue_script('direct-stripe-admin-app', DSCORE_URL . 'admin-app/dist/build.js', array('jquery'), ('0.0.1'), true );
        wp_localize_script('direct-stripe-admin-app', 'ds_admin_app_vars', array(
                'strings' => array(
                    'saved' => __( 'Settings Saved', 'direct-stripe' ),
                    'error' => __( 'Error', 'direct-stripe' )
                ),
                'dsCorePath' => DSCORE_PATH,
                'dsCoreUrl' => DSCORE_URL,
                'api'     => array(
                    'url'   => esc_url_raw( rest_url( 'direct-stripe/v1/settings' ) ),
                    'nonce' => wp_create_nonce( 'wp_rest' )
                )
            )
        );
        wp_enqueue_script('direct-stripe-admin-script', DSCORE_URL . 'assets/admin/dist/js/main.min.js', array('jquery', 'wp-color-picker', 'wp-blocks', 'wp-element',  'vue', 'vue-custom-element', 'vuetify' ), ('1.0.0'), true );
        wp_localize_script('direct-stripe-admin-script', 'direct_stripe_image_script_vars', array(
                'title' => __('Logo for Stripe Form', 'direct-stripe'),
                'message' => __('Use selected image', 'direct-stripe'),

            )
        );


        register_block_type( 'direct-stripe/stripe-button-block', array(
            'editor_script' => 'direct-stripe-admin-script',
            'editor_style' => 'direct-stripe-admin-style',
        ) );

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
        
	    wp_register_script('direct-stripe-checkout-script',  '//checkout.stripe.com/checkout.js' );
        wp_register_script('direct-stripe-handler-script', DSCORE_URL . 'assets/public/dist/js/main.min.js', array('jquery' ), false, false);
	    
    }

}
$dsScripts = new dsScripts;