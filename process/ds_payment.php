<?php
defined( 'ABSPATH' ) or die( 'Please!' );
$extract = extract($_POST, EXTR_PREFIX_SAME, "post_");
$nonce = isset($params['ds-nonce']) ? $params['ds-nonce'] : '';

if (! wp_verify_nonce($nonce, 'direct-stripe-nonce') ) wp_die( __('Security check issue', 'direct-stripe') );

// Stripe
if( ! class_exists( 'Stripe\Stripe' ) ) {
    require_once('vendor/autoload.php');
}

do_action( 'direct_stripe_before_payment_process' );

//$args = isset($args) ? $args : '';
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

try { //Retrieve Data

    $button_id 	    = isset($params['button_id']) ? $params['button_id'] : '';
    $pre_amount 	= isset($params['amount']) ? $params['amount'] : '';
    $amount         = base64_decode($pre_amount);
	if( $params['capture'] === 'false' ) {
		$capture =  false;
	} else {
		$capture =  true;
	}
    $description	= isset($params['description']) ? $params['description'] : '';
    $custom_role    = isset($params['custom_role']) ? $params['custom_role'] : '';
    if ( !empty( $custom_role  ) && wp_roles()->is_role( $custom_role ) == false ) {
        add_role( $custom_role  , __('Direct Stripe ' . $custom_role , 'direct-stripe'), array( 'read' => true ));
    }
	
	if( !empty($params['currency']) ) {
		$currency = $params['currency'];
	} else {
		$currency = $d_stripe_general['direct_stripe_currency'];
	}

    $token	= isset($stripeToken) ? $stripeToken : '';
    $email_address	= isset($stripeEmail) ? $stripeEmail : '';
  

//Check if user exists
    if( username_exists( $email_address ) || email_exists( $email_address ) ) {
        $user = get_user_by( 'email', $email_address );
        $stripe_id_array = get_user_meta( $user->id, 'stripe_id', true );
        $user_id = $user->id;

        if ( !empty($stripe_id_array) ) {//User exists and have a Stripe ID
            //Retrieve Stripe ID
            $stripe_id = $stripe_id_array; //implode(" ", $stripe_id_array);
            //Update user roles
            $user->add_role( 'stripe-user' );
            $user->add_role( $custom_role );
        }
        else {// User exists but doesn't have a Stripe ID
            //Create Stripe customer
            $customer = \Stripe\Customer::create(array(
                'email' => $email_address,
                'source'  => $token
            ));

            $stripe_id = $customer->id;
            //Register Stripe ID if not testing
			if( $d_stripe_general['direct_stripe_checkbox_api_keys'] != '1' ) {
				update_user_meta($user_id, 'stripe_id', $stripe_id);
			}
			//Update user roles
            $user->add_role( 'stripe-user' );
            $user->add_role( $custom_role );
        }

    } else {// User doesn't exist
        $stripe_id = false;
    }

 if($stripe_id) { // User exists
		//Create Charge
        $charge_action = apply_filters('ds_charge_action_payment', '\Stripe\Charge::create', $button_id );
		$charge_content = apply_filters('ds_charge_content_payment', array(
				'customer'    => $stripe_id,
				'amount'      => $amount,
				'currency'    => $currency,
				'capture'     => $capture,
				'description' => $description
			),
			$token, $stripe_id, $amount, $currency, $capture, $description, $button_id
		);
		$charge = $charge_action($charge_content);
		
		do_action( 'ds_after_charge_payment_process', $charge, $token, $stripe_id, $amount, $currency, $capture, $description, $button_id );

		$chargeID = $charge->id;
	 
	//Log transaction in WordPress admin
    $postparams = array(
        'post_title' 	=> $token,
        'post_status' 	=> 'publish',
        'post_type' 	=> 'Direct Stripe Logs',
        'post_author'	=>  $user_id,
        'meta_input'   	=> array(
            'stripe_id'     					=> $stripe_id,
            'charge_id'     					=> $chargeID,
            'amount'        					=> $amount,
            'currency'      					=> $currency,
            'capture'      						=> $capture,
            'type'          					=>  __('payment','direct-stripe'),
            'description'   					=> $description,
            'ds_billing_name' 					=> $billing_name,
            'ds_billing_address_country' 		=> $billing_address_country,
            'ds_billing_address_zip' 			=> $billing_address_zip,
            'ds_billing_address_state' 			=> $billing_address_state,
            'ds_billing_address_line1' 			=> $billing_address_line1,
            'ds_billing_address_city' 			=> $billing_address_city,
            'ds_billing_address_country_code' 	=> $billing_address_country_code,
            'ds_shipping_name' 					=> $shipping_name,
            'ds_shipping_address_country' 		=> $shipping_address_country,
            'ds_shipping_address_zip' 			=> $shipping_address_zip,
            'ds_shipping_address_state'			=> $shipping_address_state,
            'ds_shipping_address_line1' 		=> $shipping_address_line1,
            'ds_shipping_address_city' 			=> $shipping_address_city,
            'ds_shipping_address_country_code' 	=> $shipping_address_country_code,
        ),
    );
	 $post_id = wp_insert_post( $postparams );

	//Log user
	 $usermetas = array();
	 $usermetas['ds_billing_name'] = $billing_name;
	 $usermetas['ds_billing_address_country'] = $billing_address_country;
	 $usermetas['ds_billing_address_zip'] = $billing_address_zip;
	 $usermetas['ds_billing_address_state'] = $billing_address_state;
	 $usermetas['ds_billing_address_line1'] = $billing_address_line1;
	 $usermetas['ds_billing_address_city'] = $billing_address_city;
	 $usermetas['ds_billing_address_country_code'] = $billing_address_country_code;
	 $usermetas['ds_shipping_name'] = $shipping_name;
	 $usermetas['ds_shipping_address_country'] = $shipping_address_country;
	 $usermetas['ds_shipping_address_zip'] = $shipping_address_zip;
	 $usermetas['ds_shipping_address_state'] = $shipping_address_state;
	 $usermetas['ds_shipping_address_line1'] = $shipping_address_line1;
	 $usermetas['ds_shipping_address_city'] = $shipping_address_city;
	 $usermetas['ds_shipping_address_country_code'] = $shipping_address_country_code;
	
	 foreach ( $usermetas as $key => $value ) {
		 if ( get_user_meta( $user_id, $key, true ) ) {
			 update_user_meta( $user_id, $key, $value );
		 } else {
			 add_user_meta( $user_id, $key, $value );
		 }
	 }

} else { // User doesn't exist
		// Create Stripe Customer
        $customer = \Stripe\Customer::create(array(
            'email'     => $email_address,
            'source'    => $token
        ));
	
		//Create Charge
        $charge_action = apply_filters('ds_charge_action_payment', '\Stripe\Charge::create', $button_id );
		$charge_content = apply_filters('ds_charge_content_payment', array(
				'customer'    => $customer->id,
				'amount'      => $amount,
				'currency'    => $currency,
				'capture'     => $capture,
				'description' => $description
			),
			$token, $stripe_id, $amount, $currency, $capture, $description, $button_id
		);
		$charge = $charge_action($charge_content);
		
		do_action( 'ds_after_charge_payment_process', $charge, $token, $stripe_id, $amount, $currency, $capture, $description, $button_id );

		$chargeID = $charge->id;
		// Generate the password and create the user
        $password = wp_generate_password( 12, false );
        //$user_id = wp_create_user( $email_address, $password, $email_address );
	   $userdata = array(
	        'user_login' => $email_address,
	        'user_pass'  => $password,
	        'user_email' => $email_address,
	    );
	    $user_id = wp_insert_user( $userdata );

        // Set the nickname
        wp_update_user(
            array(
                'ID'          =>    $user_id,
                'nickname'    =>    $email_address
            )
        );
  
        // Add User roles
        $user = new WP_User( $user_id );
        $user->add_role( 'stripe-user' );
        $user->add_role( $custom_role );
	
		 //Log user metas infos
		 $usermetas = array();
		 if( $d_stripe_general['direct_stripe_checkbox_api_keys'] != '1' ) {
		 	$usermetas['stripe_id'] = $customer->id;
		 }
		 $usermetas['ds_billing_name'] = $billing_name;
		 $usermetas['ds_billing_address_country'] = $billing_address_country;
		 $usermetas['ds_billing_address_zip'] = $billing_address_zip;
		 $usermetas['ds_billing_address_state'] = $billing_address_state;
		 $usermetas['ds_billing_address_line1'] = $billing_address_line1;
		 $usermetas['ds_billing_address_city'] = $billing_address_city;
		 $usermetas['ds_billing_address_country_code'] = $billing_address_country_code;
		 $usermetas['ds_shipping_name'] = $shipping_name;
		 $usermetas['ds_shipping_address_country'] = $shipping_address_country;
		 $usermetas['ds_shipping_address_zip'] = $shipping_address_zip;
		 $usermetas['ds_shipping_address_state'] = $shipping_address_state;
		 $usermetas['ds_shipping_address_line1'] = $shipping_address_line1;
		 $usermetas['ds_shipping_address_city'] = $shipping_address_city;
		 $usermetas['ds_shipping_address_country_code'] = $shipping_address_country_code;
		
		 foreach ( $usermetas as $key => $value ) {
			 if ( get_user_meta( $user_id, $key, true ) ) {
				 update_user_meta( $user_id, $key, $value );
			 } else {
				 add_user_meta( $user_id, $key, $value );
			 }
		 }

		//Log transaction in WordPress admin
        $post_id = wp_insert_post(
            array(
                'post_title' 	=>  $token,
                'post_status' 	=>  'publish',
                'post_type' 	=>  'Direct Stripe Logs',
                'post_author' 	=>  $user_id,
	            'meta_input'   => array(
		            'stripe_id'     					=> $customer->id,
					'charge_id'     					=> $chargeID,
	                'amount'        					=> $amount,
	                'currency'      					=> $currency,
		            'capture'      						=> $capture,
	                'type'          					=>  __('payment','direct-stripe'),
		            'description'   					=> $description,
		            'ds_billing_name' 					=> $billing_name,
		            'ds_billing_address_country' 		=> $billing_address_country,
		            'ds_billing_address_zip' 			=> $billing_address_zip,
		            'ds_billing_address_state' 			=> $billing_address_state,
		            'ds_billing_address_line1' 			=> $billing_address_line1,
		            'ds_billing_address_city' 			=> $billing_address_city,
		            'ds_billing_address_country_code' 	=> $billing_address_country_code,
		            'ds_shipping_name' 					=> $shipping_name,
		            'ds_shipping_address_country' 		=> $shipping_address_country,
		            'ds_shipping_address_zip' 			=> $shipping_address_zip,
		            'ds_shipping_address_state' 		=> $shipping_address_state,
		            'ds_shipping_address_line1' 		=> $shipping_address_line1,
		            'ds_shipping_address_city' 			=> $shipping_address_city,
		            'ds_shipping_address_country_code' 	=> $shipping_address_country_code,
	            ),
            )
        );
    
    }//endif user exists else create user

// Email admin-app
    if(  isset($d_stripe_emails['direct_stripe_user_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === '1' ) {

        $email_subject = apply_filters( 'direct_stripe_success_user_email_subject', $d_stripe_emails['direct_stripe_user_email_subject'], $token, $amount, $currency, $email_address, $description, $user_id, $button_id );
        $email_content = apply_filters( 'direct_stripe_success_user_email_content', $d_stripe_emails['direct_stripe_user_email_content'], $token, $amount, $currency, $email_address, $description, $user_id, $button_id );

        wp_mail( $email_address, $email_subject , $email_content, $headers );
    }
// Email admin
    if(  isset($d_stripe_emails['direct_stripe_admin_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === '1' ) {

        $email_subject = apply_filters( 'direct_stripe_success_admin_email_subject', $d_stripe_emails['direct_stripe_admin_email_subject'], $token, $amount, $currency, $email_address, $description, $user_id, $button_id );
        $email_content = apply_filters( 'direct_stripe_success_admin_email_content', $d_stripe_emails['direct_stripe_admin_email_content'], $token, $amount, $currency, $email_address, $description, $user_id, $button_id );

        wp_mail( $admin_email, $email_subject , $email_content, $headers );
    }


// Add custom action before redirection
	
    do_action( 'direct_stripe_before_success_redirection', $chargeID, $post_id, $button_id, $user_id );

  //Answer for ajax
	if( isset($d_stripe_general['direct_stripe_use_redirections'])  && $d_stripe_general['direct_stripe_use_redirections'] === '1' && empty($params['success_url']) ) {
		
		  
		  $s_url = get_permalink($d_stripe_general['direct_stripe_success_page']);
		  $success_query = isset($params['success_query']) ? $params['success_query'] : '';
		  
		  if(!empty($success_query)) {
			  $pres_query = $success_query;
			  preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $r);
			  $s_query = array_combine($r[1], $r[2]);
		  }
		  //Add query arguments for redirection
		  if(!empty($s_query)) {
			  $s_url = add_query_arg($s_query, $s_url);
		  }
		  //Redirection after success
		  $return = array( 'id' => '2', 'url' => $s_url );
		  
	} elseif( !empty($params['success_url']) ) {
		
		$s_url = isset($params['success_url']) ? $params['success_url'] : '';
		$success_query = isset($params['success_query']) ? $params['success_query'] : '';
		
		if(!empty($success_query)) {
			$pres_query = $success_query;
			preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $r);
			$s_query = array_combine($r[1], $r[2]);
		}
		//Add query arguments for redirection
		if(!empty($s_query)) {
			$s_url = add_query_arg($s_query, $s_url);
		}
		//Redirection after success
		$return = array( 'id' => '2', 'url' => $s_url );
		
	} else {
	
	      $return = array(
	          'id'	=> '1',
	          'message' => $d_stripe_general['direct_stripe_success_message']
	      );
	
	}
  
    wp_send_json($return);

}
catch(Exception $e)
{
//Email admin-app
    if( isset($d_stripe_emails['direct_stripe_user_error_emails_checkbox'])  && $d_stripe_emails['direct_stripe_user_error_emails_checkbox'] === '1' ) {

        $email_subject = apply_filters( 'direct_stripe_error_user_email_subject', $d_stripe_emails['direct_stripe_user_error_email_subject'], $token, $amount, $currency, $email_address, $description, $user_id, $button_id );
        $email_content = apply_filters( 'direct_stripe_error_user_email_content', $d_stripe_emails['direct_stripe_user_error_email_content'], $token, $amount, $currency, $email_address, $description, $user_id, $button_id );

        wp_mail( $email_address, $email_subject , $email_content, $headers );
    }
//Email admin
    if( isset($d_stripe_emails['direct_stripe_admin_error_emails_checkbox'])  && $d_stripe_emails['direct_stripe_admin_error_emails_checkbox'] === '1' ) {

        $email_subject = apply_filters( 'direct_stripe_error_admin_email_subject', $d_stripe_emails['direct_stripe_admin_error_email_subject'], $token, $amount, $currency, $email_address, $description, $user_id, $button_id );
        $email_content = apply_filters( 'direct_stripe_error_admin_email_content', $d_stripe_emails['direct_stripe_admin_error_email_content'], $token, $amount, $currency, $email_address, $description, $user_id, $button_id );

        wp_mail( $admin_email, $email_subject , $email_content, $headers );
    }

// Add custom action before redirection
    do_action( 'direct_stripe_before_error_redirection',  $chargeID, $post_id, $button_id, $user_id );

//Answer for ajax
    if( isset($d_stripe_general['direct_stripe_use_redirections'])  && $d_stripe_general['direct_stripe_use_redirections'] === '1' && empty($params['error_url']) ) {
	
	    $e_url = get_permalink($d_stripe_general['direct_stripe_error_page']);
	    $error_query = isset($params['error_query']) ? $params['error_query'] : '';
	
	    if(!empty($error_query)) {
		    $pres_query = $error_query;
		    preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $e);
		    $e_query = array_combine($e[1], $e[2]);
	    }
	    //Add query arguments for redirection
	    if(!empty($e_query)) {
		    $e_url = add_query_arg($e_query, $e_url);
	    }
	    //Redirection after success
	    $return = array( 'id' => '2', 'url' => $e_url );
	    
    } elseif( !empty($params['error_url']) ) {
    	
	    $e_url	= isset($params['error_url']) ? $params['error_url'] : '';
	    $error_query = isset($params['error_query']) ? $params['error_query'] : '';
	
	    if(!empty($error_query)) {
		    $pres_query = $error_query;
		    preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $e);
		    $e_query = array_combine($e[1], $e[2]);
	    }
	    //Add query arguments for redirection
	    if(!empty($e_query)) {
		    $e_url = add_query_arg($e_query, $e_url);
	    }
	    //Redirection after success
	    $return = array( 'id' => '2', 'url' => $e_url );
	    
    } else {

        $return = array(
            'id'	=> '3',
            'message' => $d_stripe_general['direct_stripe_error_message']
        );

    }

    wp_send_json($return);

    error_log("unable to proceed with:" . $_POST['stripeEmail'].
        ", error:" . $e->getMessage());

}
?>
