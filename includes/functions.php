<?php
class DirectStripeFunctions {

//Add Stripe user role on plugin activation
	function direct_stripe_user_roles_on_activation() {
		add_role( 'stripe-user', __('Stripe user', 'direct-stripe'), array( 'read' => true ));
	}
//Languages support
	function direct_stripe_load_textdomain() {
		load_plugin_textdomain('direct-stripe', false, dirname( DSCORE_BASENAME ) . '/languages' );
	}
	
	/**
	 * Admin Scripts & Styles
	 */
	function direct_stripe_load_admin_scripts( $hook ) {
		
		wp_enqueue_style( 'direct-stripe-shortcode-button', DSCORE_URL . 'admin/css/ds-shortcode-button.css', false );
		
		global $direct_stripe_page;
		if( $hook != $direct_stripe_page )
			return;
		
		wp_enqueue_style('direct-stripe-admin', DSCORE_URL . 'admin/css/ds-admin.css');
		wp_enqueue_media();
		wp_enqueue_style('wp-color-picker');
		wp_enqueue_script('direct-stripe-image-script', DSCORE_URL . 'admin/js/ds-script.js', array('jquery', 'wp-color-picker'), false, true );
		wp_localize_script('direct-stripe-image-script', 'direct_stripe_image_script_vars', array(
				'title' => __('Logo for Stripe Form', 'direct-stripe'),
				'message' => __('Use selected image', 'direct-stripe')
			)
		);
	}


// Shortcode
	public function direct_stripe_buttons_func( $atts ) {
		$d_stripe_general = get_option( 'direct_stripe_general_settings' );
		$d_stripe_styles = get_option( 'direct_stripe_styles_settings' );
		$ds_nonce = wp_create_nonce  ('direct-stripe-nonce');
		//Variables globales pour feuille de style custom
		$sitename = get_bloginfo('name');
		$description = get_bloginfo('description');
		$directStripeAttrValues = shortcode_atts( array(
			'name' 			=>	$sitename,
			'amount' 		=>	'',
			'description' 		=>	$description,
			'label' 		=>	__('Pay with card', 'direct-stripe'),
			'panellabel' 		=>	__('Pay', 'direct-stripe'),
			'type' 			=>	'payment',
			'locale' 		=>	'auto',
			'coupon' 		=>	'',
			'setup_fee'		=>	'',
			'capture'		=>	'true',
			'display_amount'	=> 	'',
			'currency'		=> 	'',
			'success_query'		=> 	'',
			'error_query'		=> 	'',
			'success_url'		=>	'',
			'error_url'		=>	'',
			'button_id'		=>	'',
			'user_role'          	=>  	''
		), $atts, 'directstripe' );
		
		//Useful to print the amount in the modal form
		$original_amount = $directStripeAttrValues['amount'];
		
		//Encryprion of the amount and query args
		if( !empty( $directStripeAttrValues['amount']) ) {
			$directStripeAttrValues['amount'] = urlencode_deep( base64_encode($directStripeAttrValues['amount']) );
		}
		if(  !empty($directStripeAttrValues['success_query']) ) {
			$directStripeAttrValues['success_query'] = urlencode_deep( base64_encode($directStripeAttrValues['success_query']) );
		}
		if(  !empty($directStripeAttrValues['error_query']) ) {
			$directStripeAttrValues['error_query'] = urlencode_deep( base64_encode($directStripeAttrValues['error_query']) );
		}
		if( !empty( $directStripeAttrValues['success_url']) ) {
			$directStripeAttrValues['success_url'] = urlencode_deep( base64_encode($directStripeAttrValues['success_url']) );
		}
		if( !empty( $directStripeAttrValues['error_url']) ) {
			$directStripeAttrValues['error_url'] = urlencode_deep( base64_encode($directStripeAttrValues['error_url']) );
		}
		
		// the query var and its value
		$params = array(
			'direct-stripe'     	=> $directStripeAttrValues['type'],
			'amount' 		=> $directStripeAttrValues['amount'],
			'coupon' 		=> $directStripeAttrValues['coupon'],
			'setup_fee' 		=> $directStripeAttrValues['setup_fee'],
			'capture' 		=> $directStripeAttrValues['capture'],
			'description'		=> $directStripeAttrValues['description'],
			'currency' 		=> $directStripeAttrValues['currency'],
			'success_query'	    	=> $directStripeAttrValues['success_query'],
			'error_query'		=> $directStripeAttrValues['error_query'],
			'success_url'		=> $directStripeAttrValues['success_url'],
			'error_url'		=> $directStripeAttrValues['error_url'],
			'button_id'		=> $directStripeAttrValues['button_id'],
			'user_role'          	=> $directStripeAttrValues['user_role'],
			'ds-nonce'		=> $ds_nonce
		);
	//$values = apply_filters( 'direct_stripe_params_filter', $params );
		ob_start();
		include( DSCORE_PATH . '/public/shortcode.php');
		return ob_get_clean();
	}

//Custom queries variables
	function direct_stripe_query_vars($vars) {
		$vars[] = 'direct-stripe';
		return $vars;
	}

//Redirection Payments / Subscriptions / donations
	function direct_stripe_parse_request($wp) {
		//Créer souscription
		if (array_key_exists('direct-stripe', $wp->query_vars)
		    && $wp->query_vars['direct-stripe'] === 'subscription') {
			include_once DSCORE_PATH . '/includes/create_subscription.php';
		}
		//Créer payment
		if (array_key_exists('direct-stripe', $wp->query_vars)
		    && $wp->query_vars['direct-stripe'] === 'payment') {
			include_once DSCORE_PATH . '/includes/create_payment.php';
		}
		//Créer donation
		if (array_key_exists('direct-stripe', $wp->query_vars)
		    && $wp->query_vars['direct-stripe'] === 'donation') {
			include_once DSCORE_PATH . '/includes/create_donation.php';
		}
	}

//Add admin page
	function direct_stripe_add_admin_menu() {
		global $direct_stripe_page;
		$direct_stripe_page = add_menu_page( 'Direct Stripe', 'Direct Stripe', 'manage_options', 'direct_stripe', array( $this,'direct_stripe_options_page'), DSCORE_URL . 'admin/images/logo_stripe_white.svg' );
		add_submenu_page( 'direct_stripe', __( 'Settings', 'direct-stripe' ), __( 'Settings', 'direct-stripe' ), 'manage_options', 'direct_stripe' );
	}
	//Register settings
	function direct_stripe_settings_init() {
		include( DSCORE_PATH . '/admin/register-settings.php');
	}
	//Display settings
	function direct_stripe_settings_render() {
		$d_stripe_options = get_option( 'direct_stripe_general_settings' );
		$d_stripe_options = get_option( 'direct_stripe_styles_settings' );
		$d_stripe_options = get_option( 'direct_stripe_emails_settings' );
		include( DSCORE_PATH . '/admin/display-settings.php');
	}

//Build admin settings page
	function direct_stripe_options_page() {
		include( DSCORE_PATH . '/admin/build-page.php');
	}

//Custom Styles
	function direct_stripe_styles_method() {
		wp_enqueue_style( 'direct-stripe-style', DSCORE_URL . '/public/css/direct-stripe.css' );
		include( DSCORE_PATH . '/public/styles.php');
		wp_add_inline_style( 'direct-stripe-style', $custom_css );
	}
	// Display Stripe users
	function direct_stripe_show_extra_profile_fields( $user ) {
		include( DSCORE_PATH . '/admin/display-users.php');
	}
	// Update users
	function direct_stripe_save_extra_profile_fields( $user_id ) {
		if ( !current_user_can( 'edit_user', $user_id ) )
			return false;
		update_user_meta( $user_id, 'stripe_id', $_POST['stripe_id'] );
	}

//Log Transactions in WordPress admin
	function direct_stripe_create_post_type() {
		// Set UI labels for Custom Post Type
		$labels = array(
			'name'                => _x( 'Direct Stripe logs', 'Post Type General Name', 'direct-stripe' ),
			'singular_name'       => _x( 'Direct Stripe log', 'Post Type Singular Name', 'direct-stripe' ),
			'parent_item_colon'   => __( 'Direct Stripe Parent Log', 'direct-stripe' ),
			'all_items'           => __( 'Direct Stripe logs', 'direct-stripe' ),
			'view_item'           => __( 'Direct Stripe log', 'direct-stripe' ),
			'add_new_item'        => __( 'Add New Direct Stripe log', 'direct-stripe' ),
			'add_new'             => __( 'Add New', 'direct-stripe' ),
			'edit_item'           => __( 'Edit Direct Stripe log', 'direct-stripe' ),
			'update_item'         => __( 'Update Direct Stripe log', 'direct-stripe' ),
			'search_items'        => __( 'SearchDirect Stripe log', 'direct-stripe' ),
			'not_found'           => __( 'Direct Stripe log Not Found', 'direct-stripe' ),
			'not_found_in_trash'  => __( 'Direct Stripe log Not found in Trash', 'direct-stripe' ),
		);

// Set other options for Direct Stripe Post Type
		$args = array(
			'label'               => __( 'Direct Stripe logs', 'direct-stripe' ),
			'description'         => __( 'Direct Stripe logs', 'direct-stripe' ),
			'labels'              => $labels,
			'hierarchical'        => false,
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => 'direct_stripe',
			'show_in_nav_menus'   => true,
			'can_export'          => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'capability_type'     => 'page'
		);
		// Registering Direct Stripe Post Type
		register_post_type( 'Direct Stripe Logs', $args );
	}
//Rename Colums for direct Stripe Post Type
	function direct_stripe_logs_colums_names( $columns ) {
		$columns = array(
			'cb'            => '<input type="checkbox" />',
			'title'         => __( 'Transaction ID', 'direct-stripe' ),
			'author'        => __( 'Stripe User', 'direct-stripe' ),
			'amount'        => __( 'Amount', 'direct-stripe' ),
			'type'	        =>	__( 'Type', 'direct-stripe' ),
			'description'	=>	__( 'Description', 'direct-stripe' ),
			'date'          => __( 'Date', 'direct-stripe' )
		);
		return $columns;
	}

//Add content to custom columns
	function direct_stripe_manage_logs_columns( $column ) {
		global $post;
		switch( $column ) {
			
			/* If displaying the 'amount' column. */
			case 'amount' :
				$firstamount = get_post_meta( get_the_ID(), 'amount', true );
				$secamount = $firstamount / 100;
				$amount = number_format( $secamount, 2 );
				if ( empty( $amount ) )
					echo __( 'Unknown', 'direct-stripe' );
				else
					printf( __( '%s', 'direct-stripe' ), $amount );
				break;
			
			case 'type' :
				$type = get_post_meta( get_the_ID(), 'type', true );
				if ( empty( $type ) )
					echo __( 'Unknown', 'direct-stripe' );
				else
					printf( __( '%s', 'direct-stripe' ), $type );
				break;
			
			case 'description' :
				$type = get_post_meta( get_the_ID(), 'description', true );
				if ( empty( $type ) )
					echo __( 'None provided', 'direct-stripe' );
				else
					printf( __( '%s', 'direct-stripe' ), $type );
				break;
			
			/* Just break out of the switch statement for everything else. */
			default :
				break;
		}
	}

//Make Direct Stripe logs columns sortable
	function direct_stripe_sortable_columns( $columns ) {
		$columns = array(
			'title'	        =>	'title',
			'author'        =>	'author',
			'amount'        => 	'amount',
			'type'	        =>	'type',
			'description'	=>	'description',
			'date'	        =>	'date'
		);
		return $columns;
	}

// Add shortcode button to posts editing
	function direct_stripe_add_shortcode_button() {
		include_once( DSCORE_PATH . 'admin/shortcode_button.php' );
	}
	function ds_add_mce_popup(){
		include_once( DSCORE_PATH . 'admin/shortcode_button_form.php' );
	}
	
	//End functions
} // End Class DirectStripeFunctions
