<?php  // Build admin settings page 
defined( 'ABSPATH' ) or die( 'Please!' ); ?>

<div id="direct-stripe">
		<h2><?php _e( 'Direct Stripe', 'direct-stripe'); ?></h2>
		<?php if( isset( $_GET[ 'tab' ] ) ) {
						$active_tab = $_GET[ 'tab' ];
					} ?>
				<h2 class="nav-tab-wrapper">
            <a href="?page=direct_stripe&tab=general_options" class="nav-tab <?php echo $active_tab == 'general_options' ? 'nav-tab-active' : 'general_options'; ?>"><?php _e( 'General Options', 'direct-stripe'); ?></a>
            <a href="?page=direct_stripe&tab=styles" class="nav-tab <?php echo $active_tab == 'styles' ? 'nav-tab-active' : 'general_options'; ?>"><?php _e( 'Styles', 'direct-stripe'); ?></a>
						<a href="?page=direct_stripe&tab=emails" class="nav-tab <?php echo $active_tab == 'emails' ? 'nav-tab-active' : 'general_options'; ?>"><?php _e( 'Emails', 'direct-stripe'); ?></a>
        </h2> 
<form action='options.php' method='post'>
		<?php
		if( $active_tab == 'styles' ) {
		settings_fields( 'directStripeStyles' );
		do_settings_sections( 'directStripeStyles' );
	} else if( $active_tab == 'emails' ) {
		settings_fields( 'directStripeEmails' );
		do_settings_sections( 'directStripeEmails' );
	} else {
		settings_fields( 'directStripeGeneral' );
		do_settings_sections( 'directStripeGeneral' );
	}
		submit_button();
		?>
	</form>
</div>