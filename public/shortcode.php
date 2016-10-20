<?php
// Shortcode output
?>
<!-- pass in the $params array and the URL --> 
<form action="<?php echo add_query_arg($params); ?>" id="stripeForm" value="submit" method="POST" >
	<?php //Donation condition and input
		if(  isset($directStripeAttrValues['type']) && $directStripeAttrValues['type'] === 'donation' ) { ?>
	<input type="number" name="donationvalue" id="donationvalue" required />
	<?php } ?>
  <script class="stripe-button" src="https://checkout.stripe.com/checkout.js" 
		<?php if( isset($d_stripe_general['direct_stripe_checkbox_api_keys']) && $d_stripe_general['direct_stripe_checkbox_api_keys'] === '1' ) { ?>
		data-key="<?php echo esc_attr($d_stripe_general['direct_stripe_test_publishable_api_key']); ?>"
		<?php } else { ?>
		data-key="<?php echo esc_attr($d_stripe_general['direct_stripe_publishable_api_key']); ?>"
		<?php } ?>
		data-image="<?php echo esc_url($d_stripe_general['direct_stripe_logo_image']); ?>" 
		data-name="<?php echo esc_attr($directStripeAttrValues['name']) ?>" 
		data-description="<?php echo esc_attr($directStripeAttrValues['description']) ?>"
		data-amount="<?php echo absint($directStripeAttrValues['amount']) ?>" 
		data-panel-label="<?php echo esc_attr($directStripeAttrValues['panellabel']) ?>"
		data-locale="<?php echo esc_attr($directStripeAttrValues['locale']) ?>"
		data-currency="<?php echo esc_attr($directStripeAttrValues['currency']) ?>" >
		</script>
	<?php //Custom styles button condition
				if( isset($d_stripe_styles['direct_stripe_use_custom_styles']) && $d_stripe_styles['direct_stripe_use_custom_styles'] === '1' ) { ?>
	<button id="directStripe" class="direct-stripe-button" type="submit" ><?php echo esc_attr($directStripeAttrValues['label']) ?></button>
	<?php //T&C Check box condition
				if( isset($d_stripe_styles['direct_stripe_use_tc_checkbox']) && $d_stripe_styles['direct_stripe_use_tc_checkbox'] === '1' ) { ?>
	<br/><input type="checkbox" class="conditions" id="conditions" required>&nbsp; <?php echo esc_attr($d_stripe_styles['direct_stripe_tc_text']) ?> <a target="_blank" href="<?php echo home_url($d_stripe_styles['direct_stripe_tc_link']); ?>"><?php  echo $d_stripe_styles['direct_stripe_tc_link_text']; ?></a><br />
	<?php } ?>
	<?php } ?>
	</form>