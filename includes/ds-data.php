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
$instance = uniqid('ds');
// Anounce default Shortcode parameters
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
// Get email address if current user is logged in
$current = wp_get_current_user();
$current_email = $current->user_email;

//Get test or live publishable key
if( isset($d_stripe_general['direct_stripe_checkbox_api_keys']) && $d_stripe_general['direct_stripe_checkbox_api_keys'] === '1' ) {
	$key = $d_stripe_general['direct_stripe_test_publishable_api_key'];
} else {
	$key = $d_stripe_general['direct_stripe_publishable_api_key'];
}

//Set ajax url
$ajaxurl =  admin_url( 'admin-ajax.php' );
/**
 * Final values to send
 *
 * @since 2.0.0
 */
$params = array(
	'name' 			        =>	$directStripeAttrValues['name'],
	'amount' 		        =>	$directStripeAttrValues['amount'],
	'original_amount'       =>  $original_amount,
	'description' 		    =>	$directStripeAttrValues['description'],
	'panellabel' 		    =>	$directStripeAttrValues['panellabel'],
	'type' 			        =>	$directStripeAttrValues['type'],
	'locale' 		        =>	$directStripeAttrValues['locale'],
	'coupon' 		        =>	$directStripeAttrValues['coupon'],
	'setup_fee'		        =>	$directStripeAttrValues['setup_fee'],
	'zero_decimal'		    =>	$directStripeAttrValues['zero_decimal'],
	'capture'		        =>	$directStripeAttrValues['capture'],
	'display_amount'	    => 	$directStripeAttrValues['display_amount'],
	'currency'		        => 	$directStripeAttrValues['currency'],
	'success_query'		    => 	$directStripeAttrValues['success_query'],
	'error_query'		    => 	$directStripeAttrValues['error_query'],
	'success_url'		    =>	$directStripeAttrValues['success_url'],
	'error_url'		        =>	$directStripeAttrValues['error_url'],
	'button_id'		        =>	$directStripeAttrValues['button_id'],
	'custom_role'           =>  $directStripeAttrValues['custom_role'],
	'billing'               =>  $directStripeAttrValues['billing'],
	'shipping'              =>  $directStripeAttrValues['shipping'],
	'rememberme'            =>  $directStripeAttrValues['rememberme'],
	'key'                   =>  $key,
	'current_email_address' =>  $current_email,
	'ajaxurl'               =>  $ajaxurl,
	'image'                 =>  !empty($d_stripe_general['direct_stripe_logo_image']) ? $d_stripe_general['direct_stripe_logo_image'] : '',
	'general_currency'      =>  !empty($d_stripe_general['direct_stripe_currency']) ? $d_stripe_general['direct_stripe_currency'] : '',
	'general_billing'       =>  !empty($d_stripe_general['direct_stripe_billing_infos_checkbox']) ? $d_stripe_general['direct_stripe_billing_infos_checkbox'] : '',
	'general_shipping'      =>  !empty($d_stripe_general['direct_stripe_shipping_infos_checkbox']) ? $d_stripe_general['direct_stripe_shipping_infos_checkbox'] : '',
	'general_rememberme'    =>  !empty($d_stripe_general['direct_stripe_rememberme_option_checkbox']) ? $d_stripe_general['direct_stripe_rememberme_option_checkbox'] : '',
	'instance'		        =>  $instance,
	'ds-nonce'		        =>  $ds_nonce
);