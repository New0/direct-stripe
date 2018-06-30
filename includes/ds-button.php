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
$str_before = apply_filters( 'direct_stripe_div_before', $str_before, $ds_button->button_id, $ds_class );
echo $str_before;

    //Donation condition and input
    if(  isset( $ds_button->type ) && $ds_button->type === 'donation' ) {
        $direct_stripe_donation_input = '<input type="number" name="donationvalue" id="donationvalue" data-donation-input-id="' . $instance . '" />';
       echo apply_filters('direct_stripe_donation_input', $direct_stripe_donation_input  );
     }
     ?>

    <?php //Custom styles button conditions
    if( isset($d_stripe_styles['direct_stripe_use_custom_styles']) && $d_stripe_styles['direct_stripe_use_custom_styles'] === '1' ) {
	    $ds_button_class = 'direct-stripe-button direct-stripe-button-id ';
    } elseif( isset($d_stripe_styles['direct_stripe_use_custom_styles']) && $d_stripe_styles['direct_stripe_use_custom_styles'] === '2' ) {
	    $ds_button_class = 'original-stripe-button direct-stripe-button-id ';
     } else {
        $ds_button_class = 'stripe-button-ds direct-stripe-button-id ';
     }
    //T&C Check box condition
    if( isset($ds_button->tc ) && $ds_button->tc === true || isset($d_stripe_styles['direct_stripe_use_tc_checkbox']) && $d_stripe_styles['direct_stripe_use_tc_checkbox'] === true && isset( $ds_button->tc ) && $ds_button->tc !== false ) {
        $ds_button_class .= ' ds-check-tc';
    }
    if(  isset( $ds_button->type ) && $ds_button->type === 'donation' ) {
        $ds_button_class .= ' ds-check-donation';
    }
    //Button Class
    $ds_button_class = apply_filters('direct_stripe_button_class', $ds_button_class );

    //Button ID
    if ( !empty( $ds_button->button_id ) ) {
        $button_id = $ds_button->button_id;
    } else {
        $button_id = $instance;
    }

    //Allowed HTML For Button
    $allowed_html = array(
        'a' => array(
            'href' => array(),
            'title' => array(),
            'id'    =>  array(),
            'class' =>     array()
        ),
        'img'  => array(
            'href' => array(),
            'alt' => array(),
            'id'    =>  array(),
            'class' =>     array()
        ),
        'button'    =>  array(
            'data-id' => array(),
            'id'    =>  array(),
            'class' =>     array(),
            'data'  =>  array()
        ),
        'div'  => array(
            'data-id' => array(),
            'id'    =>  array(),
            'class' =>     array(),
            'data'  =>  array()
        ),
        'span'    =>  array(
            'data-id' => array(),
            'id'    =>  array(),
            'class' =>     array(),
            'data'  =>  array()
        ),
        'br' => array(),
        'em' => array(),
        'strong' => array(),
    );
    $allowed_html = apply_filters( 'direct-stripe_div_before', $allowed_html );

    //Button
    $button = '<button id="' . $button_id . '" data-id="' . $instance . '" class="' . $ds_button_class . $instance . '">' . esc_attr( $ds_button->label ) . '</button>';
    $button = apply_filters( 'direct_stripe_button', $button, $instance, $button_id, $ds_button_class);
    echo $button;

    //T&C Check box condition
    if( isset( $ds_button->tc ) && $ds_button->tc === true || isset($d_stripe_styles['direct_stripe_use_tc_checkbox']) && $d_stripe_styles['direct_stripe_use_tc_checkbox'] === true && isset( $ds_button->tc ) && $ds_button->tc !== false ) { ?>
        <br/><input type="checkbox" class="ds-conditions" id="ds-conditions-<?php echo $instance; ?>" required/>
        <label for="conditions">
        <?php echo esc_attr($d_stripe_styles['direct_stripe_tc_text']); ?>
            <a target="_blank" href="<?php echo esc_url($d_stripe_styles['direct_stripe_tc_link']); ?>"><?php  echo $d_stripe_styles['direct_stripe_tc_link_text']; ?></a>
        </label><br />
    <?php }

//Closing Div
$str_after = "</div>";
$str_after = apply_filters( 'direct_stripe_div_after', $str_after, $button_id );
echo $str_after;

do_action( 'direct_stripe_after_button' );