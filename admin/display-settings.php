<?php //One function for each setting Field value and settings section callback ( sub-title )

defined( 'ABSPATH' ) or die( 'Please!' );

class DirectStripeDisplaySettings {
	
/*****   Live API KEYS   *******/
function direct_stripe_secret_api_key_render() { 

	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
	<input size="35" type='text' name='direct_stripe_general_settings[direct_stripe_secret_api_key]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_secret_api_key'] ); ?>'>
	<?php
}
function direct_stripe_publishable_api_key_render() { 

	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
	<input size="35" type='text' name='direct_stripe_general_settings[direct_stripe_publishable_api_key]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_publishable_api_key'] ); ?>'>
	<?php
}

/***************    Checkbox test or live keys   **************************/
function direct_stripe_checkbox_api_keys_render() { 

	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
	<input type='checkbox' name='direct_stripe_general_settings[direct_stripe_checkbox_api_keys]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_checkbox_api_keys'] ), 1 ); ?> />
	<?php 
}
/********************    Test API Keys  ***************************/
 function direct_stripe_test_secret_api_key_render() { 

	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
	<input size="35" type='text' name='direct_stripe_general_settings[direct_stripe_test_secret_api_key]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_test_secret_api_key'] ); ?>'>
	<?php
}
function direct_stripe_test_publishable_api_key_render() { 

	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
	<input size="35" type='text' name='direct_stripe_general_settings[direct_stripe_test_publishable_api_key]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_test_publishable_api_key'] ); ?>'>
	<?php
}
	
/********************   Currency *********************/
function direct_stripe_currency_render() { 

	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
<select name="direct_stripe_general_settings[direct_stripe_currency]">
    <option value="usd" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "usd"); ?>>USD</option>
    <option value="eur" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "eur"); ?>>EUR</option>
    <option value="gbp" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "gbp"); ?>>GBP</option>
    <option value="aud" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "aud"); ?>>AUD</option>
	  <option value="cad" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "cad"); ?>>CAD</option>
	  <option value="jpy" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "jpy"); ?>>JPY</option>
	  <option value="dkk" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "dkk"); ?>>DKK</option>
	  <option value="nok" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "nok"); ?>>NOK</option>
	  <option value="sek" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "sek"); ?>>SEK</option>
	  <option value="sgd" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "sgd"); ?>>SGD</option>
	  <option value="hkd" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "hkd"); ?>>HKD</option>
	  <option value="chf" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "chf"); ?>>CHF</option>
	  <option value="mxn" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "mxn"); ?>>MXN</option>
	  <option value="brl" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "brl"); ?>>BRL</option>
	  <option value="nzd" <?php selected( esc_attr( $d_stripe_options['direct_stripe_currency'] ), "nzd"); ?>>NZD</option>
 </select>
	<?php
}
	
/************   Redirection pages   ************/
function direct_stripe_success_page_render() { 
	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
	<input type='text' name='direct_stripe_general_settings[direct_stripe_success_page]' value='<?php echo sanitize_title( $d_stripe_options['direct_stripe_success_page'] ); ?>'>
	<?php
}
function direct_stripe_error_page_render() { 
	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
	<input type='text' name='direct_stripe_general_settings[direct_stripe_error_page]' value='<?php echo sanitize_title( $d_stripe_options['direct_stripe_error_page'] ); ?>'>
	<?php
}

/******   Logo/Image loading  ******/
function direct_stripe_logo_render() {	
$d_stripe_options = get_option( 'direct_stripe_general_settings' );

	if( $d_stripe_options['direct_stripe_logo_image'] ) { ?>
<div class="direct-stripe-logo-preview">
	<img src="<?php echo esc_url( $d_stripe_options['direct_stripe_logo_image'] ); ?>" width="100" height="100"/>
</div>
<?php } ?>
	<input type="text" class="ds-media-input"  name="direct_stripe_general_settings[direct_stripe_logo_image]" value="<?php echo esc_url( $d_stripe_options['direct_stripe_logo_image'] ); ?>" /><button class="ds-media-button button"><?php _e('Select image', 'direct-stripe'); ?></button>
<?php 
}

/*********  Checkbox for stylesheet **********/
function direct_stripe_use_custom_styles_render() { 
	$d_stripe_options = get_option( 'direct_stripe_styles_settings' );
	?>
	<input type='checkbox' name='direct_stripe_styles_settings[direct_stripe_use_custom_styles]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_use_custom_styles'] ), 1 ); ?> />
	<?php 
}
//Main button color
function direct_stripe_main_color_style_render() { 
	$d_stripe_options = get_option( 'direct_stripe_styles_settings' );
	?>
	<input type='text' class='direct-stripe-color-field' name='direct_stripe_styles_settings[direct_stripe_main_color_style]' value='<?php echo sanitize_hex_color( $d_stripe_options['direct_stripe_main_color_style'] ); ?>'>
	<?php 
}
//Main button border radius
function direct_stripe_border_radius_render() { 
	$d_stripe_options = get_option( 'direct_stripe_styles_settings' );
	?>
	<input size="1" type='text' class='direct-stripe-border-radius' name='direct_stripe_styles_settings[direct_stripe_border_radius]' value='<?php echo absint( $d_stripe_options['direct_stripe_border_radius'] ); ?>'>
	<span><?php _e('px', 'direct-stripe'); ?></span>
	<?php 
}
/*********  Checkbox for T&C **********/
function direct_stripe_tc_checkbox_render() { 
	$d_stripe_options = get_option( 'direct_stripe_styles_settings' );
	?>
	<input type='checkbox' name='direct_stripe_styles_settings[direct_stripe_use_tc_checkbox]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_use_tc_checkbox'] ), 1 ); ?> />
	<?php 
}
/*********  Text for T&C **********/
function direct_stripe_tc_text_render() { 
	$d_stripe_options = get_option( 'direct_stripe_styles_settings' );
	?>
	<input size="50" type='text' name='direct_stripe_styles_settings[direct_stripe_tc_text]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_tc_text'] ); ?>'>
	<?php
}
/*********  Link Text for T&C **********/
function direct_stripe_tc_link_text_render() { 
	$d_stripe_options = get_option( 'direct_stripe_styles_settings' );
	?>
	<input size="50" type='text' name='direct_stripe_styles_settings[direct_stripe_tc_link_text]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_tc_link_text'] ); ?>'>
	<?php
}
/*********  Target Page for T&C **********/
function direct_stripe_tc_link_render() { 
	$d_stripe_options = get_option( 'direct_stripe_styles_settings' );
	?>
	<input type='text' name='direct_stripe_styles_settings[direct_stripe_tc_link]' value='<?php echo sanitize_text_field( $d_stripe_options['direct_stripe_tc_link'] ); ?>'>
	<?php
}

/*********  Checkbox admin emails **********/
function direct_stripe_admin_emails_checkbox_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
	<input type='checkbox' name='direct_stripe_emails_settings[direct_stripe_admin_emails_checkbox]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_admin_emails_checkbox'] ), 1 ); ?> />
	<?php 
}
/*********  Admin Email subject **********/
function direct_stripe_admin_email_subject_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
	<input size="50" type='text' name='direct_stripe_emails_settings[direct_stripe_admin_email_subject]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_admin_email_subject'] ); ?>'>
	<?php
}
/********* Admin email content **********/
function direct_stripe_admin_email_content_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
<textarea name='direct_stripe_emails_settings[direct_stripe_admin_email_content]'><?php echo sanitize_text_field( $d_stripe_options['direct_stripe_admin_email_content'] ); ?></textarea>
	<?php
}

/*********  Checkbox user emails **********/
function direct_stripe_user_emails_checkbox_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
	<input type='checkbox' name='direct_stripe_emails_settings[direct_stripe_user_emails_checkbox]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_user_emails_checkbox'] ), 1 ); ?> />
	<?php 
}
/*********  User Email subject **********/
function direct_stripe_user_email_subject_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
	<input size="50" type='text' name='direct_stripe_emails_settings[direct_stripe_user_email_subject]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_user_email_subject'] ); ?>'>
	<?php
}
/********* User email content **********/
function direct_stripe_user_email_content_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
<textarea name='direct_stripe_emails_settings[direct_stripe_user_email_content]'><?php echo sanitize_text_field( $d_stripe_options['direct_stripe_user_email_content'] ); ?></textarea>
	<?php
}


//*****************************************    ERROR Emails   *******************************/
/*********  Checkbox error admin emails **********/
function direct_stripe_admin_error_emails_checkbox_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
	<input type='checkbox' name='direct_stripe_emails_settings[direct_stripe_admin_error_emails_checkbox]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_admin_error_emails_checkbox'] ), 1 ); ?> />
	<?php 
}
/*********  Admin error Email subject **********/
function direct_stripe_admin_error_email_subject_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
	<input size="50" type='text' name='direct_stripe_emails_settings[direct_stripe_admin_error_email_subject]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_admin_error_email_subject'] ); ?>'>
	<?php
}
/********* Admin error email content **********/
function direct_stripe_admin_error_email_content_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
<textarea name='direct_stripe_emails_settings[direct_stripe_admin_error_email_content]'><?php echo esc_html( $d_stripe_options['direct_stripe_admin_error_email_content'] ); ?></textarea>
	<?php
}

/*********  Checkbox error user emails **********/
function direct_stripe_user_error_emails_checkbox_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
	<input type='checkbox' name='direct_stripe_emails_settings[direct_stripe_user_error_emails_checkbox]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_user_error_emails_checkbox'] ), 1 ); ?> />
	<?php 
}
/*********  User error Email subject **********/
function direct_stripe_user_error_email_subject_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
	<input size="50" type='text' name='direct_stripe_emails_settings[direct_stripe_user_error_email_subject]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_user_error_email_subject'] ); ?>'>
	<?php
}
/********* User error email content **********/
function direct_stripe_user_error_email_content_render() { 
	$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
	?>
<textarea name='direct_stripe_emails_settings[direct_stripe_user_error_email_content]'><?php echo esc_html( $d_stripe_options['direct_stripe_user_error_email_content'] ); ?></textarea>
	<?php
}
	
	//Settings sections callbacks
public function direct_stripe_api_section_callback() { 
	echo __( 'Stripe API keys', 'direct-stripe' );
}
public function direct_stripe_redirections_section_callback(  ) { 
	echo __( 'Pages after success payment or error (enter only page slug) ', 'direct-stripe' );
}
public function direct_stripe_logo_section_callback() { 
	echo __( 'Set image for Stripe\'s modal form', 'direct-stripe' );
}
public function direct_stripe_tc_section_callback() { ?>
	<span class="direct-stripe-avert"><?php echo __( 'Only used with custom button styles enabled', 'direct-stripe' ); ?></span>
<?php }
public function direct_stripe_admin_emails_section_callback() { 
	echo __( 'Emails sent to WordPress system email address', 'direct-stripe' );
}
public function direct_stripe_user_emails_section_callback() { 
	echo __( 'Emails sent to Stripe user email address', 'direct-stripe' );
}
public function direct_stripe_admin_error_emails_section_callback() { 
	echo __( 'Emails sent to WordPress system email address', 'direct-stripe' );
}
public function direct_stripe_user_error_emails_section_callback() { 
	echo __( 'Emails sent to Stripe user email address', 'direct-stripe' );
}
	
//Settings validation
public function direct_stripe_settings_validation( $input ) {
	// Create our array for storing the validated options
    $output = array();    
    // Loop through each of the incoming options
    foreach( $input as $key => $value ) {       
        // Check to see if the current option has a value. If so, process it.
        if( isset( $input[$key] ) ) {    
            // Strip all HTML and PHP tags and properly handle quoted strings
            $output[$key] = strip_tags( stripslashes( $input[ $key ] ) );        
        }    
    }
    return apply_filters( array($this, 'direct_stripe_settings_validation'), $output, $input );
}
} //End Class DirectStripeDisplaySettings