<?php //One function for each setting Field value and settings section callback ( sub-title )

defined( 'ABSPATH' ) or die( 'Please!' );

class DirectStripeDisplaySettings {
	
	/*****   Live API KEYS   *******/

	function direct_stripe_publishable_api_key_render() {

	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
		<input size="35" type='text' name='direct_stripe_general_settings[direct_stripe_publishable_api_key]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_publishable_api_key'] ); ?>'>
	<?php
	}
	
	function direct_stripe_secret_api_key_render() {
		
		$d_stripe_options = get_option( 'direct_stripe_general_settings' );
		?>
        <input size="35" type='text' name='direct_stripe_general_settings[direct_stripe_secret_api_key]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_secret_api_key'] ); ?>'>
		<?php
	}

	/***************    Checkbox for test keys   **************************/
	function direct_stripe_checkbox_api_keys_render() {

	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
		<input type='checkbox' name='direct_stripe_general_settings[direct_stripe_checkbox_api_keys]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_checkbox_api_keys'] ), 1 ); ?> />
		<div class="direct-stripe-test-card-number"><?php _e('Visa card test number 4242 4242 4242 4242', 'direct-stripe'); ?></div>
		<div class="direct-stripe-test-card-infos"><?php _e('With any exp date and 3 CVV numbers', 'direct-stripe'); ?></div>
	<?php
	}

	/********************    Test API Keys  ***************************/
	function direct_stripe_test_publishable_api_key_render() {

	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
		<input size="35" type='text' name='direct_stripe_general_settings[direct_stripe_test_publishable_api_key]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_test_publishable_api_key'] ); ?>'>
	<?php
	}
	function direct_stripe_test_secret_api_key_render() {
		
		$d_stripe_options = get_option( 'direct_stripe_general_settings' );
		?>
        <input size="35" type='text' name='direct_stripe_general_settings[direct_stripe_test_secret_api_key]' value='<?php echo esc_attr( $d_stripe_options['direct_stripe_test_secret_api_key'] ); ?>'>
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
    /*************** Success error messages ***********/

    /********* Success ajax message **********/
    function direct_stripe_success_message_render() {
        $d_stripe_options = get_option( 'direct_stripe_general_settings' );

        $settings_success_message_content = array(
            'wpautop'       => true,
            'media_buttons' => false,
            'textarea_name' => 'direct_stripe_general_settings[direct_stripe_success_message]',
            'textarea_rows' => 10
        );

        if( !empty( $d_stripe_options['direct_stripe_success_message'] ) ) {
            $initial_success_content = $d_stripe_options['direct_stripe_success_message'];
        } else {
            $initial_success_content = __('Successful transaction', 'direct-stripe');
        }

        wp_editor( $initial_success_content, 'direct_stripe_success_message', $settings_success_message_content);

    }
    /********* Error ajax message **********/
    function direct_stripe_error_message_render() {
        $d_stripe_options = get_option( 'direct_stripe_general_settings' );

        $settings_error_message_content = array(
            'wpautop'       => true,
            'media_buttons' => false,
            'textarea_name' => 'direct_stripe_general_settings[direct_stripe_error_message]',
            'textarea_rows' => 10
        );

        if( !empty( $d_stripe_options['direct_stripe_error_message'] ) ) {
            $initial_error_content = $d_stripe_options['direct_stripe_error_message'];
        } else {
            $initial_error_content = __('Something went wrong...', 'direct-stripe');
        }

        wp_editor( $initial_error_content, 'direct_stripe_error_message', $settings_error_message_content);

    }

    /********   Checkbox to use redirections pages  *************/
    function direct_stripe_use_redirections_render() {

        $d_stripe_options = get_option( 'direct_stripe_general_settings' );
        ?>
        <input type='checkbox' name='direct_stripe_general_settings[direct_stripe_use_redirections]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_use_redirections'] ), 1 ); ?> />
        <?php
    }
	/************   Redirection pages   ************/
	function direct_stripe_success_page_render() {
	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
		<select name="direct_stripe_general_settings[direct_stripe_success_page]">
			<?php
			if( $pages = get_pages() ){ ?>
				<option value="<?php _e('Select success page', 'direct-stripe'); ?>" selected><?php _e('Select success page', 'direct-stripe'); ?></option>
				<?php	foreach( $pages as $page ){
					$selected = ($d_stripe_options['direct_stripe_success_page'] == $page->ID) ? "selected" : ""; ?>
					<option value="<?php echo $page->ID; ?>" <?php echo $selected; ?>><?php echo $page->post_title; ?></option>
				<?php }
			}
			?>
		</select>
	<?php
	}
	function direct_stripe_error_page_render() {
	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
		<select name="direct_stripe_general_settings[direct_stripe_error_page]">
				<?php
				if( $pages = get_pages() ){ ?>
					<option value="<?php _e('Select error page', 'direct-stripe'); ?>" selected><?php _e('Select error page', 'direct-stripe'); ?></option>
					<?php	foreach( $pages as $page ){
						$selected = ($d_stripe_options['direct_stripe_error_page'] == $page->ID) ? "selected" : ""; ?>
						<option value="<?php echo $page->ID; ?>" <?php echo $selected; ?>><?php echo $page->post_title; ?></option>
					<?php }
				}
				?>
		</select>
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
	/***************    Checkbox for billing informations   **************************/
	function direct_stripe_billing_infos_checkbox_render() {
	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
		<input type='checkbox' name='direct_stripe_general_settings[direct_stripe_billing_infos_checkbox]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_billing_infos_checkbox'] ), 1 ); ?> />
	<?php
	}
	/***************    Checkbox for shipping informations   **************************/
	function direct_stripe_shipping_infos_checkbox_render() {
	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
		<input type='checkbox' name='direct_stripe_general_settings[direct_stripe_shipping_infos_checkbox]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_shipping_infos_checkbox'] ), 1 ); ?> />
	<?php
	}
	/***************    Checkbox for remember me option *************************/
	function direct_stripe_rememberme_option_checkbox_render() {
	$d_stripe_options = get_option( 'direct_stripe_general_settings' );
	?>
		<input type='checkbox' name='direct_stripe_general_settings[direct_stripe_rememberme_option_checkbox]' value='1' <?php checked( isset ( $d_stripe_options['direct_stripe_rememberme_option_checkbox'] ), 1 ); ?> />
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
		<select name="direct_stripe_styles_settings[direct_stripe_tc_link]">
			<?php
			if( $pages = get_pages() ){ ?>
				<option value="<?php _e('Select T&C page', 'direct-stripe'); ?>" selected><?php _e('Select T&C page', 'direct-stripe'); ?></option>
				<?php	foreach( $pages as $page ){
					$selected = ($d_stripe_options['direct_stripe_tc_link'] == $page->ID) ? "selected" : ""; ?>
					<option value="<?php echo $page->ID; ?>" <?php echo $selected; ?>><?php echo $page->post_title; ?></option>
				<?php }
			}
			?>
		</select>
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

		$settings_admin_email_content = array(
			'wpautop'       => true,
			'media_buttons' => false,
			'textarea_name' => 'direct_stripe_emails_settings[direct_stripe_admin_email_content]',
			'textarea_rows' => 10
		);

		wp_editor( $d_stripe_options['direct_stripe_admin_email_content'], 'direct_stripe_admin_email_content', $settings_admin_email_content);
		?>
		<!-- <textarea name='direct_stripe_emails_settings[direct_stripe_admin_email_content]'><?php echo sanitize_text_field( $d_stripe_options['direct_stripe_admin_email_content'] ); ?></textarea>-->
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
		<?php
		$settings_user_email_content = array(
			'wpautop'       => true,
			'media_buttons' => false,
			'textarea_name' => 'direct_stripe_emails_settings[direct_stripe_user_email_content]',
			'textarea_rows' => 10
		);

		wp_editor( $d_stripe_options['direct_stripe_user_email_content'], 'direct_stripe_user_email_content', $settings_user_email_content);
		?>
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
		<?php
		$settings_admin_error_content = array(
			'wpautop'       => true,
			'media_buttons' => false,
			'textarea_name' => 'direct_stripe_emails_settings[direct_stripe_admin_error_email_content]',
			'textarea_rows' => 10
		);

		wp_editor( $d_stripe_options['direct_stripe_admin_error_email_content'], 'direct_stripe_admin_error_email_content', $settings_admin_error_content);
		?>
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
		<?php
		$settings_user_error_content = array(
			'wpautop'       => true,
			'media_buttons' => false,
			'textarea_name' => 'direct_stripe_emails_settings[direct_stripe_user_error_email_content]',
			'textarea_rows' => 10
		);

		wp_editor( $d_stripe_options['direct_stripe_user_error_email_content'] , 'direct_stripe_user_error_email_content', $settings_user_error_content);
		?>
	<?php
	}
	
	//Settings sections callbacks
	public function direct_stripe_api_section_callback() {
		_e( 'Stripe API keys', 'direct-stripe' );
	}
    public function direct_stripe_success_error_section_callback(  ) {
        _e( 'Messages to print when transactions completed', 'direct-stripe' );
    }
	public function direct_stripe_redirections_section_callback(  ) {
		_e( 'Use check box to use redirections', 'direct-stripe' );
	}
	public function direct_stripe_logo_section_callback() {
		_e( 'Set image for Stripe\'s modal form', 'direct-stripe' );
	}
	public function direct_stripe_tc_section_callback() {
	    _e( 'Set up T&C options', 'direct-stripe' );
	}
	public function direct_stripe_admin_emails_section_callback() {
		_e( 'Emails sent to WordPress system email address', 'direct-stripe' );
	}
	public function direct_stripe_user_emails_section_callback() {
		_e( 'Emails sent to Stripe user email address', 'direct-stripe' );
	}
	public function direct_stripe_admin_error_emails_section_callback() {
		_e( 'Emails sent to WordPress system email address', 'direct-stripe' );
	}
	public function direct_stripe_user_error_emails_section_callback() {
		_e( 'Emails sent to Stripe user email address', 'direct-stripe' );
	}
	public function direct_stripe_billing_infos_section_callback() {
		_e( 'Name, Address, City, Zip code and country will be collected before payment', 'direct-stripe' );
	}
	public function direct_stripe_styles_section_callback() {
		_e( 'Check to use custom button', 'direct-stripe' );
	}
	public function direct_stripe_currency_section_callback() {
		_e( 'Set your Stripe\'s account currency', 'direct-stripe' );
	}

//Settings validation
	public function direct_stripe_general_settings_validation( $input ) {
		//Texts
		if( isset($input['direct_stripe_secret_api_key']) && !empty($input['direct_stripe_secret_api_key']) ) {
			$input['direct_stripe_secret_api_key'] = wp_filter_nohtml_kses( $input['direct_stripe_secret_api_key'] );
		}
		if( isset($input['direct_stripe_publishable_api_key']) && !empty($input['direct_stripe_publishable_api_key']) ) {
			$input['direct_stripe_publishable_api_key'] = wp_filter_nohtml_kses( $input['direct_stripe_publishable_api_key'] );
		}
		if( isset($input['direct_stripe_test_secret_api_key']) && !empty($input['direct_stripe_test_secret_api_key']) ) {
			$input['direct_stripe_test_secret_api_key'] = wp_filter_nohtml_kses( $input['direct_stripe_test_secret_api_key'] );
		}
		if( isset($input['direct_stripe_test_publishable_api_key']) && !empty($input['direct_stripe_test_publishable_api_key']) ) {
			$input['direct_stripe_test_publishable_api_key'] = wp_filter_nohtml_kses( $input['direct_stripe_test_publishable_api_key'] );
		}
		if( isset($input['direct_stripe_currency']) && !empty($input['direct_stripe_currency']) ) {
			$input['direct_stripe_currency'] = wp_filter_nohtml_kses( $input['direct_stripe_currency'] );
		}
		if( isset($input['direct_stripe_success_page']) && !empty($input['direct_stripe_success_page']) ) {
			$input['direct_stripe_success_page'] = wp_filter_nohtml_kses( $input['direct_stripe_success_page'] );
		}
		if( isset($input['direct_stripe_error_page']) && !empty($input['direct_stripe_error_page']) ) {
			$input['direct_stripe_error_page'] = wp_filter_nohtml_kses( $input['direct_stripe_error_page'] );
		}
		//url
		if( isset($input['direct_stripe_logo_image']) && !empty($input['direct_stripe_logo_image']) ) {
			$input['direct_stripe_logo_image'] = esc_url_raw( $input['direct_stripe_logo_image'] );
		}
		// Make sure isauthorized is only true or false (0 or 1)
		if( isset($input['direct_stripe_checkbox_api_keys']) && !empty($input['direct_stripe_checkbox_api_keys']) ) {
			$input['direct_stripe_checkbox_api_keys'] = '1';
		}
		if( isset($input['direct_stripe_billing_infos_checkbox']) && !empty($input['direct_stripe_billing_infos_checkbox']) ) {
			$input['direct_stripe_billing_infos_checkbox'] = '1';
		}
		return $input;
	}
	public function direct_stripe_styles_settings_validation( $input ) {
		//Texts
		if( isset($input['direct_stripe_main_color-style']) && !empty($input['direct_stripe_main_color-style']) ) {
			$input['direct_stripe_main_color-style'] = wp_filter_nohtml_kses( $input['direct_stripe_main_color-style'] );
		}
		if( isset($input['direct_stripe_border_radius']) && !empty($input['direct_stripe_border_radius']) ) {
			$input['direct_stripe_border_radius'] = wp_filter_nohtml_kses( $input['direct_stripe_border_radius'] );
		}
		if( isset($input['direct_stripe_tc_text']) && !empty($input['direct_stripe_tc_text']) ) {
			$input['direct_stripe_tc_text'] = wp_filter_nohtml_kses( $input['direct_stripe_tc_text'] );
		}
		if( isset($input['direct_stripe_tc_link_text']) && !empty($input['direct_stripe_tc_link_text']) ) {
			$input['direct_stripe_tc_link_text'] = wp_filter_nohtml_kses( $input['direct_stripe_tc_link_text'] );
		}
		//slug
		if( isset($input['direct_stripe_tc_link']) && !empty($input['direct_stripe_tc_link']) ) {
			$input['direct_stripe_tc_link'] = sanitize_title( $input['direct_stripe_tc_link'] );
		}
		// Make sure isauthorized is only true or false (0 or 1)
		if( isset($input['direct_stripe_use_custom_styles']) && !empty($input['direct_stripe_use_custom_styles']) ) {
			$input['direct_stripe_use_custom_styles'] = '1';
		}
		if( isset($input['direct_stripe_use_tc_checkbox']) && !empty($input['direct_stripe_use_tc_checkbox']) ) {
			$input['direct_stripe_use_tc_checkbox'] = '1';
		}
		
		return $input;
	}
	public function direct_stripe_emails_settings_validation( $input ) {
		$allowed_tags = wp_kses_allowed_html( 'post' );
		//Texts
		if( isset($input['direct_stripe_admin_email_subject']) && !empty($input['direct_stripe_admin_email_subject']) ) {
			$input['direct_stripe_admin_email_subject'] = wp_filter_nohtml_kses( $input['direct_stripe_admin_email_subject'] );
		}
		if( isset($input['direct_stripe_admin_email_content']) && !empty($input['direct_stripe_admin_email_content']) ) {
			$input['direct_stripe_admin_email_content'] = wp_kses( $input['direct_stripe_admin_email_content'], $allowed_tags );
		}
		if( isset($input['direct_stripe_user_email_subject']) && !empty($input['direct_stripe_user_email_subject']) ) {
			$input['direct_stripe_user_email_subject'] = wp_filter_nohtml_kses( $input['direct_stripe_user_email_subject'] );
		}
		if( isset($input['direct_stripe_user_email_content']) && !empty($input['direct_stripe_user_email_content']) ) {
			$input['direct_stripe_user_email_content'] = wp_kses( $input['direct_stripe_user_email_content'], $allowed_tags);
		}
		if( isset($input['direct_stripe_admin_error_email_subject']) && !empty($input['direct_stripe_admin_error_email_subject']) ) {
			$input['direct_stripe_admin_error_email_subject'] = wp_filter_nohtml_kses( $input['direct_stripe_admin_error_email_subject'] );
		}
		if( isset($input['direct_stripe_admin_error_email_content']) && !empty($input['direct_stripe_admin_error_email_content']) ) {
			$input['direct_stripe_admin_error_email_content'] = wp_kses( $input['direct_stripe_admin_error_email_content'], $allowed_tags );
		}
		if( isset($input['direct_stripe_user_error_email_subject']) && !empty($input['direct_stripe_user_error_email_subject']) ) {
			$input['direct_stripe_user_error_email_subject'] = wp_filter_nohtml_kses( $input['direct_stripe_user_error_email_subject'] );
		}
		if( isset($input['direct_stripe_user_error_email_content']) && !empty($input['direct_stripe_user_error_email_content']) ) {
			$input['direct_stripe_user_error_email_content'] = wp_kses( $input['direct_stripe_user_error_email_content'], $allowed_tags );
		}
		// Make sure isauthorized is only true or false (0 or 1)
		if( isset($input['direct_stripe_admin_emails_checkbox']) && !empty($input['direct_stripe_admin_emails_checkbox']) ) {
			$input['direct_stripe_admin_emails_checkbox'] = '1';
		}
		if( isset($input['direct_stripe_user_emails_checkbox']) && !empty($input['direct_stripe_user_emails_checkbox']) ) {
			$input['direct_stripe_user_emails_checkbox'] = '1';
		}
		if( isset($input['direct_stripe_admin_error_emails_checkbox']) && !empty($input['direct_stripe_admin_error_emails_checkbox']) ) {
			$input['direct_stripe_admin_error_emails_checkbox'] = '1';
		}
		if( isset($input['direct_stripe_user_error_emails_checkbox']) && !empty($input['direct_stripe_user_error_emails_checkbox']) ) {
			$input['direct_stripe_user_error_emails_checkbox'] = '1';
		}
		
		return $input;
	}


} //End Class DirectStripeDisplaySettings
