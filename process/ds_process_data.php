<?php
/**
 * Created by PhpStorm.
 * User: nahuel
 * Date: 24/06/2018
 * Time: 19:48
 */

extract($_POST, EXTR_PREFIX_SAME, "post_");

$d_stripe_general = get_option('direct_stripe_general_settings');
$d_stripe_emails  = get_option('direct_stripe_emails_settings');
$headers          = array('Content-Type: text/html; charset=UTF-8');
$admin_email = get_option('admin_email');

$button_id  = isset($params['button_id']) ? $params['button_id'] : '';
$token         = isset($stripeToken) ? $stripeToken : '';
$email_address = isset($stripeEmail) ? $stripeEmail : '';

/****  Amount ****/
if( $params['type'] === 'payment' ) {
    $pre_amount = isset($params['amount']) ? $params['amount'] : '';
    $amount     = base64_decode($pre_amount);
    if (isset($params['value']) && $params['value'] != '0') {
        $amount = $amount * 100;
    }
} elseif( $params['type'] === 'donation' ) {
    $pre_amount     = isset($_POST['amount']) ? $_POST['amount'] : '';
    if ( isset($params['zero_decimal']) && $params['zero_decimal'] === "true" ) {
        $amount = $pre_amount;
    } else {
        $amount = $pre_amount * 100;
    }
    $amount = apply_filters( 'ds_donation_amount', $amount);
} elseif( $params['type'] === 'subscription' ) {
    $pre_amount = isset($params['amount']) ? $params['amount'] : '';
    $amount     = base64_decode($pre_amount);
    $coupon     = isset($params['coupon']) ? $params['coupon'] : '';
    $setup_fee  = isset($params['setup_fee']) ? $params['setup_fee'] : '';
}

/****  Options ****/
if ($params['capture'] === 'false') {
    $capture = false;
} else {
    $capture = true;
}
$description = isset($params['description']) ? $params['description'] : '';

$custom_role = isset($params['custom_role']) ? $params['custom_role'] : '';
if ( ! empty($custom_role) && wp_roles()->is_role($custom_role) == false) {
    add_role($custom_role, __('Direct Stripe ' . $custom_role, 'direct-stripe'), array('read' => true));
}

if ( ! empty($params['currency'])) {
    $currency = $params['currency'];
} else {
    $currency = $d_stripe_general['direct_stripe_currency'];
}

if( $d_stripe_general['direct_stripe_check_records'] !== true ) {
    $logsdata = array(
        'token'                            => $token,
        'user_id'                          => $user['user_id'],
        'stripe_id'                        => $user['stripe_id'],
        'charge_id'                        => $charge->id,
        'amount'                           => $amount,
        'currency'                         => $currency,
        'capture'                          => $capture,
        'type'                             => $params['type'],
        'description'                      => $description,
        'ds_billing_name'                  => $billing_name,
        'ds_billing_address_country'       => $billing_address_country,
        'ds_billing_address_zip'           => $billing_address_zip,
        'ds_billing_address_state'         => $billing_address_state,
        'ds_billing_address_line1'         => $billing_address_line1,
        'ds_billing_address_city'          => $billing_address_city,
        'ds_billing_address_country_code'  => $billing_address_country_code,
        'ds_shipping_name'                 => $shipping_name,
        'ds_shipping_address_country'      => $shipping_address_country,
        'ds_shipping_address_zip'          => $shipping_address_zip,
        'ds_shipping_address_state'        => $shipping_address_state,
        'ds_shipping_address_line1'        => $shipping_address_line1,
        'ds_shipping_address_city'         => $shipping_address_city,
        'ds_shipping_address_country_code' => $shipping_address_country_code,
    );
}
