<?php
defined( 'ABSPATH' ) or die( 'Please!' );
$nonce = $_REQUEST['ds-nonce'];
if (! wp_verify_nonce($nonce, 'direct-stripe-nonce') ) die("Security check");

//  Stripe
if( ! class_exists( 'Stripe\Stripe' ) ) {
    require_once(DSCORE_PATH . 'stripe/init.php');
}
$d_stripe_general = get_option( 'direct_stripe_general_settings' );
$d_stripe_emails = get_option( 'direct_stripe_emails_settings' );
$headers =  array('Content-Type: text/html; charset=UTF-8');

// API Keys
if( isset($d_stripe_general['direct_stripe_checkbox_api_keys']) && $d_stripe_general['direct_stripe_checkbox_api_keys'] === '1' ) {
    \Stripe\Stripe::setApiKey($d_stripe_general['direct_stripe_test_secret_api_key']);
} else {
    \Stripe\Stripe::setApiKey($d_stripe_general['direct_stripe_secret_api_key']);
}

$admin_email = get_option( 'admin_email' );

try {
$button_id	= isset($_GET['button_id']) ? $_GET['button_id'] : '';
$pre_amount	= isset($_GET['amount']) ? $_GET['amount'] : '';
$amount		= urldecode_deep( base64_decode($pre_amount) );
$coupon		= isset($_GET['coupon']) ? $_GET['coupon'] : '';
$setup_fee	= isset($_GET['setup_fee']) ? $_GET['setup_fee'] : '';
$token		= $_POST['stripeToken'];
$email_address	= $_POST['stripeEmail'];
$capture	= isset($_GET['capture']) ? $_GET['capture'] : '';
$description	= isset($_GET['description']) ? $_GET['description'] : '';

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
	
$success_url = isset($_GET['success_url']) ? $_GET['success_url'] : '';
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
	$user = get_user_by( 'email', $email_address );
	$stripe_id_array = get_user_meta( $user->id, 'stripe_id', true );
		if ( isset($stripe_id_array) && !empty($stripe_id_array) ) { //User exists and have a stripe ID
			//Retrieve Stripe ID
			$stripe_id = $stripe_id_array; //implode(" ", $stripe_id_array);
			//Update User roles
			$user->add_role( 'stripe-user' );
			$user->add_role( $custom_role );
		}
		else {// User exists and doesn't have a Stripe ID
			//Create Stripe customer
			$customer = \Stripe\Customer::create(array(
				'email'     => $email_address,
				'source'    => $token
			));
			$stripe_id = $customer->id;
			//Add user roles and stripe ID
			update_user_meta($user->id, 'stripe_id', $stripe_id);
			$user->add_role( 'stripe-user' );
			$user->add_role( $custom_role );
		}
	
} else { // User doesn't exist	
	$stripe_id == false;
}
	
if($stripe_id) { //User exist
	 // create new subscription
		if( !empty($coupon) ){ //Coupon exist
		    $subscription = \Stripe\Subscription::create(array(
			  "customer" => $stripe_id,
			  "plan"     => $amount,
			  'coupon'   => $coupon,
			  'metadata'	=> array(
			  'description' => $description
				)
			));
		} else { //Coupon doesn't exist
			$subscription = \Stripe\Subscription::create(array(
				"customer" => $stripe_id,
				"plan"     => $amount,
				"metadata"	=> array(
					"description" => $description
				)
			));
	}
	 // Charge for setup fee	
		if( !empty($setup_fee) ){
			$fee = \Stripe\Charge::create(array(
				"customer" => $stripe_id,
				"amount" => $setup_fee,
				"currency" => $currency,
				"description" => _e('One time setup fee ', 'direct-stripe') . $description,
				"capture" => $capture
			));
		}
	//infos
	$plan = \Stripe\Plan::retrieve($amount);
	$plan_amount = $plan->amount;

	//Log transaction in WordPress admin
	  $post_id = wp_insert_post(
				array(
					'post_title' => $token,
					'post_status' => 'publish',
					'post_type' => 'Direct Stripe Logs',
					'post_author'	=>	$user->id
				)
			);

				add_post_meta($post_id, 'amount', $plan_amount);
			add_post_meta($post_id, 'type', __('subscription','direct-stripe') );
			add_post_meta($post_id, 'description', $description );
	//Log setup_fee in WordPress admin
		if( !empty($setup_fee) ) {
			$post_id = wp_insert_post(
					array(
						'post_title' => $token,
						'post_status' => 'publish',
						'post_type' => 'Direct Stripe Logs',
						'post_author'	=>	$user->id
					)
				);
				add_post_meta($post_id, 'amount', $setup_fee);
				add_post_meta($post_id, 'type', __('setup fee','direct-stripe') );
				add_post_meta($post_id, 'description', __('setup_fee ', 'direct_stripe') . $description );
		}

	// Email client
	  if(  isset($d_stripe_emails['direct_stripe_user_emails_checkbox']) && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === '1' )  {
	      wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_email_subject'], $d_stripe_emails['direct_stripe_user_email_content'], $headers );
	  }
	// Email admin
	  if(  isset($d_stripe_emails['direct_stripe_admin_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === '1' ) {
	      wp_mail( $admin_email , $d_stripe_emails['direct_stripe_admin_email_subject'], $d_stripe_emails['direct_stripe_admin_email_content'], $headers );
	  }
  
 } else {  // User doesn't exist
	
	if( !empty($coupon) ){ //Coupon exist
		$customer = \Stripe\Customer::create(array(
			'email'   	=> $email_address,
			'source'  	=> $token,
			'plan'    	=> $amount,
			'coupon'  	=> $coupon,
			'metadata'	=> array(
				'description' => $description
				)
		));
	} else {// Coupon doesn't exist
		$customer = \Stripe\Customer::create(array(
			'email'   	=> $email_address,
			'source'  	=> $token,
			'plan'    	=> $amount,
			'metadata'	=> array(
				'description' => $description
			)
		));
	}

	//Charge setup Fee
	if( !empty($setup_fee) ){
		$fee = \Stripe\Charge::create(array(
			"customer" 	=> $customer->id,
			"amount"	=> $setup_fee,
			"currency" 	=> $currency,
			"description" 	=> __('Setup fee ', 'direct-stripe') . $description,
			"capture" 	=> $capture
		));
	}
	$plan = \Stripe\Plan::retrieve($amount);
	$plan_amount = $plan->amount;
	//$abonnement = $customer->subscriptions->data[0]->id;
	//$invoices = \Stripe\Invoice::all(array("limit" => 3, "customer" => $customer->id));

	// Generate the password and create the user
	      $password = wp_generate_password( 12, false );
	      $user_id = wp_create_user( $email_address, $password, $email_address );
	      // Set the nickname
	      wp_update_user(
		array(
		  'ID'          =>    $user_id,
		  'nickname'    =>    $email_address
		)
	      );
		//Add Stripe ID to User
	      update_user_meta($user_id, 'stripe_id', $customer->id );
	      // Set the role
		$user = new WP_User( $user_id );
		$user->add_role( 'stripe-user' );
		$user->add_role( $custom_role );

	//Log transaction in WordPress admin
		$post_id = wp_insert_post(
			array(
				'post_title' 	=>  $token,
				'post_status' 	=>  'publish',
				'post_type' 	=>  'Direct Stripe Logs',
				'post_author'	=>  $user_id
			)
		);
		add_post_meta($post_id, 'amount', $plan_amount);
		add_post_meta($post_id, 'type', __('subscription','direct-stripe') );
		add_post_meta($post_id, 'description', $description );
	//Log setup_fee in WordPress admin
		if( !empty($setup_fee) ) {
			$post_id = wp_insert_post(
				array(
					'post_title' 	=> $token . _e(' setup_fee', 'direct_stripe'),
					'post_status' 	=> 'publish',
					'post_type' 	=> 'Direct Stripe Logs',
					'post_author'	=>  $user_id
				)
			);
			add_post_meta($post_id, 'amount', $setup_fee);
			add_post_meta($post_id, 'type', __('setup fee','direct-stripe') );
			add_post_meta($post_id, 'description', __('Setup fee ', 'direct_stripe') . $description );
		}

	// Email client
	  if(  isset($d_stripe_emails['direct_stripe_user_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === '1' ) {
	      wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_email_subject'], $d_stripe_emails['direct_stripe_user_email_content'], $headers );
	  }
	// Email admin
	  if(  isset($d_stripe_emails['direct_stripe_admin_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === '1' ) {
	      wp_mail( $admin_email, $d_stripe_emails['direct_stripe_admin_email_subject'], $d_stripe_emails['direct_stripe_admin_email_content'], $headers );
	  }
}//end user doesn't exist
	
// Add custom action before redirection
	$chargeID = $charge->id;
	do_action( 'direct_stripe_before_success_redirection', $chargeID, $post_id, $button_id, $user_id );

//Add query arguments for redirection
	if( !empty($s_query) ) {
		$s_url = add_query_arg( $s_query , $s_url);
	}
//Redirection after success
	wp_redirect( $s_url );
	exit;
}
catch(Exception $e)
{
//Email client
  if(  isset($d_stripe_emails['direct_stripe_user_error_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_error_emails_checkbox'] === '1' ) {
 	 wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_error_email_subject'], $d_stripe_emails['direct_stripe_user_error_email_content'], $headers );
  }
//Email admin
  if(  isset($d_stripe_emails['direct_stripe_admin_error_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_error_emails_checkbox'] === '1' ) {
  	wp_mail( $admin_email, $d_stripe_emails['direct_stripe_admin_error_email_subject'], $d_stripe_emails['direct_stripe_admin_error_email_content'], $headers );
  }
	
// Add custom action before redirection
	do_action( 'direct_stripe_before_error_redirection',  $chargeID, $post_id, $button_id, $user_id );
	
//Add query arguments for redirection
	if( !empty($e_query) ) {
		$e_url = add_query_arg( $e_query , $e_url);
	}
//Redirection after error
	wp_redirect( $e_url );
	
  error_log("unable to proceed with:" . $_POST['stripeEmail'].
    ", error:" . $e->getMessage());
  exit;
}
?>
