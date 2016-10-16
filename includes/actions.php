<?php

require_once ( 'functions.php' );

/* functions object */
$directstripe = new \DirectStripeFunctions;

register_activation_hook( __FILE__,  array( $directstripe, 'direct_stripe_user_roles_on_activation') );

//Load admin scripts
add_action( 'admin_enqueue_scripts', array( $directstripe, 'direct_stripe_load_admin_scripts') );

//Add shortcode
add_shortcode( 'direct-stripe', array( $directstripe, 'direct_stripe_buttons_func') );

// Custom queries variables
add_filter('query_vars', array( $directstripe, 'direct_stripe_query_vars') );

//Redirections Payment or Subscription
add_action('parse_request', array( $directstripe, 'direct_stripe_parse_request') );

//Users
add_action( 'show_user_profile', array( $directstripe, 'direct_stripe_show_extra_profile_fields') );
add_action( 'edit_user_profile', array( $directstripe, 'direct_stripe_show_extra_profile_fields') );
add_action( 'personal_options_update', array( $directstripe, 'direct_stripe_save_extra_profile_fields') );
add_action( 'edit_user_profile_update', array( $directstripe, 'direct_stripe_save_extra_profile_fields') );

// Admin actions
if (is_admin() ) {
  
  // Add admin settings area
add_action( 'admin_menu', array( $directstripe, 'direct_stripe_add_admin_menu') );
add_action( 'admin_init', array( $directstripe, 'direct_stripe_settings_init') );
  
}