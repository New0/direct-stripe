<?php
/**
 * Created by PhpStorm.
 * User: nahuel
 * Date: 08/06/2018
 * Time: 17:24
 */

class ds_process_functions
{

    /**
     * Set API Keys
     *
     * @since 2.2.3
     */
    public static function api_keys( $d_stripe_general  ){

        // API Keys
        if (isset( $d_stripe_general['direct_stripe_checkbox_api_keys']) && $d_stripe_general['direct_stripe_checkbox_api_keys'] === true) {
            \Stripe\Stripe::setApiKey($d_stripe_general['direct_stripe_test_secret_api_key']);
        } else {
            \Stripe\Stripe::setApiKey($d_stripe_general['direct_stripe_secret_api_key']);
        }

    }

    /**
     * Check if a stripe_id is registered or create Stripe user and return a $stripe ID
     *
     * @since 2.2.3
     */
    public static function check_user_process( $email_address, $d_stripe_general, $custom_role, $token, $params ){

        if( $d_stripe_general['direct_stripe_check_records'] === true && $params['type'] !== 'subscription' ) {
            return false;
        }

        //Check if user exists
        if( username_exists( $email_address ) || email_exists( $email_address ) ) {
            $user = get_user_by( 'email', $email_address );
            $user_id = $user->id;
            $stripe_id = get_user_meta( $user->id, 'stripe_id', true );
            if( !empty($stripe_id)) {
                $check_stripe_user = \Stripe\Customer::retrieve($stripe_id);
            }



            if ( !empty( $stripe_id ) && isset( $check_stripe_user )  ) {//User exists and have a Stripe ID

                //Update user roles if records are allowed
                if( $d_stripe_general['direct_stripe_check_records'] !== true ) {
                    $user->add_role('stripe-user');
                    $user->add_role($custom_role);
                }

            } else {// User exists but doesn't have a Stripe ID

                //Create Stripe customer
                $customer = \Stripe\Customer::create(array(
                    'email' => $email_address,
                    'source'  => $token
                ));
                $stripe_id = $customer->id;

                //Register Stripe ID if Allowed
                if( $d_stripe_general['direct_stripe_check_records'] !== true ) {
                    //Register Stripe ID if not testing
                    if ($d_stripe_general['direct_stripe_checkbox_api_keys'] !== true) {
                        update_user_meta($user_id, 'stripe_id', $stripe_id);
                    }
                    //Update user roles
                    $user->add_role('stripe-user');
                    $user->add_role($custom_role);
                }
            }

        } else {// User doesn't exist

            // Create Stripe Customer
            $customer  = \Stripe\Customer::create(array(
                'email'  => $email_address,
                'source' => $token
            ));
            $stripe_id = $customer->id;

            if ($d_stripe_general['direct_stripe_check_records'] !== true) {
                // Generate the password and create the user
                $password = wp_generate_password(12, false);
                //$user_id = wp_create_user( $email_address, $password, $email_address );
                $userdata = array(
                    'user_login' => $email_address,
                    'user_pass'  => $password,
                    'user_email' => $email_address,
                    'nickname'   => $email_address
                );
                $user_id  = wp_insert_user($userdata);

                //Register Stripe ID if not testing
                if ($d_stripe_general['direct_stripe_checkbox_api_keys'] !== true) {
                    update_user_meta($user_id, 'stripe_id', $stripe_id);
                }

                // Add User roles
                $user = new WP_User($user_id);
                $user->add_role('stripe-user');
                $user->add_role($custom_role);

            } else {
                $user_id = false;
            }
        }
        $user = array(
            'user_id'   =>  $user_id,
            'stripe_id' =>  $stripe_id
        );
        return $user;

    }

    /**
     * Set logs data during transaction
     *
     * @since 2.2.3
     */
    public static function logs_meta( $logsdata ){

        //Log transaction in WordPress admin
        $postparams = array(
            'post_title'  => $logsdata['token'],
            'post_status' => 'publish',
            'post_type'   => 'Direct Stripe Logs',
            'post_author' => $logsdata['user_id'],
            'meta_input'  => array(
                'stripe_id'                        => $logsdata['stripe_id'],
                'charge_id'                        => $logsdata['charge_id'],
                'amount'                           => $logsdata['amount'],
                'currency'                         => $logsdata['currency'],
                'capture'                          => $logsdata['capture'],
                'type'                             => $logsdata['type'],
                'description'                      => $logsdata['description'],
                'ds_billing_name'                  => $logsdata['billing_name'],
                'ds_billing_address_country'       => $logsdata['billing_address_country'],
                'ds_billing_address_zip'           => $logsdata['billing_address_zip'],
                'ds_billing_address_state'         => $logsdata['billing_address_state'],
                'ds_billing_address_line1'         => $logsdata['billing_address_line1'],
                'ds_billing_address_city'          => $logsdata['billing_address_city'],
                'ds_billing_address_country_code'  => $logsdata['billing_address_country_code'],
                'ds_shipping_name'                 => $logsdata['shipping_name'],
                'ds_shipping_address_country'      => $logsdata['shipping_address_country'],
                'ds_shipping_address_zip'          => $logsdata['shipping_address_zip'],
                'ds_shipping_address_state'        => $logsdata['shipping_address_state'],
                'ds_shipping_address_line1'        => $logsdata['shipping_address_line1'],
                'ds_shipping_address_city'         => $logsdata['shipping_address_city'],
                'ds_shipping_address_country_code' => $logsdata['shipping_address_country_code'],
            )
        );
        $post_id = wp_insert_post($postparams);

        return $post_id;
    }

    /**
     * Set user meta during transaction
     *
     * @since 2.2.3

    public static function user_meta( $logsdata ){

        //Log user
        $usermetas                                     = array();
        $usermetas['ds_billing_name']                  = $logsdata['billing_name'];
        $usermetas['ds_billing_address_country']       = $logsdata['billing_address_country'];
        $usermetas['ds_billing_address_zip']           = $logsdata['billing_address_zip'];
        $usermetas['ds_billing_address_state']         = $logsdata['billing_address_state'];
        $usermetas['ds_billing_address_line1']         = $logsdata['billing_address_line1'];
        $usermetas['ds_billing_address_city']          = $billing_address_city;
        $usermetas['ds_billing_address_country_code']  = $billing_address_country_code;
        $usermetas['ds_shipping_name']                 = $shipping_name;
        $usermetas['ds_shipping_address_country']      = $shipping_address_country;
        $usermetas['ds_shipping_address_zip']          = $shipping_address_zip;
        $usermetas['ds_shipping_address_state']        = $shipping_address_state;
        $usermetas['ds_shipping_address_line1']        = $shipping_address_line1;
        $usermetas['ds_shipping_address_city']         = $shipping_address_city;
        $usermetas['ds_shipping_address_country_code'] = $shipping_address_country_code;

        foreach ($usermetas as $key => $value) {
            if (get_user_meta($user_id, $key, true)) {
            update_user_meta($user_id, $key, $value);
            } else {
            add_user_meta($user_id, $key, $value);
            }
        }

    }*/



}