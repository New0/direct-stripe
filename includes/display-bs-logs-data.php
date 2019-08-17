<?php
/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 11/05/2017
 * Time: 15:23
 */
?>
<h4><?php _e('These are the lastly used billing and shipping data, please report to logs to find older billing and shipping data for a precise transaction', 'direct-stripe'); ?></h4>

<h3><?php _e('Direct Stripe Billing informations', 'direct-stripe'); ?></h3>
<table class="form-table">
	<tr>
		<!-- Billing_name -->
		<th><label for="ds_billing_name"><?php _e('Billing name', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_billing_name" id="ds_billing_name" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_billing_name', true  ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- Billing_phone-->
		<th><label for="ds_billing_phone"><?php _e('Billing phone', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_billing_phone" id="ds_billing_phone" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_billing_phone', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- Billing_ZIP -->
		<th><label for="ds_billing_address_zip"><?php _e('Billing address zip code', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_billing_address_zip" id="ds_billing_address_zip" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_billing_address_zip', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- ds_billing_address_state -->
		<th><label for="ds_billing_address_state"><?php _e('Billing address state', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_billing_address_state" id="ds_billing_address_state" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_billing_address_state', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- ds_billing_address_line1 -->
		<th><label for="ds_billing_address_line1"><?php _e('Billing address', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_billing_address_line1" id="ds_billing_address_line1" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_billing_address_line1', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- ds_billing_address_city -->
		<th><label for="ds_billing_address_city"><?php _e('Billing city', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_billing_address_city" id="ds_billing_address_city" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_billing_address_city', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- ds_billing_address_country_code -->
		<th><label for="ds_billing_address_country_code"><?php _e('Billing country code', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_billing_address_country_code" id="ds_billing_address_country_code" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_billing_address_country_code', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
</table>
<h3><?php _e('Direct Stripe Shipping informations', 'direct-stripe'); ?></h3>
<table class="form-table">
	<tr>
		<!-- shipping_name -->
		<th><label for="ds_shipping_name"><?php _e('Shipping name', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_shipping_name" id="ds_shipping_name" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_shipping_name', true  ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- shipping_phone -->
		<th><label for="ds_shipping_phone"><?php _e('Shipping phone', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_shipping_phone" id="ds_shipping_phone" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_shipping_phone', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- shipping_ZIP -->
		<th><label for="ds_shipping_address_zip"><?php _e('Shipping zip code', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_shipping_address_zip" id="ds_shipping_address_zip" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_shipping_address_zip', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- ds_shipping_address_state -->
		<th><label for="ds_shipping_address_state"><?php _e('Shipping address state', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_shipping_address_state" id="ds_shipping_address_state" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_shipping_address_state', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- ds_shipping_address_line1 -->
		<th><label for="ds_shipping_address_line1"><?php _e('Shipping address', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_shipping_address_line1" id="ds_shipping_address_line1" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_shipping_address_line1', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<tr>
		<!-- ds_shipping_address_city -->
		<th><label for="ds_shipping_address_city"><?php _e('Shipping city', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="ds_shipping_address_city" id="ds_shipping_address_city" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_shipping_address_city', true ) ); ?>" class="infos-sup" /><br />
		</td>
	</tr>
	<!-- ds_shipping_address_country_code -->
	<th><label for="ds_shipping_address_country_code"><?php _e('Shipping country code', 'direct-stripe'); ?></label></th>
	<td>
		<input disabled="disabled" type="text" name="ds_shipping_address_country_code" id="ds_shipping_address_country_code" value="<?php echo esc_attr( get_post_meta( $post->ID, 'ds_shipping_address_country_code', true ) ); ?>" class="infos-sup" /><br />
	</td>
	</tr>
</table>