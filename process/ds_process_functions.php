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

        //Check if user exists in WordPress
        if( username_exists( $email_address ) || email_exists( $email_address ) ) {
            $user = get_user_by( 'email', $email_address );
            $user_id = $user->ID;
            $s_customer_id = get_user_meta( $user_id, 'stripe_id', true );
            if( !empty( $s_customer_id ) ) {
                $check_stripe_user = \Stripe\Customer::retrieve( $s_customer_id );

                if( !empty( $check_stripe_user ) ) {
                    $stripe_id = $s_customer_id;
                    $check_stripe_user->source = $token;
                    $check_stripe_user->save();
                } else {
                    $stripe_id = self::ds_create_stripe_customer( $email_address, $token );
                }

            }

            if ( !empty( $s_customer_id ) && isset( $check_stripe_user )  ) {//User exists and have a Stripe ID

                //Update user roles if records are allowed
                if( $d_stripe_general['direct_stripe_check_records'] !== true ) {
                    self::ds_add_roles( $user, $custom_role );
                }

            } else {// User exists but doesn't have a Stripe ID

                //Create Stripe customer
                $stripe_id = self::ds_create_stripe_customer( $email_address, $token );

                //Register Stripe ID if Allowed
                if( $d_stripe_general['direct_stripe_check_records'] !== true ) {
                    //Register Stripe ID if not testing
                    if ($d_stripe_general['direct_stripe_checkbox_api_keys'] !== true) {
                        update_user_meta($user_id, 'stripe_id', $stripe_id);
                    }
                    //Update user roles
                    self::ds_add_roles( $user, $custom_role );
                }
            }

        } else { // User doesn't exist

            $check_user = \Stripe\Customer::all( array( "email" => $email_address) );

            if ( !empty( $check_user->data ) ) {
                $stripe_id = $check_user->data[0]->id;
                $user_id = false;
                $check_user->data[0]->source = $token;
                $check_user->data[0]->save();

            } else {
                // Create Stripe Customer
                $stripe_id = self::ds_create_stripe_customer( $email_address, $token );

                if ( $d_stripe_general['direct_stripe_check_records'] !== true ) {
                    // Generate the password and create the user
                    $password = wp_generate_password(12, false);
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
                    //Update user roles
                    self::ds_add_roles( $user, $custom_role );

                } else {
                    $user_id = false;
                }
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
    public static function logs_meta( $logsdata, $params ){

        $meta_input = array(
            'stripe_id'                        => $logsdata['stripe_id'],
            'charge_id'                        => $logsdata['charge_id'],
            'amount'                           => $logsdata['amount'],
            'currency'                         => $logsdata['currency'],
            'capture'                          => $logsdata['capture'],
            'type'                             => $logsdata['type'],
            'description'                      => $logsdata['description']
        );
        if( $params['billing'] === '1' || $params['shipping'] === '1' ) {
            $meta_input['ds_billing_name']                 = $logsdata['ds_billing_name'];
            $meta_input['ds_billing_address_country']      = $logsdata['ds_billing_address_country'];
            $meta_input['ds_billing_address_zip']          = $logsdata['ds_billing_address_zip'];
            $meta_input['ds_billing_address_state']        = $logsdata['ds_billing_address_state'];
            $meta_input['ds_billing_address_line1']        = $logsdata['ds_billing_address_line1'];
            $meta_input['ds_billing_address_city']         = $logsdata['ds_billing_address_city'];
            $meta_input['ds_billing_address_country_code'] = $logsdata['ds_billing_address_country_code'];
        }
        if( $params['shipping'] === '1' ) {
            $meta_input['ds_shipping_name']                 = $logsdata['ds_shipping_name'];
            $meta_input['ds_shipping_address_country']      = $logsdata['ds_shipping_address_country'];
            $meta_input['ds_shipping_address_zip']          = $logsdata['ds_shipping_address_zip'];
            $meta_input['ds_shipping_address_state']        = $logsdata['ds_shipping_address_state'];
            $meta_input['ds_shipping_address_line1']        = $logsdata['ds_shipping_address_line1'];
            $meta_input['ds_shipping_address_city']         = $logsdata['ds_shipping_address_city'];
            $meta_input['ds_shipping_address_country_code'] = $logsdata['ds_shipping_address_country_code'];
        }
        //Log transaction in WordPress admin
        $postparams = array(
            'post_title'  => $logsdata['token'],
            'post_status' => 'publish',
            'post_type'   => 'Direct Stripe Logs',
            'post_author' => $logsdata['user_id'],
            'meta_input'  => $meta_input
        );
        $post_id = wp_insert_post( $postparams );

        return $post_id;
    }

    /**
     * Set user meta during transaction
     *
     * @since 2.2.3
    */
    public static function user_meta( $logsdata, $params, $user ){

        //Log user meta
        $meta_input = array();
        if( $params['billing'] === '1' || $params['shipping'] === '1' ) {
            $meta_input['ds_billing_name']                 = $logsdata['ds_billing_name'];
            $meta_input['ds_billing_address_country']      = $logsdata['ds_billing_address_country'];
            $meta_input['ds_billing_address_zip']          = $logsdata['ds_billing_address_zip'];
            $meta_input['ds_billing_address_state']        = $logsdata['ds_billing_address_state'];
            $meta_input['ds_billing_address_line1']        = $logsdata['ds_billing_address_line1'];
            $meta_input['ds_billing_address_city']         = $logsdata['ds_billing_address_city'];
            $meta_input['ds_billing_address_country_code'] = $logsdata['ds_billing_address_country_code'];
        }
        if( $params['shipping'] === '1' ) {
            $meta_input['ds_shipping_name']                 = $logsdata['ds_shipping_name'];
            $meta_input['ds_shipping_address_country']      = $logsdata['ds_shipping_address_country'];
            $meta_input['ds_shipping_address_zip']          = $logsdata['ds_shipping_address_zip'];
            $meta_input['ds_shipping_address_state']        = $logsdata['ds_shipping_address_state'];
            $meta_input['ds_shipping_address_line1']        = $logsdata['ds_shipping_address_line1'];
            $meta_input['ds_shipping_address_city']         = $logsdata['ds_shipping_address_city'];
            $meta_input['ds_shipping_address_country_code'] = $logsdata['ds_shipping_address_country_code'];
        }

        foreach ( $meta_input as $key => $value) {

            update_user_meta( $user['user_id'], $key, $value );

        }

    }


    /**
     * Process emails
     *
     * @since 2.2.3
     */
    public static function process_emails( $answer, $token, $button_id, $amount, $currency, $email_address, $description, $user, $post_id ) {

        $d_stripe_emails  = get_option('direct_stripe_emails_settings');
        $headers          = array('Content-Type: text/html; charset=UTF-8');
        $admin_email = get_option('admin_email');

        if( ! isset( $answer->object ) ) {

            //Email user
            if (isset($d_stripe_emails['direct_stripe_user_error_emails_checkbox']) && $d_stripe_emails['direct_stripe_user_error_emails_checkbox'] === true) {

                $email_subject = apply_filters('direct_stripe_error_user_email_subject',
                    $d_stripe_emails['direct_stripe_user_error_email_subject'], $token, $amount, $currency,
                    $email_address, $description, $user, $button_id);
                $email_content = apply_filters('direct_stripe_error_user_email_content',
                    $d_stripe_emails['direct_stripe_user_error_email_content'], $token, $amount, $currency,
                    $email_address, $description, $user, $button_id);

                wp_mail($email_address, $email_subject, $email_content, $headers);
            }

            //Email admin
            if (isset($d_stripe_emails['direct_stripe_admin_error_emails_checkbox']) && $d_stripe_emails['direct_stripe_admin_error_emails_checkbox'] === true) {

                $email_subject = apply_filters('direct_stripe_error_admin_email_subject',
                    $d_stripe_emails['direct_stripe_admin_error_email_subject'], $token, $amount, $currency,
                    $email_address, $description, $user, $button_id);
                $email_content = apply_filters('direct_stripe_error_admin_email_content',
                    $d_stripe_emails['direct_stripe_admin_error_email_content'], $token, $amount, $currency,
                    $email_address, $description, $user, $button_id);

                wp_mail($admin_email, $email_subject, $email_content, $headers);
            }

        } else {

            // Email user
            if ( isset($d_stripe_emails['direct_stripe_user_emails_checkbox']) && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === true ) {
                $email_subject = apply_filters('direct_stripe_success_user_email_subject',
                    $d_stripe_emails['direct_stripe_user_email_subject'],
                    $token,
                    $amount,
                    $currency,
                    $email_address,
                    $description,
                    $user,
                    $button_id
                );
                $email_content = apply_filters('direct_stripe_success_user_email_content',
                    $d_stripe_emails['direct_stripe_user_email_content'],
                    $token,
                    $amount,
                    $currency,
                    $email_address,
                    $description,
                    $user,
                    $button_id
                );

                wp_mail( $email_address, $email_subject, $email_content, $headers );
            }
            // Email admin
            if ( isset($d_stripe_emails['direct_stripe_admin_emails_checkbox']) && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === true ) {

                $email_subject = apply_filters('direct_stripe_success_admin_email_subject',
                    $d_stripe_emails['direct_stripe_admin_email_subject'],
                    $token,
                    $amount,
                    $currency,
                    $email_address,
                    $description,
                    $user,
                    $button_id
                );
                $email_content = apply_filters('direct_stripe_success_admin_email_content',
                    $d_stripe_emails['direct_stripe_admin_email_content'],
                    $token,
                    $amount,
                    $currency,
                    $email_address,
                    $description,
                    $user,
                    $button_id
                );

                wp_mail( $admin_email, $email_subject, $email_content, $headers );

            }

        }

    }


    /**
     * Process answer
     *
     * @since 2.2.3
     */
    public static function process_answer( $answer, $button_id, $token, $params, $d_stripe_general, $user, $post_id ) {

        if( ! isset( $answer->object )  ) {

            // Add custom action before redirection
            do_action('direct_stripe_before_error_redirection', false, $post_id, $button_id, $user['user_id'], $token);

            //Answer for ajax
            if (isset($d_stripe_general['direct_stripe_use_redirections']) && $d_stripe_general['direct_stripe_use_redirections'] === true && empty($params['error_url'])) {

                $e_url       = isset($d_stripe_general['direct_stripe_error_page']) ? $d_stripe_general['direct_stripe_error_page'] : '' ;
                $error_query = isset($params['error_query']) ? $params['error_query'] : '';

                if ( ! empty($error_query)) {
                    $pres_query = $error_query;
                    preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $e);
                    $e_query = array_combine($e[1], $e[2]);
                }
                //Add query arguments for redirection
                if ( ! empty($e_query)) {
                    $e_url = add_query_arg($e_query, $e_url);
                }
                //Redirection after success
                $return = array('id' => '2', 'url' => $e_url);

            } elseif ( ! empty($params['error_url'])) {

                $e_url       = isset($params['error_url']) ? $params['error_url'] : '';
                $error_query = isset($params['error_query']) ? $params['error_query'] : '';

                if ( ! empty($error_query)) {
                    $pres_query = $error_query;
                    preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $e);
                    $e_query = array_combine($e[1], $e[2]);
                }
                //Add query arguments for redirection
                if ( ! empty($e_query)) {
                    $e_url = add_query_arg($e_query, $e_url);
                }
                //Redirection after success
                $return = array('id' => '2', 'url' => $e_url);

            } else {

                if ( ! empty($d_stripe_general['direct_stripe_error_message'])) {
                    $return = array(
                        'id'      => '3',
                        'message' => $d_stripe_general['direct_stripe_error_message']
                    );
                } else {
                    $return = array(
                        'id'      => '3',
                        'message' => $answer->getMessage()
                    );
                }

            }

            wp_send_json($return);


        } else {

            // Add custom action before redirection
            do_action('direct_stripe_before_success_redirection', $answer->id, $post_id, $button_id,
                $user['user_id'], $token);

            //Answer for ajax
            if (isset($d_stripe_general['direct_stripe_use_redirections']) && $d_stripe_general['direct_stripe_use_redirections'] === true && empty($params['success_url'])) {

                $s_url         =  isset($d_stripe_general['direct_stripe_success_page']) ? $d_stripe_general['direct_stripe_success_page'] : '';
                $success_query = isset($params['success_query']) ? $params['success_query'] : '';

                if ( ! empty($success_query)) {
                    $pres_query = $success_query;
                    preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $r);
                    $s_query = array_combine($r[1], $r[2]);
                }
                //Add query arguments for redirection
                if ( ! empty($s_query)) {
                    $s_url = add_query_arg($s_query, $s_url);
                }
                //Redirection after success
                $return = array('id' => '2', 'url' => $s_url);

            } elseif ( ! empty($params['success_url']) ) {

                $s_url         = isset($params['success_url']) ? $params['success_url'] : '';
                $success_query = isset($params['success_query']) ? $params['success_query'] : '';

                if ( ! empty($success_query)) {
                    $pres_query = $success_query;
                    preg_match_all("/([^,= ]+):([^,= ]+)/", $pres_query, $r);
                    $s_query = array_combine($r[1], $r[2]);
                }
                //Add query arguments for redirection
                if ( ! empty($s_query)) {
                    $s_url = add_query_arg($s_query, $s_url);
                }
                //Redirection after success
                $return = array('id' => '2', 'url' => $s_url);

            } else {

                $return = array(
                    'id'      => '1',
                    'message' => $d_stripe_general['direct_stripe_success_message']
                );

            }

            wp_send_json($return);

        }
    }

    /**
     * Add customer roles to user
     *
     * @since 2.2.7
     */
    public static function  ds_add_roles( $user, $custom_role ) {
        if( user_can($user, 'stripe-user' ) === false ) {
            $user->add_role('stripe-user');
        }
        if( !empty($custom_role) ){
            $user->add_role($custom_role);
        }
    }

    /**
     * Create Stripe customer and set default source
     *
     * @since 2.2.7
     */
    public static function  ds_create_stripe_customer( $email_address, $token ) {
        //Create Stripe customer
        $customer  = \Stripe\Customer::create(array(
            'email'  => $email_address,
            'source' => $token
        ));

        return $customer->id;
    }

}