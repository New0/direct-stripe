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
        //Security check
        check_ajax_referer( 'direct-stripe-nonce', 'ds_nonce' );

        //Retrieve Data
        require_once( DSCORE_PATH . 'process/ds_retrieve_data.php');

        //Process API Keys
        \ds_process_functions::api_keys( $d_stripe_general );

        //Set of data for answers
        $resultData = [
            'general_options'   => $d_stripe_general,
            'params'            => $params
        ];

        //Confirm Payment Intent Server side and display answers
        if ( !empty($payment_intent_id) ) {
            $intent = \Stripe\PaymentIntent::retrieve(
              $payment_intent_id
            );
            $intent->confirm();

            \ds_process_functions::ds_generatePaymentResponse($intent, $resultData);

        //Payment Intent already confirmed on frontend, display answers
        } else if( !empty( $paymentIntentSucceeded ) ) {
            $intent = (object) $paymentIntentSucceeded;
            \ds_process_functions::ds_generatePaymentResponse( $intent, $resultData );
        }

        //Process User
        $user = \ds_process_functions::check_user_process( $email_address, $d_stripe_general, $custom_role, $token, $params );

        //Process Transaction
        try {

            // Charge for setup fee
            if( !empty( $setup_fee) ){
                $setupfeedata = array(
                    "amount" => $setup_fee,
                    "currency" => $currency,
                    "description" => __('One time setup fee ', 'direct-stripe') . $description
                );
                if( $user === false ) {
                    $setupfeedata['source' ] = $token;
                } else {
                    $setupfeedata['customer'] = $user['stripe_id'];
                }
                $setupfeedata = apply_filters( 'direct_stripe_setup_fee_data', $setupfeedata, $user, $token, $setup_fee, $currency, $description );
                $fee = \Stripe\InvoiceItem::create( $setupfeedata );
            }

            //Process Update Type
            if( $params['type'] === 'update' ) { 

                $intent = [
                    'user'  =>  $user,
                    'text'  =>  $amount,
                    'type'  =>  'card_update',
                    'status'=> 'succeeded'
                ];

                \ds_process_functions::ds_generatePaymentResponse($intent, $resultData);

            //Process payment and donation Type
            } elseif( $params['type'] === 'payment' || $params['type'] === 'donation') {
                
                if($capture === true){
                    $capture_method = 'automatic';
                } else {
                    $capture_method = 'manual';
                }
                if ( !empty($payment_method_id) ) {
                    $chargerdata = array(
                        'payment_method'    => $payment_method_id,
                        'amount'            => $amount,
                        'currency'          => $currency,
                        'description'       => $description,
                        'confirmation_method' => 'manual',
                        'confirm' => true,
                    );
                    if( $user !== false ) {
                        $chargerdata['customer'] = $user['stripe_id'];
                    }
                    $chargerdata = apply_filters( 'direct_stripe_charge_data', $chargerdata, $user, $token, $amount, $currency, $capture, $description, $button_id, $params );
                    $intent  = \Stripe\PaymentIntent::create( $chargerdata );
                    \ds_process_functions::ds_generatePaymentResponse($intent, $resultData);
                }

            //Process subscription Type
            } elseif( $params['type'] === 'subscription' && !empty($payment_method_id) ) {
               
                // create new subscription to plan
                $subscriptiondata = [
                    "items" => [
                        [
                            "plan" => $amount,
                        ],
                    ],
                    "coupon"   => $coupon,
                    "metadata"	=> [
                        "description" => $description
                    ],
                    "customer"  => $user['stripe_id'],
                    "expand[]"  => "latest_invoice.payment_intent"
                ];
                $subscriptiondata = apply_filters( 'direct_stripe_subscription_data', $subscriptiondata, $user, $token, $button_id, $amount, $coupon, $description );
                $subscription = \Stripe\Subscription::create( $subscriptiondata );
                \ds_process_functions::ds_generatePaymentResponse( $subscription, $resultData );

            }

        } catch (Exception $e) {
            $e = $e;
            error_log("Something wrong happened:" . $e->getMessage() );
        }

    }

}
$dsProcess = new ds_process_transactions;