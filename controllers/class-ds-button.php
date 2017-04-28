<?php

/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 14/04/2017
 * Time: 11:51
 */
class dsButton {

    public function __construct() {
    	
        //Add shortcode
        add_shortcode('direct-stripe', array( $this, 'direct_stripe_buttons_func'));
        //Process button
        add_action( 'wp_ajax_ds_process_button',  array( $this, 'direct_stripe_process_button') );
        add_action( 'wp_ajax_nopriv_ds_process_button',  array( $this, 'direct_stripe_process_button') );
	    //add_filter( 'shortcode_atts_direct_stripe', array( $this, 'ds_retrieve_atts') );
	   
    }
	
    /**
     * Shortcode creation
     *
     * @since 2.0.0
     */
    public function direct_stripe_buttons_func( $atts ) {
	    
        $d_stripe_general = get_option( 'direct_stripe_general_settings' );
        $d_stripe_styles = get_option( 'direct_stripe_styles_settings' );;
	    $ds_nonce = wp_create_nonce  ('direct-stripe-nonce');
        $sitename = get_bloginfo('name');
        $description = get_bloginfo('description');
	    $instance = uniqid('ds');
        $directStripeAttrValues = shortcode_atts( array(
            'name' 			    =>	$sitename,
            'amount' 		    =>	'',
            'description' 		=>	$description,
            'label' 		    =>	__('Pay with card', 'direct-stripe'),
            'panellabel' 		=>	__('Pay', 'direct-stripe'),
            'type' 			    =>	'payment',
            'locale' 		    =>	'auto',
            'coupon' 		    =>	'',
            'setup_fee'		    =>	'',
            'capture'		    =>	'true',
            'display_amount'	=> 	'true',
            'currency'		    => 	'',
            'success_query'		=> 	'',
            'error_query'		=> 	'',
            'success_url'		=>	'',
            'error_url'		    =>	'',
            'button_id'		    =>	'',
            'custom_role'       =>  '',
            'billing'           =>  'false',
            'shipping'           =>  'false',
            'rememberme'           =>  'false',
	        'ds_each_button'        => $instance
        ), $atts, 'direct_stripe' );

        //Print the amount in the modal form
        $original_amount = $directStripeAttrValues['amount'];

        //Query args encryption
        if( !empty( $directStripeAttrValues['amount']) ) {
            $directStripeAttrValues['amount'] = base64_encode($directStripeAttrValues['amount']);
        }
	    
	    // the query var and its value
	    $params = array(
		    'direct-stripe'   => $directStripeAttrValues['type'],
		    'amount' 		  => $directStripeAttrValues['amount'],
		    'coupon' 		  => $directStripeAttrValues['coupon'],
		    'setup_fee'       => $directStripeAttrValues['setup_fee'],
		    'capture' 		  => $directStripeAttrValues['capture'],
		    'description'	  => $directStripeAttrValues['description'],
		    'currency' 		  => $directStripeAttrValues['currency'],
		    'success_query'	  => $directStripeAttrValues['success_query'],
		    'error_query'     => $directStripeAttrValues['error_query'],
		    'success_url'	  => $directStripeAttrValues['success_url'],
		    'error_url'		  => $directStripeAttrValues['error_url'],
		    'button_id'		  => $directStripeAttrValues['button_id'],
		    'custom_role'     => $directStripeAttrValues['custom_role'],
		    'ds-nonce'		  => $ds_nonce
	    );
	    
        
        //Enqueue JS and send parameters
	   
	    wp_localize_script('direct-stripe-handler-script', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
	    wp_localize_script('direct-stripe-handler-script', 'ds_general_values', $d_stripe_general);
	    wp_localize_script('direct-stripe-handler-script', 'ds_instance', $instance);
	    wp_localize_script('direct-stripe-handler-script', 'atts' . $instance, $directStripeAttrValues);
	    wp_localize_script('direct-stripe-handler-script', $instance, $params);
	    wp_enqueue_script('direct-stripe-checkout-script');
	    wp_enqueue_script('direct-stripe-handler-script');
	    
        ob_start();
        include( DSCORE_PATH . 'includes/ds-button.php');
	    include( DSCORE_PATH . 'includes/ds-answers.php');
        return ob_get_clean();
  
    }
    
	/**
	 * Retrieve atts to identify mutiple buttons
	 *
	 * @since 2.0.0
	 */
	public function ds_retrieve_atts( $atts) {
			
			//wp_localize_script('direct-stripe-handler-script', 'ds_shortcode_values_' . $i, $att);
	
	}
	
    /**
     * Heart of the action; button triggered
     *
     * @since 2.0.0
     */
    function direct_stripe_process_button() {
        $type = isset($_POST['type']) ? $_POST['type'] : '';
        if( isset( $type ) && $type === 'payment' ) {;
            include( DSCORE_PATH . 'process/ds_payment.php');
            wp_die();
        } elseif( isset( $type ) && $type === 'subscription' ) {
            include( DSCORE_PATH . 'process/ds_subscription.php');
            wp_die();
        } elseif( isset( $type ) && $type === 'donation' ) {
            $pre_amount = isset($_POST['amount']) ? $_POST['amount'] : '';
            include( DSCORE_PATH . 'process/ds_donation.php');
            wp_die();
        } else {
            wp_die( __('Button type argument was not recognized', 'direct-stripe') );
        }

    }

}

$dsButton = new dsButton;