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
$admin_email = get_option('admin_email');
            // Be sure to replace this with your actual test API key
            // (switch to the live key later)
            \Stripe\Stripe::setApiKey(
              if( $d_stripe_general['direct_stripe_checkbox_api_keys'] === '1' ) { 
		              $d_stripe_general['direct_stripe_test_secret_api_key']
		          } else { 
			            $d_stripe_general['direct_stripe_secret_api_key']
		           } );

try
{
  $amount = isset($_GET['amount']) ? $_GET['amount'] : '';
  $coupon = isset($_GET['coupon']) ? $_GET['coupon'] : '';
  $token = $_POST['stripeToken'];
  $email_address = $_POST['stripeEmail'];

if( username_exists( $email_address ) || email_exists( $email_address ) ) {
  $user = get_user_by( 'email', $email_address );
  $stripe_id_array = get_user_meta( $user->id, 'stripe_id' );
  $stripe_id = implode(" ", $stripe_id_array);
} else {
    $stripe_id == false;
}

if($stripe_id) {
  // create new subscription
    $subscription = \Stripe\Subscription::create(array(
          "customer" => $stripe_id,
          "plan"     => $amount,
          'coupon'   => $coupon
        ));

    $plan = \Stripe\Plan::retrieve($amount);
    $plan_actif = $plan->name;
    //$abonnement = $subscription->subscriptions->data[0]->id;
    //$invoices = \Stripe\Invoice::all(array("limit" => 3, "customer" => $cu->id));
      // Email client
  if(  isset($d_stripe_emails['direct_stripe_user_emails_checkbox']) && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === '1' )  {
      wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_email_subject'] ,  $d_stripe_emails['direct_stripe_user_email_content'] );
  }
      // Email admin
  if(  isset($d_stripe_emails['direct_stripe_admin_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === '1' ) {
      wp_mail( $admin_email , $d_stripe_emails['direct_stripe_admin_email_subject'] ,  $d_stripe_emails['direct_stripe_admin_email_content'] );
  }
  
    } else {  // Si user n'existe pas
      $customer = \Stripe\Customer::create(array(
        'email'   => $email_address,
        'source'  => $token,
        'plan'    => $amount,
        'coupon'  => $coupon
      ));

    $plan = \Stripe\Plan::retrieve($amount);
    $plan_actif = $plan->name;
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
      update_user_meta($user_id, 'stripe_id', $customer->id );
      //update_user_meta($user_id, 'plan_actif', $plan_actif );
      //update_user_meta($user_id, 'id_abonnement', $abonnement );
      // Set the role
      $user = new WP_User( $user_id );
      $user->set_role( 'stripe-user' );
      } //endelse
      // Email client
  if(  isset($d_stripe_emails['direct_stripe_user_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === '1' ) {
      wp_mail( $email_address, $d_stripe_emails['direct_stripe_user_email_subject'] ,  $d_stripe_emails['direct_stripe_user_email_content'] );
  }
      // Email admin
  if(  isset($d_stripe_emails['direct_stripe_admin_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === '1' ) {
      wp_mail( $admin_email, $d_stripe_emails['direct_stripe_admin_email_subject'] ,  $d_stripe_emails['direct_stripe_admin_email_content'] );
  }
      //Redirection
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