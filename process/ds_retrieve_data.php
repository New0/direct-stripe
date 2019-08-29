<?php

/**
 * Created by PhpStorm.
 * User: nahuel
 * Date: 24/06/2018
 * Time: 19:48
 */

extract($_POST, EXTR_PREFIX_SAME, "post_");

$d_stripe_general = get_option('direct_stripe_general_settings');
$d_stripe_styles = get_option('direct_stripe_styles_settings');
$d_stripe_emails = get_option('direct_stripe_emails_settings');

$button_id  = isset($params['button_id']) ? $params['button_id'] : '';
$token         = isset($stripeToken) ? $stripeToken : '';
$payment_method_id = isset($paymentMethodID) ? $paymentMethodID : '';
$payment_intent_id = isset($paymentIntentID) ? $paymentIntentID : '';
$payment_intent_succeeded = isset($paymentIntentSucceeded) ? $paymentIntentSucceeded : '';
$email_address = isset($allData['billingDetails']['email']) ? $allData['billingDetails']['email'] : '';

/****  Amount ****/
if ($params['type'] === 'payment') {
    $pre_amount = isset($params['amount']) ? $params['amount'] : '';
    $amount     = base64_decode($pre_amount);
    if (isset($params['value']) && $params['value'] != '0') {
        $amount = $amount * 100;
    }
} elseif ($params['type'] === 'donation') {
    $pre_amount = isset($_POST['amount']) ? $_POST['amount'] : '';
    if (isset($params['zero_decimal']) && $params['zero_decimal'] === "1" || isset($params['zero_decimal']) && $params['zero_decimal'] === "true") {
        $amount = $pre_amount;
    } else {
        $amount = $pre_amount * 100;
    }
    $amount = apply_filters('ds_donation_amount', $amount);
} elseif ($params['type'] === 'subscription') {
    $pre_amount = isset($params['amount']) ? $params['amount'] : '';
    $amount     = base64_decode($pre_amount);
    $coupon     = isset($params['coupon']) ? $params['coupon'] : '';
    $setup_fee  = isset($params['setup_fee']) ? $params['setup_fee'] : '';
} elseif ($params['type'] === 'update') {
    $pre_amount = isset($params['amount']) ? $params['amount'] : '';
    $amount    = base64_decode($pre_amount);
}

/****  Options ****/
if ($params['capture'] === false || $params['capture'] === 'false' || empty($params['capture'])) {
    $capture = false;
} else {
    $capture = true;
}
$description = isset($params['description']) ? $params['description'] : '';

$custom_role = isset($params['custom_role']) ? $params['custom_role'] : '';
if (!empty($custom_role) && wp_roles()->is_role($custom_role) == false) {
    add_role($custom_role, __('Direct Stripe ' . $custom_role, 'direct-stripe'), array('read' => true));
}

if (!empty($params['currency'])) {
    $currency = $params['currency'];
} else {
    $currency = $d_stripe_general['direct_stripe_currency'];
}

$logsdata = [
    'token'         => $token,
    'amount'        => $amount,
    'currency'      => $currency,
    'capture'       => $capture,
    'type'          => $params['type'],
    'description'   => $description,
    'user_email'    => $email_address
];

//if( $params['billing'] === '1' || $params['shipping'] === '1' ){
$logsdata['ds_billing_name']                  = isset($allData['billingDetails']['name']) ? $allData['billingDetails']['name'] : '';
$logsdata['ds_billing_phone']                 = isset($allData['billingDetails']['phone']) ? $allData['billingDetails']['phone'] : '';
$logsdata['ds_billing_address_zip']           = isset($allData['billingDetails']['address']['postal_code']) ? $allData['billingDetails']['address']['postal_code'] : '';
$logsdata['ds_billing_address_state']         = isset($allData['billingDetails']['address']['state']) ? $allData['billingDetails']['address']['state'] : '';
$logsdata['ds_billing_address_line1']         = isset($allData['billingDetails']['address']['line1']) ? $allData['billingDetails']['address']['line1'] : '';
$logsdata['ds_billing_address_city']          = isset($allData['billingDetails']['address']['city']) ? $allData['billingDetails']['address']['city'] : '';
$logsdata['ds_billing_address_country_code']  = isset($allData['billingDetails']['address']['country']) ? $allData['billingDetails']['address']['country'] : '';
//}
//if( $params['shipping'] === '1' ){
$logsdata['ds_shipping_name']                 = !empty($allData['shippingDetails']['name']) ? $allData['shippingDetails']['name'] : $logsdata['ds_billing_name'];
$logsdata['ds_shipping_phone']                = !empty($allData['shippingDetails']['phone']) ? $allData['shippingDetails']['phone'] : $logsdata['ds_billing_phone'];
$logsdata['ds_shipping_address_zip']          = !empty($allData['shippingDetails']['postal_code']) ? $allData['shippingDetails']['postal_code'] : $logsdata['ds_billing_address_zip'];
$logsdata['ds_shipping_address_state']        = !empty($allData['shippingDetails']['state']) ? $allData['shippingDetails']['state'] : $logsdata['ds_billing_address_state'];
$logsdata['ds_shipping_address_line1']        = !empty($allData['shippingDetails']['line1']) ? $allData['shippingDetails']['line1'] : $logsdata['ds_billing_address_line1'];
$logsdata['ds_shipping_address_city']         = !empty($allData['shippingDetails']['city']) ? $allData['shippingDetails']['city'] : $logsdata['ds_billing_address_city'];
$logsdata['ds_shipping_address_country_code'] = !empty($allData['shippingDetails']['country']) ? $allData['shippingDetails']['country'] : $logsdata['ds_billing_address_country_code'];
//}

//if( $params['type'] === 'subscription' ){
$logsdata['coupon'] = !empty($coupon) ? $coupon : '';
//}
