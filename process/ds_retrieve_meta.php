<?php
/**
 * Created by PhpStorm.
 * User: nahuel
 * Date: 26/06/2018
 * Time: 10:12
 */
if( $d_stripe_general['direct_stripe_check_records'] !== true ) {

    $logsdata = array(
        'token'                            => $token,
        'user_id'                          => $user['user_id'],
        'stripe_id'                        => $user['stripe_id'],
        'amount'                           => $amount,
        'currency'                         => $currency,
        'capture'                          => $capture,
        'type'                             => $params['type'],
        'description'                      => $description,
    );

    if( $charge ) {
        $logsdata['charge_id'] = $charge->id;
    } elseif( $subscription ) {
        $logsdata['charge_id'] = $subscription->id;
    } else {
        $logsdata['charge_id'] = '';
    }

    if( $params['billing'] === '1' || $params['shipping'] === '1' ){
        $logsdata['ds_billing_name']                  = isset($billing_name) ? $billing_name : '';
        $logsdata['ds_billing_address_country']       = isset($billing_address_country) ? $billing_address_country : '';
        $logsdata['ds_billing_address_zip']           = isset($billing_address_zip) ? $billing_address_zip : '';
        $logsdata['ds_billing_address_state']         = isset($billing_address_state) ? $billing_address_state : '';
        $logsdata['ds_billing_address_line1']         = isset($billing_address_line1) ? $billing_address_line1 : '';
        $logsdata['ds_billing_address_city']          = isset($billing_address_city) ? $billing_address_city : '';
        $logsdata['ds_billing_address_country_code']  = isset($billing_address_country_code) ? $billing_address_country_code : '';
    } elseif( $params['shipping'] === '1' ){
        $logsdata['ds_shipping_name']                 = isset($shipping_name) ? $shipping_name : '';
        $logsdata['ds_shipping_address_country']      = isset($shipping_address_country) ? $shipping_address_country : '';
        $logsdata['ds_shipping_address_zip']          = isset($shipping_address_zip) ? $shipping_address_zip : '';
        $logsdata['ds_shipping_address_state']        = isset($shipping_address_state) ? $shipping_address_state : '';
        $logsdata['ds_shipping_address_line1']        = isset($shipping_address_line1) ? $shipping_address_line1 : '';
        $logsdata['ds_shipping_address_city']         = isset($shipping_address_city) ? $shipping_address_city : '';
        $logsdata['ds_shipping_address_country_code'] = isset($shipping_address_country_code) ? $shipping_address_country_code : '';
    }
}