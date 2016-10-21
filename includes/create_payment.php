<?php
defined( 'ABSPATH' ) or die( 'Please!' );

$nonce = $_REQUEST['ds-nonce'];
if (! wp_verify_nonce($nonce, 'direct-stripe-nonce') ) die("Security check");

// Souscriptions Stripe
if( !class_exists( 'Stripe' ) ) {
    require_once(DSCORE_PATH . '/stripe/init.php');
}
$d_stripe_general = get_option( 'direct_stripe_general_settings' );
$d_stripe_emails = get_option( 'direct_stripe_emails_settings' );
// Be sure to replace this with your actual test API key
// (switch to the live key later)
if( $d_stripe_general['direct_stripe_checkbox_api_keys'] === '1' ) { 
		\Stripe\Stripe::setApiKey($d_stripe_general['direct_stripe_test_secret_api_key']);
} else { 
		\Stripe\Stripe::setApiKey($d_stripe_general['direct_stripe_secret_api_key']);
} 

$admin_email = get_option( 'admin_email' );

try {
$amount = isset($_GET['amount']) ? $_GET['amount'] : '';
$token = $_POST['stripeToken'];
$email_address = $_POST['stripeEmail'];

//Cherche Si utilisateur est enregistré  
if( username_exists( $email_address ) || email_exists( $email_address ) ) {
	$user = get_user_by( 'email', $email_address );
	$stripe_id_array = get_user_meta( $user->id, 'stripe_id' );
	$stripe_id = implode(" ", $stripe_id_array);
} else {
	$stripe_id == false;
}

if($stripe_id) { // Utilisateur enregistré

  $charge = \Stripe\Charge::create(array(
      'customer' => $stripe_id,
      'amount' => $amount,
		  'currency' => $d_stripe_general['direct_stripe_currency']
  ));
	
	//Log transaction in WordPress admin
  $post_id = wp_insert_post(
							array(
								'post_title' => $token,
								'post_status' => 'publish',
								'post_type' => 'Direct Stripe Logs',
								'post_author'	=>	$user->id
							)
						);
	add_post_meta($post_id, 'amount', $amount);
	add_post_meta($post_id, 'type', __('payment','direct-stripe') );
	
         // Email client
  if(  isset($d_stripe_emails['direct_stripe_user_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === '1' ) {
      wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_email_subject'] ,  $d_stripe_emails['direct_stripe_user_email_content'] );
  }
      // Email admin
  if(  isset($d_stripe_emails['direct_stripe_admin_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === '1' ) {
      wp_mail( $admin_email , $d_stripe_emails['direct_stripe_admin_email_subject'] ,  $d_stripe_emails['direct_stripe_admin_email_content'] );
  }
	
} else { // Aucun match adresse email = Stripe User enregistré dans le site
		$customer = \Stripe\Customer::create(array(
    'email' => $email_address,
    'source'  => $token
  ));

  $charge = \Stripe\Charge::create(array(
      'customer' => $customer->id,
      'amount' => $amount,
      'currency' => 'eur'
  ));
	
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
	update_user_meta($user_id, 'stripe_id', $customer->id );
	    $user = new WP_User( $user_id );
      $user->set_role( 'stripe-user' );
	
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
	add_post_meta($post_id, 'type', __('payment','direct-stripe'));

	       // Email client
  if(  isset($d_stripe_emails['direct_stripe_user_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === '1' ) {
      wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_email_subject'] ,  $d_stripe_emails['direct_stripe_user_email_content'] );
  }
      // Email admin
  if(  isset($d_stripe_emails['direct_stripe_admin_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === '1' ) {
      wp_mail( $admin_email , $d_stripe_emails['direct_stripe_admin_email_subject'] ,  $d_stripe_emails['direct_stripe_admin_email_content'] );
  }
	
}//endif user exists
wp_redirect( $d_stripe_general['direct_stripe_success_page'] );
  exit;
}
catch(Exception $e)
{
	//Email client
  if(  isset($d_stripe_emails['direct_stripe_user_error_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_error_emails_checkbox'] === '1' ) {
  wp_mail( $admin_email, $d_stripe_emails['direct_stripe_user_error_email_subject'] ,  $d_stripe_emails['direct_stripe_user_error_email_content'] );
  }
  //Email admin
  if(  isset($d_stripe_emails['direct_stripe_admin_error_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_error_emails_checkbox'] === '1' ) {
  wp_mail( $admin_email, $d_stripe_emails['direct_stripe_admin_error_email_subject'] ,  $d_stripe_emails['direct_stripe_admin_error_email_content'] );
  }
  wp_redirect( $d_stripe_general['direct_stripe_error_page'] );	
  error_log("unable to proceed with:" . $_POST['stripeEmail'].
    ", error:" . $e->getMessage());
	exit;
}
?>