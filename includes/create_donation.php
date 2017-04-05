<?php
defined( 'ABSPATH' ) or die( 'Please!' );

$nonce = $_REQUEST['ds-nonce'];
if (! wp_verify_nonce($nonce, 'direct-stripe-nonce') ) die("Security check");

// Stripe
if( ! class_exists( 'Stripe\Stripe' ) ) {
    require_once(DSCORE_PATH . '/stripe/init.php');
}
$d_stripe_general = get_option( 'direct_stripe_general_settings' );
$d_stripe_emails = get_option( 'direct_stripe_emails_settings' );
$headers =  array('Content-Type: text/html; charset=UTF-8');

// API keys
if( isset($d_stripe_general['direct_stripe_checkbox_api_keys']) && $d_stripe_general['direct_stripe_checkbox_api_keys'] === '1' ) {
\Stripe\Stripe::setApiKey($d_stripe_general['direct_stripe_test_secret_api_key']);
} else {
\Stripe\Stripe::setApiKey($d_stripe_general['direct_stripe_secret_api_key']);
}

try{ //Retrieve Data
$button_id 	    = isset($_GET['button_id']) ? $_GET['button_id'] : '';
$amount 	    = $_POST['donationvalue'] * 100;
$token 		    = $_POST['stripeToken'];
$email_address  = $_POST['stripeEmail'];
$admin_email    = get_option( 'admin_email' );
$capture        = isset($_GET['capture']) ? $_GET['capture'] : '';
$description    = isset($_GET['description']) ? $_GET['description'] : '';

$custom_role    = isset($_GET['custom_role']) ? $_GET['custom_role'] : '';
	if ( !empty( $custom_role  ) && wp_roles()->is_role( $custom_role ) == false ) {
		add_role( $custom_role  , __('Direct Stripe ' . $custom_role , 'direct-stripe'), array( 'read' => true ));
	}
	
$success_query = isset($_GET['success_query']) ? $_GET['success_query'] : '';
	if ( !empty($success_query)) {
		$pres_query = urldecode_deep( base64_decode($success_query) );
		preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $r);
		$s_query = array_combine($r[1], $r[2]);
	}
	
$error_query = isset($_GET['error_query']) ? $_GET['error_query'] : '';
	if ( !empty($error_query)) {
		$pres_query = urldecode_deep( base64_decode($error_query) );
		preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $e);
		$e_query = array_combine($e[1], $e[2]);
	}

$success_url =  isset($_GET['success_url']) ? $_GET['success_url'] : '';
	if ( !empty($success_url)) {
		$s_url = urldecode_deep(  base64_decode($success_url) );
	} else {
		$s_url = get_permalink( $d_stripe_general['direct_stripe_success_page'] );
	}
$error_url = isset($_GET['error_url']) ? $_GET['error_url'] : '';
	if ( !empty($error_url)) {
		$e_url = urldecode_deep(  base64_decode($error_url) );
	} else {
		$e_url = get_permalink( $d_stripe_general['direct_stripe_success_page'] );
	}
	
$new_currency =	isset($_GET['currency']) ? $_GET['currency'] : '';
	
	if( isset($new_currency) && !empty($new_currency) ) {
			$currency = $new_currency;
	} else {
			$currency = $d_stripe_general['direct_stripe_currency'];
	}

//Check if user exists
if( username_exists( $email_address ) || email_exists( $email_address ) ) { 
	//User exists, check if it already have a stripe ID
	$user = get_user_by( 'email', $email_address );
	$stripe_id_array = get_user_meta( $user->id, 'stripe_id', true );
		if ( isset($stripe_id_array) && !empty($stripe_id_array) ) {//Stripe ID exists
			//Retrieve Stripe ID and update user roles
			$stripe_id = $stripe_id_array; //implode(" ", $stripe_id_array);
			$user->add_role( 'stripe-user' );
			$user->add_role( $custom_role );
		}
		else {//It doesn't have Stripe ID
			//Create Stripe Customer
			$customer = \Stripe\Customer::create(array(
				'email'     => $email_address,
				'source'    => $token
			));
			$stripe_id = $customer->id;
			//Update User roles
			update_user_meta($user->id, 'stripe_id', $stripe_id);
			$user->add_role( 'stripe-user' );
			$user->add_role( $custom_role );
		}
	
} else { // User doesn't exist	
	$stripe_id == false;
}

if($stripe_id) { // User exists
//Charge
	$charge = \Stripe\Charge::create(array(
		'customer'      => $stripe_id,
		'amount'        => $amount,
		'currency'      => $currency,
		'capture'       => $capture,
		'description'   => $description
	));
	
//Log transaction in WordPress admin
	$post_id = wp_insert_post(
		array(
			'post_title' 	=> $token,
			'post_status' 	=> 'publish',
			'post_type' 	=> 'Direct Stripe Logs',
			'post_author'	=>  $user->id
		)
	);
	add_post_meta($post_id, 'amount', $amount);
	add_post_meta($post_id, 'type', __('donation','direct-stripe') );
	add_post_meta($post_id, 'description', $description );
	
// Email client
  if(  isset($d_stripe_emails['direct_stripe_user_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === '1' ) {
      wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_email_subject'] , $d_stripe_emails['direct_stripe_user_email_content'], $headers );
  }
// Email admin
  if(  isset($d_stripe_emails['direct_stripe_admin_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === '1' ) {
      wp_mail( $admin_email , $d_stripe_emails['direct_stripe_admin_email_subject'] , $d_stripe_emails['direct_stripe_admin_email_content'], $headers );
  }
	
} else { // Utilisateur non reconnu
//Stripe customer	
  $customer = \Stripe\Customer::create(array(
        'email'     => $email_address,
        'source'    => $token
  ));
//Create Charge
  $charge = \Stripe\Charge::create(array(
        'customer'      => $customer->id,
        'amount'        => $amount,
        'currency'      => $currency,
		'capture'       => $capture,
		'description'   => $description
  ));
	
// Generate the password and create the user
  $password = wp_generate_password( 12, false );
//Create User
  $user_id = wp_create_user( $email_address, $password, $email_address );
// Set the nickname
  wp_update_user(
    array(
      'ID'          =>    $user_id,
      'nickname'    =>    $email_address
    )
  );
//Add Stripe ID and User roles
	update_user_meta($user_id, 'stripe_id', $customer->id );
	$user = new WP_User( $user_id );
	$user->add_role( 'stripe-user' );
	$user->add_role( $custom_role );
	
//Log transaction in WordPress admin
  $post_id = wp_insert_post(
		array(
			'post_title' => $token,
			'post_status' => 'publish',
			'post_type' => 'Direct Stripe Logs',
			'post_author' =>	$user_id
		)
	);
	add_post_meta($post_id, 'amount', $amount);
	add_post_meta($post_id, 'type', __('donation','direct-stripe') );
	add_post_meta($post_id, 'description', $description );
	
 // Email client
  if(  isset($d_stripe_emails['direct_stripe_user_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === '1' ) {
      wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_email_subject'] , $d_stripe_emails['direct_stripe_user_email_content'], $headers );
  }
// Email admin
  if(  isset($d_stripe_emails['direct_stripe_admin_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === '1' ) {
      wp_mail( $admin_email , $d_stripe_emails['direct_stripe_admin_email_subject'] , $d_stripe_emails['direct_stripe_admin_email_content'], $headers );
  }
	
}// Fin if else
	
// Add custom action before redirection
	$chargeID = $charge->id;
	do_action( 'direct_stripe_before_success_redirection', $chargeID, $post_id, $button_id, $user_id );

//Redirection after success
	if( !empty($s_query) ) {
		$s_url = add_query_arg( $s_query , $s_url);
	}
	wp_redirect( $s_url );	
  	exit;
}
catch(Exception $e)
{
//Email client
  if( isset($d_stripe_emails['direct_stripe_user_error_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_error_emails_checkbox'] === '1' ) {
  	wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_error_email_subject'] , $d_stripe_emails['direct_stripe_user_error_email_content'], $headers );
  }
//Email admin
  if( isset($d_stripe_emails['direct_stripe_admin_error_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_error_emails_checkbox'] === '1' ) {
  	wp_mail( $admin_email, $d_stripe_emails['direct_stripe_admin_error_email_subject'] , $d_stripe_emails['direct_stripe_admin_error_email_content'], $headers );
  }
	
// Add custom action before redirection
	do_action( 'direct_stripe_before_error_redirection',  $chargeID, $post_id, $button_id, $user_id );
	
//Redirection after error
	if( !empty($e_query) ) {
		$e_url = add_query_arg( $e_query , $e_url);
	}
	wp_redirect( $e_url );

  error_log("unable to proceed with:" . $_POST['stripeEmail'].
    ", error:" . $e->getMessage());
	exit;
}
?>
