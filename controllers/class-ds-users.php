<?php

/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 14/04/2017
 * Time: 11:42
 */
class dsUsers {

    public function __construct() {

        //Users
        add_action( 'show_user_profile', array( $this, 'direct_stripe_show_extra_profile_fields') );
        add_action( 'edit_user_profile', array( $this, 'direct_stripe_show_extra_profile_fields') );
        add_action( 'personal_options_update', array( $this, 'direct_stripe_save_extra_profile_fields') );
        add_action( 'edit_user_profile_update', array( $this, 'direct_stripe_save_extra_profile_fields') );
    }

    /**
     * Create stripe-user Role on plugin activation.
     *
     * @since 2.0.0
     */
    function direct_stripe_user_roles_on_activation() {
        add_role( 'stripe-user', __('Stripe user', directStripe::domain), array( 'read' => true ));
    }

    /**
     * Display Stripe users
     *
     * @since 2.0.0
     */
    function direct_stripe_show_extra_profile_fields( $user ) {
        include( DSCORE_PATH . 'includes/display-users.php');
    }

    /**
     * Save extra profile fields
     *
     * @since 2.0.0
     */
    function direct_stripe_save_extra_profile_fields( $user_id ) {
        if ( !current_user_can( 'edit_user', $user_id ) )
            return false;
        update_user_meta( $user_id, 'stripe_id', $_POST['stripe_id'] );
    }


}
$dsusers = new dsUsers;