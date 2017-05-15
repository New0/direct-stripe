<?php
// Shortcode output
do_action( 'direct_stripe_before_form' );
do_action( 'direct_stripe_before_button' );

?>
<div class="direct-stripe">
    <?php //Donation condition and input
    if(  isset($directStripeAttrValues['type']) && $directStripeAttrValues['type'] === 'donation' ) {
        $direct_stripe_donation_input = '<input type="number" name="donationvalue" id="donationvalue" />';
       echo apply_filters('direct_stripe_donation_input', $direct_stripe_donation_input  );
     }
     ?>

    <?php //Custom styles button conditions
    if( isset($d_stripe_styles['direct_stripe_use_custom_styles']) && $d_stripe_styles['direct_stripe_use_custom_styles'] === '1' ) {
        $ds_button_class = 'direct-stripe-button';
     } else {
        $ds_button_class = 'stripe-button-ds';
     }
    //T&C Check box condition
    if( isset($directStripeAttrValues['tc']) && $directStripeAttrValues['tc'] === 'true' || isset($d_stripe_styles['direct_stripe_use_tc_checkbox']) && $d_stripe_styles['direct_stripe_use_tc_checkbox'] === '1' && isset($directStripeAttrValues['tc']) && $directStripeAttrValues['tc'] !== 'false' ) {
        $ds_button_class .= ' ds-check-tc';
    }
    if(  isset($directStripeAttrValues['type']) && $directStripeAttrValues['type'] === 'donation' ) {
        $ds_button_class .= ' ds-check-donation';
    }
        $ds_button_class = apply_filters('direct_stripe_button_class', $ds_button_class );
    ?>

    <button data-id="<?php echo $instance; ?>" class="<?php echo $ds_button_class; ?> direct-stripe-button-id <?php echo $instance; ?>"><?php echo esc_attr($directStripeAttrValues['label']); ?></button>

        <?php //T&C Check box condition
        if( isset($directStripeAttrValues['tc']) && $directStripeAttrValues['tc'] === 'true' || isset($d_stripe_styles['direct_stripe_use_tc_checkbox']) && $d_stripe_styles['direct_stripe_use_tc_checkbox'] === '1' && isset($directStripeAttrValues['tc']) && $directStripeAttrValues['tc'] !== 'false' ) { ?>
            <br/><input type="checkbox" class="ds-conditions" id="ds-conditions-<?php echo $instance; ?>" required/>
            <label for="conditions">
            <?php echo esc_attr($d_stripe_styles['direct_stripe_tc_text']); ?>
                <a target="_blank" href="<?php echo get_permalink($d_stripe_styles['direct_stripe_tc_link']); ?>"><?php  echo $d_stripe_styles['direct_stripe_tc_link_text']; ?></a>
            </label><br />
        <?php } ?>
</div>