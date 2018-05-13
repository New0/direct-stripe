<?php
/**
 * Created by PhpStorm.
 * User: nahuel
 * Date: 05/05/2018
 * Time: 11:25
 */

array(
    'strings' => array(
        'saved' => __( 'Settings Saved', 'direct-stripe' ),
        'error' => __( 'Error', 'direct-stripe' )
    ),
    'dsCorePath' => DSCORE_PATH,
    'dsCoreUrl' => DSCORE_URL,
    'api'     => array(
        'settings'   => esc_url_raw( rest_url( 'direct-stripe/v1/settings' ) ),
        'buttons'    => esc_url_raw( rest_url( 'direct-stripe/v1/buttons' ) ),
        'nonce' => wp_create_nonce( 'wp_rest' )
    )
);