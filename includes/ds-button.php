<?php
// Shortcode output
do_action( 'direct_stripe_before_form' );
do_action( 'direct_stripe_before_button' );

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

?>
<div class="direct-stripe">
    <?php //Donation condition and input
    if(  isset( $ds_button->type ) && $ds_button->type === 'donation' ) {
        $direct_stripe_donation_input = '<input type="number" name="donationvalue" id="donationvalue" data-donation-input-id="' . $instance . '" />';
       echo apply_filters('direct_stripe_donation_input', $direct_stripe_donation_input  );
     }
     ?>

    <?php //Custom styles button conditions
    if( isset($d_stripe_styles['direct_stripe_use_custom_styles']) && $d_stripe_styles['direct_stripe_use_custom_styles'] === '1' ) {
	    $ds_button_class = 'direct-stripe-button';
    } elseif( isset($d_stripe_styles['direct_stripe_use_custom_styles']) && $d_stripe_styles['direct_stripe_use_custom_styles'] === '2' ) {
	    $ds_button_class = 'original-stripe-button';
     } else {
        $ds_button_class = 'stripe-button-ds';
     }
    //T&C Check box condition
    if( isset($ds_button->tc ) && $ds_button->tc === true || isset($d_stripe_styles['direct_stripe_use_tc_checkbox']) && $d_stripe_styles['direct_stripe_use_tc_checkbox'] === true && isset( $ds_button->tc ) && $ds_button->tc !== false ) {
        $ds_button_class .= ' ds-check-tc';
    }
    if(  isset( $ds_button->type ) && $ds_button->type === 'donation' ) {
        $ds_button_class .= ' ds-check-donation';
    }
        $ds_button_class = apply_filters('direct_stripe_button_class', $ds_button_class );
    ?>

    <button <?php if ( !empty( $ds_button->button_id ) ) { ?>id="<?php echo $ds_button->button_id; ?>"<?php } ?> data-id="<?php echo $instance; ?>" class="<?php echo $ds_button_class; ?> direct-stripe-button-id <?php echo $instance; ?>"><?php echo esc_attr( $ds_button->label ); ?></button>

        <?php //T&C Check box condition
        if( isset( $ds_button->tc ) && $ds_button->tc === true || isset($d_stripe_styles['direct_stripe_use_tc_checkbox']) && $d_stripe_styles['direct_stripe_use_tc_checkbox'] === true && isset( $ds_button->tc ) && $ds_button->tc !== false ) { ?>
            <br/><input type="checkbox" class="ds-conditions" id="ds-conditions-<?php echo $instance; ?>" required/>
            <label for="conditions">
            <?php echo esc_attr($d_stripe_styles['direct_stripe_tc_text']); ?>
                <a target="_blank" href="<?php echo get_permalink($d_stripe_styles['direct_stripe_tc_link']); ?>"><?php  echo $d_stripe_styles['direct_stripe_tc_link_text']; ?></a>
            </label><br />
        <?php } ?>
</div>