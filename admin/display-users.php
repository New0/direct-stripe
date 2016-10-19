<?php // Display users ?>
<h2><?php _e('Direct Stripe user infos', 'direct-stripe'); ?></h2>
	<table class="form-table">
			<tr>
			<h4><?php _e('Direct Sripe Data', 'direct-stripe'); ?></h4>
			<th><label for="stripe_id"><?php _e('Stripe customer ID', 'direct-stripe'); ?></label></th>
			<td>
				<input type="text" name="stripe_id" id="stripe_id" value="<?php echo esc_attr( get_the_author_meta( 'stripe_id', $user->ID ) ); ?>" class="infos-sup" /><br />
				<span class="description"><?php _e('stripe_id', 'direct-stripe'); ?></span>
			</td>
		</tr>
		<tr>
	</table>