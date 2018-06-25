<?php
/**
 * Created by PhpStorm.
 * User: nahuel
 * Date: 20/06/2018
 * Time: 17:49
 */
defined( 'ABSPATH' ) or die( 'Please!' );


class ds_process_transactions {

    public function __construct() {
        // Stripe
        if ( ! class_exists('Stripe\Stripe')) {
            require_once( DSCORE_PATH . 'vendor/autoload.php' );
        }
        //Functions
        if ( ! class_exists('ds_process_functions')) {
            require_once( DSCORE_PATH . 'process/ds_process_functions.php');
        }

        $this->ds_process();
    }

    /**
     * Heart of the action; button triggered
     *
     * @since 2.1.4
     */
    function ds_process()
    {
        //Retrieve Data
        require_once( DSCORE_PATH . 'process/ds_process_data.php');

        $nonce = isset($params['ds-nonce']) ? $params['ds-nonce'] : '';
        if ( ! wp_verify_nonce($nonce, 'direct-stripe-nonce')) {
            wp_die(__('Security check issue', 'direct-stripe'));
        }

        \ds_process_functions::api_keys( $d_stripe_general );

        $user = \ds_process_functions::check_user_process( $email_address, $d_stripe_general, $custom_role, $token, $params );

        try {

            // Charge for setup fee
            if( !empty( $setup_fee) ){
                $setupfeedata = array(
                    "amount" => $setup_fee,
                    "currency" => $currency,
                    "description" => __('One time setup fee ', 'direct-stripe') . $description
                );
                if($user === false ) {
                    $setupfeedata[] = array(
                        'source'        => $token
                    );
                } else {
                    $setupfeedata[] = array(
                        'customer'    => $user['stripe_id']
                    );
                }
                $fee = \Stripe\InvoiceItem::create( $setupfeedata );
            }

            //Charge
            if( $params['type'] === 'payment' || $params['type'] === 'donation') {

                $chargerdata = array(
                    'amount'      => $amount,
                    'currency'    => $currency,
                    'capture'     => $capture,
                    'description' => $description
                );
                if($user === false ) {
                    $chargerdata[] = array(
                        'source'        => $token
                    );
                } else {
                    $chargerdata[] = array(
                        'customer'    => $user['stripe_id']
                    );
                }
                $charge   = \Stripe\Charge::create( $chargerdata );

            } elseif( $params['type'] === 'subscription' ) {
                // create new subscription to plan
                $subscriptiondata = array(
                    "items" => array(
                        array(
                            "plan" => $amount,
                        ),
                    ),
                    "coupon"   => $coupon,
                    "metadata"	=> array(
                        "description" => $description
                    )
                );
                if($user === false ) {
                    $subscriptiondata[] = array(
                        'source'        => $token
                    );
                } else {
                    $subscriptiondata[] = array(
                        'customer'    => $user['stripe_id']
                    );
                }
                $subscription = \Stripe\Subscription::create( $subscriptiondata );

                $subscription_id = $subscription->id;

                //infos
                $plan = $subscription->plan;
                $plan_amount = $plan->amount;
            }


        } catch (Exception $e) {
            $e = $e;
            error_log("Something wrong happened:" . $e->getMessage() );
        }

        if( $charge || $subscription ) {

            if( $d_stripe_general['direct_stripe_check_records'] !== true ) {
                $post_id  = \ds_process_functions::logs_meta( $logsdata );

                //$usermeta = \ds_process_functions::user_meta( $logsdata );
            }


            // Email admin-app
            if (isset($d_stripe_emails['direct_stripe_user_emails_checkbox']) && $d_stripe_emails['direct_stripe_user_emails_checkbox'] === true) {
                $email_subject = apply_filters('direct_stripe_success_user_email_subject',
                    $d_stripe_emails['direct_stripe_user_email_subject'], $token, $amount, $currency, $email_address,
                    $description, $user_id, $button_id);
                $email_content = apply_filters('direct_stripe_success_user_email_content',
                    $d_stripe_emails['direct_stripe_user_email_content'], $token, $amount, $currency, $email_address,
                    $description, $user_id, $button_id);

                wp_mail($email_address, $email_subject, $email_content, $headers);
            }
            // Email admin
            if (isset($d_stripe_emails['direct_stripe_admin_emails_checkbox']) && $d_stripe_emails['direct_stripe_admin_emails_checkbox'] === true) {

                $email_subject = apply_filters('direct_stripe_success_admin_email_subject',
                    $d_stripe_emails['direct_stripe_admin_email_subject'], $token, $amount, $currency, $email_address,
                    $description, $user_id, $button_id);
                $email_content = apply_filters('direct_stripe_success_admin_email_content',
                    $d_stripe_emails['direct_stripe_admin_email_content'], $token, $amount, $currency, $email_address,
                    $description, $user_id, $button_id);

                wp_mail($admin_email, $email_subject, $email_content, $headers);
            }


            // Add custom action before redirection

            do_action('direct_stripe_before_success_redirection', $charge->id, $post_id, $button_id, $user_id, $token);

            //Answer for ajax
            if (isset($d_stripe_general['direct_stripe_use_redirections']) && $d_stripe_general['direct_stripe_use_redirections'] === true && empty($params['success_url'])) {


                $s_url         = get_permalink($d_stripe_general['direct_stripe_success_page']);
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

            } elseif ( ! empty($params['success_url'])) {

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

        } else {
            //Email admin-app
            if (isset($d_stripe_emails['direct_stripe_user_error_emails_checkbox']) && $d_stripe_emails['direct_stripe_user_error_emails_checkbox'] === true) {

                $email_subject = apply_filters('direct_stripe_error_user_email_subject',
                    $d_stripe_emails['direct_stripe_user_error_email_subject'], $token, $amount, $currency,
                    $email_address, $description, $user_id, $button_id);
                $email_content = apply_filters('direct_stripe_error_user_email_content',
                    $d_stripe_emails['direct_stripe_user_error_email_content'], $token, $amount, $currency,
                    $email_address, $description, $user_id, $button_id);

                wp_mail($email_address, $email_subject, $email_content, $headers);
            }
            //Email admin
            if (isset($d_stripe_emails['direct_stripe_admin_error_emails_checkbox']) && $d_stripe_emails['direct_stripe_admin_error_emails_checkbox'] === true) {

                $email_subject = apply_filters('direct_stripe_error_admin_email_subject',
                    $d_stripe_emails['direct_stripe_admin_error_email_subject'], $token, $amount, $currency,
                    $email_address, $description, $user_id, $button_id);
                $email_content = apply_filters('direct_stripe_error_admin_email_content',
                    $d_stripe_emails['direct_stripe_admin_error_email_content'], $token, $amount, $currency,
                    $email_address, $description, $user_id, $button_id);

                wp_mail($admin_email, $email_subject, $email_content, $headers);
            }

            // Add custom action before redirection
            do_action('direct_stripe_before_error_redirection', $charge->id, $post_id, $button_id, $user_id, $token);

            //Answer for ajax
            if (isset($d_stripe_general['direct_stripe_use_redirections']) && $d_stripe_general['direct_stripe_use_redirections'] === true && empty($params['error_url'])) {

                $e_url       = get_permalink($d_stripe_general['direct_stripe_error_page']);
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
                        'message' => $e->getMessage()
                    );
                }

            }

            wp_send_json($return);

        }
    }


}
$dsProcess = new ds_process_transactions;