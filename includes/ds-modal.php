<?php
/*
 * Modal form integration
 *
 * Filtered elements for the modal form
 *
 * @since 2.2.0
 */
$ds_countries = apply_filters('ds_countries_listed', include('elements/ds-countries-listed.php'), $instance, $ds_button);

$ds_modal_image = apply_filters('ds_modal_image', include('elements/ds-modal-image.php'), $instance, $ds_button, $d_stripe_general);

$ds_company_element = apply_filters('ds_company_element', include('elements/ds-company-element.php'), $instance, $ds_button);

$ds_modal_name = apply_filters('ds_modal_name', include('elements/ds-modal-name.php'), $instance, $ds_button);

$ds_modal_email = apply_filters('ds_modal_email', include('elements/ds-modal-email.php'), $instance, $ds_button);

$ds_billing_element = apply_filters('ds_billing_element', include('elements/ds-billing-element.php'), $instance, $ds_button, $ds_countries);

$ds_shipping_element = apply_filters('ds_shipping_element', include('elements/ds-shipping-element.php'), $instance, $ds_button, $ds_countries);

$ds_card_element = apply_filters('ds_card_element', include('elements/ds-card-element.php'), $instance, $ds_button);

$ds_modal_button = apply_filters('ds_modal_button', include('elements/ds-modal-button.php'), $instance, $ds_button);

$ds_modal_error = apply_filters('ds_modal_error', include('elements/ds-modal-error.php'), $instance, $ds_button);

$ds_modal_success = apply_filters('ds_modal_success', include('elements/ds-modal-success.php'), $instance, $ds_button);

echo apply_filters(
    'ds_modal_element',
    include('elements/ds-modal-element.php'),
    $instance,
    $ds_button,
    $ds_modal_email,
    $ds_modal_name,
    $ds_billing_element,
    $ds_shipping_element,
    $ds_modal_button,
    $ds_modal_error,
    $ds_modal_success,
    $ds_company_element,
    $ds_modal_image
);

do_action('direct_stripe_after_modal', $button_id);

//old actions
do_action('direct_stripe_after_script_tag');
do_action('direct_stripe_after_form');
