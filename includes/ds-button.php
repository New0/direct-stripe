<?php
/*
 * Check if the shortcode is given a value argument
 *
 * If not, values still can be retrieved the old way with shortcode arguments
 *
 * @since 2.1.0
 */
if( ! $directStripeAttrValues['value'] || $directStripeAttrValues['value'] === '0' ) {
    $ds_button = (object) $directStripeAttrValues;
}

//Button ID
if ( !empty( $ds_button->button_id ) ) {
    $button_id = $ds_button->button_id;
} else {
    $button_id = $instance;
}
if( !empty( $ds_button->label ) ){
    $label = $ds_button->label;
} else {
    $label = __( 'Undefined button value, check settings', 'direct-stripe' );
}

// Opening actions
do_action( 'direct_stripe_before_form' );
do_action( 'direct_stripe_before_button', $button_id);

//Button Alignment
$ds_class = 'direct-stripe';
if( isset( $atts['alignment'] ) ) {
    if( $atts['alignment'] === 'left' ){
        $ds_class .= ' ds-left';
    } elseif( $atts['alignment'] === 'center' ) {
        $ds_class .= ' ds-center';
    } elseif( $atts['alignment'] === 'right' ) {
        $ds_class .= ' ds-right';
    }
}

//Opening Div
$str_before = '<div class="' . $ds_class . '">';
$str_before = apply_filters( 'direct_stripe_div_before', $str_before, $button_id, $ds_class );
echo $str_before;

//Donation condition and input
if(  isset( $ds_button->type ) && $ds_button->type === 'donation' ) {
    $direct_stripe_donation_input = '<input lang="en" type="number" step="0.01" min="1" name="donationvalue" id="donationvalue-' . $instance . '" class="donationvalue" data-donation-input-id="' . $instance . '" />';
    echo apply_filters('direct_stripe_donation_input', $direct_stripe_donation_input, $instance, $button_id );
}

//Custom styles button conditions
if( isset($d_stripe_styles['direct_stripe_use_custom_styles']) && $d_stripe_styles['direct_stripe_use_custom_styles'] === '1' ) {
    $ds_button_class = 'direct-stripe-button direct-stripe-button-id ';
} elseif( isset($d_stripe_styles['direct_stripe_use_custom_styles']) && $d_stripe_styles['direct_stripe_use_custom_styles'] === '2' ) {
    $ds_button_class = 'original-stripe-button direct-stripe-button-id ';
} else {
    $ds_button_class = 'stripe-button-ds direct-stripe-button-id ';
}

//T&C Check box condition
if(isset($ds_button->tc) && !empty($ds_button->tc) && $ds_button->tc !== false && $ds_button->tc !== "false" && $ds_button->tc !== "0") {
    $ds_button_class .= ' ds-check-tc';
}
if(  isset( $ds_button->type ) && $ds_button->type === 'donation' ) {
    $ds_button_class .= ' ds-check-donation';
}

//Button Class
$ds_button_class = apply_filters('direct_stripe_button_class', $ds_button_class, $button_id, $instance );

//Button
$button = '<button id="' . $button_id . '" data-id="' . $instance . '" class="' . $ds_button_class . ' ' . $instance . '">' . esc_attr( $label ) . '</button>';
$button = apply_filters( 'direct_stripe_button', $button, $instance, $button_id, $ds_button_class);
echo $button;

//T&C Check box condition
if(isset($ds_button->tc) && !empty($ds_button->tc) && $ds_button->tc !== false && $ds_button->tc !== "false" && $ds_button->tc !== "0") {
    $tc_cond = '<br/><input type="checkbox" class="ds-conditions ' . $instance . '" id="ds-conditions-' . $instance . '" required/>
    <label for="ds-conditions-' . $instance . '">
    ' . esc_attr($d_stripe_styles['direct_stripe_tc_text']) . '
        <a target="_blank" href="' . esc_url($d_stripe_styles['direct_stripe_tc_link']) . '">' . $d_stripe_styles['direct_stripe_tc_link_text'] . '</a>
    </label><br />';
    $tc_cond = apply_filters( 'direct_stripe_tc_conditions', $tc_cond, $button_id, $instance, $d_stripe_styles['direct_stripe_tc_text'], $d_stripe_styles['direct_stripe_tc_link'], $d_stripe_styles['direct_stripe_tc_link_text'] );
    echo $tc_cond;
}

if(  isset( $ds_button->type ) && $ds_button->type === 'donation' ) {
    echo '<input type="hidden" class="dsDonationValue-' . $instance. '" value=""/>';
}

//Closing Div
$str_after = "</div>";
$str_after = apply_filters( 'direct_stripe_div_after', $str_after, $button_id );
echo $str_after;

$ds_modal_image = apply_filters('ds_modal_image', include('elements/ds-modal-image.php'), $instance, $ds_button, $d_stripe_general );

$ds_company_element = apply_filters('ds_company_element', include('elements/ds-company-element.php'), $instance, $ds_button );

$ds_modal_name = apply_filters('ds_modal_name', include('elements/ds-modal-name.php'), $instance, $ds_button );

$ds_billing_element = apply_filters('ds_billing_element', include('elements/ds-billing-element.php'), $instance, $ds_button );

$ds_shipping_element = apply_filters('ds_shipping_element', include('elements/ds-shipping-element.php'), $instance, $ds_button );

$ds_card_element = apply_filters('ds_card_element', include('elements/ds-card-element.php'), $instance, $ds_button );

$ds_modal_button = apply_filters('ds_modal_button', include('elements/ds-modal-button.php'), $instance, $ds_button );

$ds_modal_error = apply_filters('ds_modal_error', include('elements/ds-modal-error.php'), $instance, $ds_button );

$ds_modal_success = apply_filters('ds_modal_success', include('elements/ds-modal-success.php'), $instance, $ds_button );

echo apply_filters('ds_modal_element', include('elements/ds-modal-element.php'), 
$instance, $ds_button, $ds_modal_name, $ds_billing_element, $ds_shipping_element, $ds_modal_button, $ds_modal_error,
 $ds_modal_success, $ds_company_element, $ds_modal_image );

do_action( 'direct_stripe_after_button', $button_id  );