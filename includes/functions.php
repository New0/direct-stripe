<?php

class DirectStripeFunctions {
  
//Add Stripe user role on plugin activation
function direct_stripe_user_roles_on_activation() {
       add_role( 'stripe-user', 'Stripe user', array( 'read' => true ));
   }
  
 /**
 * Admin Scripts & Styles
 */
function direct_stripe_load_admin_scripts( $hook ) {
  
  global $direct_stripe_page;
	if( $hook != $direct_stripe_page ) 
		return;
  wp_enqueue_style('direct-stripe-admin', DSCORE_URL . '/admin/css/ds-admin.css');
  wp_enqueue_media();
  wp_enqueue_style('wp-color-picker');
  wp_enqueue_script('direct-stripe-image-script', DSCORE_URL . '/admin/js/ds-script.js', array('jquery', 'wp-color-picker'), false, true );
  wp_localize_script('direct-stripe-image-script', 'direct_stripe_image_script_vars', array(
			'title' => __('Logo for Stripe Form', 'direct-stripe'),
			'message' => __('Use selected image', 'direct-stripe')
		)
	);
}
// Shortcode
public function direct_stripe_buttons_func( $atts ) {
$d_stripe_general = get_option( 'direct_stripe_general_settings' );
$d_stripe_styles = get_option( 'direct_stripe_styles_settings' );
$ds_nonce = wp_create_nonce  ('direct-stripe-nonce');
	//Variables globales pour feuille de style custom
	$sitename = get_bloginfo('name');
	$description = get_bloginfo('description');
	$directStripeAttrValues = shortcode_atts( array(
			  'name' 				=>	$sitename,
        'amount' 			=>	'',
        'description' =>	$description,
    	  'label' 			=>	__('Pay with card', 'direct-stripe'),
      	'panellabel' 	=>	__('Pay', 'direct-stripe'),
        'type' 				=>	'payment',
      	'currency' 		=>	'usd',
        'locale' 			=>	'auto',
      	'coupon' 			=>	'',
				'color' 			=>	'',
				'radius'			=>	''
    ), $atts, 'directstripe' );
	// the query var and its value 
$params = array(
	'direct-stripe' => $directStripeAttrValues['type'],
	'amount' => $directStripeAttrValues['amount'],
	'coupon' => $directStripeAttrValues['coupon'],
	'ds-nonce' => $ds_nonce
	); 
	 ob_start();
include( DSCORE_PATH . '/public/shortcode.php');
	return ob_get_clean();
}
		
//Custom queries variables
function direct_stripe_query_vars($vars) {
    $vars[] = 'direct-stripe';
    return $vars;
}
//Redirection Payments Subscriptions
function direct_stripe_parse_request($wp) {
	//Créer souscription
    if (array_key_exists('direct-stripe', $wp->query_vars) 
            && $wp->query_vars['direct-stripe'] == 'subscription') {
      
      include_once DSCORE_PATH . '/includes/create_subscription.php';
    }
	//Créer payment
   if (array_key_exists('direct-stripe', $wp->query_vars) 
            && $wp->query_vars['direct-stripe'] == 'payment') {
      
      include_once DSCORE_PATH . '/includes/create_payment.php';
    }
	//Créer donation
	if (array_key_exists('direct-stripe', $wp->query_vars) 
            && $wp->query_vars['direct-stripe'] == 'donation') {
      
      include_once DSCORE_PATH . '/includes/create_donation.php';
    }
}
	
//Add admin sub-page
function direct_stripe_add_admin_menu() { 
global $direct_stripe_page;
	$direct_stripe_page = add_options_page( 'Direct Stripe', 'Direct Stripe', 'manage_options', 'direct_stripe', array( $this,'direct_stripe_options_page') );
}
	//Register settings
function direct_stripe_settings_init() { 
	include( DSCORE_PATH . '/admin/register-settings.php');
}
	//Display settings
function direct_stripe_settings_render() { 
	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
  $d_stripe_options = get_option( 'direct_stripe_styles_settings' );
  $d_stripe_options = get_option( 'direct_stripe_emails_settings' );
  include( DSCORE_PATH . '/admin/display-settings.php');
}
	
//Build admin settings page
function direct_stripe_options_page() { 
	include( DSCORE_PATH . '/admin/build-page.php');
}
	
//Custom Styles
function direct_stripe_styles_method() {
	wp_enqueue_style( 'direct-stripe-style', DSCORE_URL . '/public/css/direct-stripe.css' );
	include( DSCORE_PATH . '/public/styles.php');
}

	// Display Stripe users
function direct_stripe_show_extra_profile_fields( $user ) { 
	include( DSCORE_PATH . '/admin/display-users.php');
} 
	// Update users
function direct_stripe_save_extra_profile_fields( $user_id ) {
	if ( !current_user_can( 'edit_user', $user_id ) )
    	return false;
	update_user_meta( $user_id, 'stripe_id', $_POST['stripe_id'] );
} 
  //End functions
} // End Class DirectStripeFunctions