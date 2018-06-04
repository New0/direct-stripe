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
        add_action('admin_enqueue_scripts', array($this, 'direct_stripe_load_admin_scripts' ) );
        //Styles and Script for ajax handling
        add_action( 'wp_enqueue_scripts', array( $this, 'direct_stripe_scripts' ) );
    }

    /**
     * Load admin Scripts
     *
     * @since 2.0.0
     */
    function direct_stripe_load_admin_scripts( $hook ) {

        $screen = get_current_screen();
        if( $screen->id === 'toplevel_page_direct_stripe' ){

            wp_enqueue_style( 'ds-vuetify', DSCORE_URL . 'admin-app/src/assets/css/vuetify.css' );
            wp_enqueue_style( 'direct-stripe-admin-app-icons', DSCORE_URL . 'admin-app/src/assets/css/material-design-icons.css' );
            wp_enqueue_style('wp-color-picker');
            wp_enqueue_media();
            wp_enqueue_script('direct-stripe-admin-app', DSCORE_URL . 'admin-app/dist/build.js', array('jquery', 'wp-color-picker'), ('0.0.1'), true );
            wp_localize_script('direct-stripe-admin-app', 'ds_admin_app_vars', self::direct_stripe_localization() );
            /*
            wp_enqueue_style( 'direct-stripe-admin-style', DSCORE_URL . 'assets/admin/dist/css/style.css', array( 'wp-blocks' ) );

            wp_enqueue_style('wp-color-picker');
            wp_enqueue_script('direct-stripe-admin-script', DSCORE_URL . 'assets/admin/dist/js/main.min.js', array( 'jquery', 'wp-color-picker', 'vue', 'ds-vuetify' ), ('1.0.0'), true );
            wp_localize_script('direct-stripe-admin-script', 'direct_stripe_image_script_vars', array(
                    'title' => __('Logo for Stripe Form', 'direct-stripe'),
                    'message' => __('Use selected image', 'direct-stripe')
                )
            );*/

        }

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

    /**
     * Texts for js files
     *
     * @since 2.0.0
     */
    function direct_stripe_localization() {
        include( DSCORE_PATH . 'includes/localized-texts.php');
        return $texts;
    }

}
$dsScripts = new dsScripts;