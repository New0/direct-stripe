<?php  // Build admin settings page 
defined( 'ABSPATH' ) or die( 'Please!' ); ?>

<div id="direct-stripe">
		<h2><?php _e( 'Direct Stripe', DirectStripe::domain); ?></h2>
		<?php if( isset( $_GET['tab'] ) ) {
				$active_tab = $_GET['tab'];
			} else if(  isset($active_tab) && $active_tab == 'styles' ) {
        			$active_tab = 'styles';
    			}  else if( isset($active_tab) && $active_tab == 'emails' ) {
        			$active_tab = 'emails';
    			} else {
        			$active_tab = 'general_options';
    			} ?>
	<h2 class="nav-tab-wrapper">
        <a href="?page=direct_stripe&tab=general_options" class="nav-tab <?php echo $active_tab == 'general_options' ? 'nav-tab-active' : 'general_options'; ?>"><?php _e( 'General Options', DirectStripe::domain); ?></a>
        <a href="?page=direct_stripe&tab=styles" class="nav-tab <?php echo $active_tab == 'styles' ? 'nav-tab-active' : 'general_options'; ?>"><?php _e( 'Styles', DirectStripe::domain); ?></a>
        <a href="?page=direct_stripe&tab=emails" class="nav-tab <?php echo $active_tab == 'emails' ? 'nav-tab-active' : 'general_options'; ?>"><?php _e( 'Emails', DirectStripe::domain); ?></a>
    </h2>
	<form action='options.php' method='post'>
		<?php
		if( isset($active_tab) && $active_tab === 'styles' ) {
			settings_fields( 'directStripeStyles' );
			do_settings_sections( 'directStripeStyles' );
		} else if( isset($active_tab) && $active_tab === 'emails' ) {
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
