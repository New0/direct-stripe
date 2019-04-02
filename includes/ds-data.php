<?php
/**
 * Created by PhpStorm.
 * User: nahuel
 * Date: 29/04/2017
 * Time: 18:21
 */
/**
 * Retrieve options and create general data and nonce
 *
 * @since 2.0.0
 */
$d_stripe_general = get_option( 'direct_stripe_general_settings' );
$d_stripe_styles = get_option( 'direct_stripe_styles_settings' );
$ds_nonce = wp_create_nonce  ('direct-stripe-nonce');
$sitename = get_bloginfo('name');
$description = get_bloginfo('description');
// Get email address if current user is logged in
$current = wp_get_current_user();
$current_email = $current->user_email;

//Set ajax url
$ajaxurl =  admin_url( 'admin-ajax.php' );

//Get test or live publishable key
if( isset($d_stripe_general['direct_stripe_checkbox_api_keys']) && $d_stripe_general['direct_stripe_checkbox_api_keys'] === true ) {
    $key = $d_stripe_general['direct_stripe_test_publishable_api_key'];
} else {
    if( isset($d_stripe_general['direct_stripe_publishable_api_key'] ) ) {
        $key = $d_stripe_general['direct_stripe_publishable_api_key'];
    } else {
        $key = '';
    }
}

// Anounce default Shortcode parameters
$directStripeAttrValues = shortcode_atts( array(
    'value'             =>  '0',
	'name' 			    =>	$sitename,
	'amount' 		    =>	'',
	'description' 		=>	$description,
	'label' 		    =>	__('Pay with card', 'direct-stripe'),
	'panellabel' 		=>	__('Pay', 'direct-stripe'),
	'type' 			    =>	'payment',
	'coupon' 		    =>	'',
	'setup_fee'		    =>	'',
	'zero_decimal'		=>	'',
	'capture'		    =>	'',
	'display_amount'	=> 	'',
	'currency'		    => 	'',
	'success_query'		=> 	'',
	'error_query'		=> 	'',
	'success_url'		=>	'',
	'error_url'		    =>	'',
	'button_id'		    =>	'',
	'custom_role'       =>  '',
	'billing'           =>  '',
	'shipping'          =>  '',
	'tc'                =>  '',
	'rememberme'        =>  ''
), $atts, 'direct_stripe' );



/*
 * Check if the shortcode is given a value argument
 *
 * If not, values still can be retrieved the old way from shortcode arguments
 *
 * @since 2.1.0
 */
if( ! $directStripeAttrValues['value'] || $directStripeAttrValues['value'] === '0' ) {

    //Set instance value for old DS format
    $instance = uniqid('ds');

    /**
     * Set conditional data for each button
     *
     * @since 2.0.0
     */
    //Print the amount in the modal form
    if( is_numeric($directStripeAttrValues['amount']) ){
        $original_amount = intval($directStripeAttrValues['amount']);
    } else {
        $original_amount = 0;
    }

    //Query args encryption
    if( !empty( $directStripeAttrValues['amount']) ) {
        $directStripeAttrValues['amount'] = base64_encode($directStripeAttrValues['amount']);
    }

    /**
     * Final values to send
     *
     * @since 2.0.0
     */
    $params = array(
        'name' 			        =>	!empty($directStripeAttrValues['name']) ? $directStripeAttrValues['name'] : '',
        'amount' 		        =>	!empty($directStripeAttrValues['amount']) ? $directStripeAttrValues['amount'] : '',
        'original_amount'       =>  !empty($original_amount) ? $original_amount : '',
        'description' 		    =>	!empty($directStripeAttrValues['description']) ? $directStripeAttrValues['description'] : '',
        'panellabel' 		    =>	!empty($directStripeAttrValues['panellabel']) ? $directStripeAttrValues['panellabel'] : '',
        'type' 			        =>	!empty($directStripeAttrValues['type']) ? $directStripeAttrValues['type'] : '',
        'coupon' 		        =>	!empty($directStripeAttrValues['coupon']) ? $directStripeAttrValues['coupon'] : '',
        'setup_fee'		        =>	!empty($directStripeAttrValues['setup_fee']) ? $directStripeAttrValues['setup_fee'] : '',
        'zero_decimal'		    =>	!empty($directStripeAttrValues['zero_decimal']) ? $directStripeAttrValues['zero_decimal'] : '',
        'capture'		        =>	!empty($directStripeAttrValues['capture']) ? $directStripeAttrValues['capture'] : true,
        'display_amount'	    => 	!empty($directStripeAttrValues['display_amount']) ? $directStripeAttrValues['display_amount'] : '',
        'currency'		        => 	!empty($directStripeAttrValues['currency']) ? $directStripeAttrValues['currency'] : '',
		'locale'		        => 	!empty($directStripeAttrValues['locale']) ? $directStripeAttrValues['locale'] : '',
        'success_query'		    => 	!empty($directStripeAttrValues['success_query']) ? $directStripeAttrValues['success_query'] : '',
        'error_query'		    => 	!empty($directStripeAttrValues['error_query']) ? $directStripeAttrValues['error_query'] : '',
        'success_url'		    =>	!empty($directStripeAttrValues['success_url']) ? $directStripeAttrValues['success_url'] : '',
        'error_url'		        =>	!empty($directStripeAttrValues['error_url']) ? $directStripeAttrValues['error_url'] : '',
        'button_id'		        =>	!empty($directStripeAttrValues['button_id']) ? $directStripeAttrValues['button_id'] : '',
        'custom_role'           =>  !empty($directStripeAttrValues['custom_role']) ? $directStripeAttrValues['custom_role'] : '',
        'billing'               =>  !empty($directStripeAttrValues['billing']) ? $directStripeAttrValues['billing'] :'false',
        'shipping'              =>  !empty($directStripeAttrValues['shipping']) ? $directStripeAttrValues['shipping'] : 'false',
        'rememberme'            =>  !empty($directStripeAttrValues['rememberme']) ? $directStripeAttrValues['rememberme'] : 'false',
        'key'                   =>  !empty($key) ? $key : '',
        'current_email_address' =>  !empty($current_email) ? $current_email : '',
        'ajaxurl'               =>  !empty($ajaxurl) ? $ajaxurl : '',
        'image'                 =>  !empty($d_stripe_general['direct_stripe_logo_image']) ? $d_stripe_general['direct_stripe_logo_image'] : '',
        'general_currency'      =>  !empty($d_stripe_general['direct_stripe_currency']) ? $d_stripe_general['direct_stripe_currency'] : '',
        'general_billing'       =>  !empty($d_stripe_general['direct_stripe_billing_infos_checkbox']) ? $d_stripe_general['direct_stripe_billing_infos_checkbox'] : '',
        'general_shipping'      =>  !empty($d_stripe_general['direct_stripe_shipping_infos_checkbox']) ? $d_stripe_general['direct_stripe_shipping_infos_checkbox'] : '',
        'general_rememberme'    =>  !empty($d_stripe_general['direct_stripe_rememberme_option_checkbox']) ? $d_stripe_general['direct_stripe_rememberme_option_checkbox'] : '',
        'instance'		        =>  !empty($instance) ? $instance : '',
        'ds_nonce'		        =>  !empty($ds_nonce) ? $ds_nonce : ''
    );
    $params = apply_filters( 'ds_filter_params', $params );

} else {

    if( get_option( 'direct_stripe_buttons' ) ) {
        $ds_buttons = get_option( 'direct_stripe_buttons' );
    }
    if( $ds_buttons ) {
        if( array_key_exists( $directStripeAttrValues['value'], $ds_buttons ) ) {
            $ds_button = $ds_buttons[ $directStripeAttrValues['value'] ];
        } else {
            $params = null;
            $ds_button  = null;
            return;
        }

    }

    //Set instance value for new DS format
    if(isset($ds_button->value)){
        $instance = $ds_button->value;
        if(substr($instance, 0, 3) === 'ds-'){
            $instance = str_replace("-", "", $instance);
        }
    }
    
    /**
     * Set conditional data for each button
     *
     * @since 2.0.0
     */
    //Print the amount in the modal form
    //Check IF amount contains a comma and replace it wit dot
    if( strpos( $ds_button->amount , ',') !== false ) {
        $ds_button->amount = str_replace(',', '.', $ds_button->amount );
    }
    if( is_numeric( $ds_button->amount ) ){
        $original_amount = $ds_button->amount * 100;
    } else {
        $original_amount = 0;
    }

    //Query args encryption
    if( !empty( $ds_button->amount ) ) {
        $ds_button->amount = base64_encode( $ds_button->amount );
    }

    /**
     * Final values to send
     *
     * @since 2.0.0
     */
    $params = array(
        'value'                 =>  isset($ds_button->value) ? $ds_button->value : '',
        'name' 			        =>	isset($ds_button->name) ? $ds_button->name : '',
        'amount' 		        =>	isset($ds_button->amount) ? $ds_button->amount : '',
        'original_amount'       =>  isset($original_amount) ? $original_amount : '',
        'description' 		    =>	isset($ds_button->description) ? $ds_button->description : '',
        'panellabel' 		    =>	isset($ds_button->panellabel) ? $ds_button->panellabel : '',
        'type' 			        =>	isset($ds_button->type) ? $ds_button->type : '',
        'coupon' 		        =>	isset($ds_button->coupon) ? $ds_button->coupon : '',
        'setup_fee'		        =>	isset($ds_button->setup_fee) ? $ds_button->setup_fee : '',
        'zero_decimal'		    =>	isset($ds_button->zero_decimal) ? $ds_button->zero_decimal : '',
        'capture'		        =>	isset($ds_button->capture) ? $ds_button->capture : true,
        'display_amount'	    => 	isset($ds_button->display_amount) ? $ds_button->display_amount : false,
        'currency'		        => 	isset($ds_button->currency) ? $ds_button->currency : '',
		'locale'		        => 	isset($ds_button->locale) ? $ds_button->locale : '',
        'success_query'		    => 	isset($ds_button->success_query) ? $ds_button->success_query : '',
        'error_query'		    => 	isset($ds_button->error_query) ? $ds_button->error_query : '',
        'success_url'		    =>	isset($ds_button->success_url) ? $ds_button->success_url : '',
        'error_url'		        =>	isset($ds_button->error_url) ? $ds_button->error_url : '',
        'button_id'		        =>	isset($ds_button->button_id) ? $ds_button->button_id : '',
        'custom_role'           =>  isset($ds_button->custom_role) ? $ds_button->custom_role : '',
        'billing'               =>  isset($ds_button->billing) ? $ds_button->billing : false,
        'shipping'              =>  isset($ds_button->shipping) ? $ds_button->shipping : false,
        'rememberme'            =>  isset($ds_button->rememberme) ? $ds_button->rememberme: false,
        'key'                   =>  isset($key) ? $key : '',
        'current_email_address' =>  isset($current_email) ? $current_email : '',
        'ajaxurl'               =>  isset($ajaxurl) ? $ajaxurl : '',
        'image'                 =>  isset($d_stripe_general['direct_stripe_logo_image']) ? $d_stripe_general['direct_stripe_logo_image'] : '',
        'instance'		        =>  isset($instance) ? $instance : '',
        'ds_nonce'		        =>  isset($ds_nonce) ? $ds_nonce : ''
    );
    $params = apply_filters( 'ds_filter_params', $params );

}