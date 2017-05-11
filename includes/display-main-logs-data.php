<?php
/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 11/05/2017
 * Time: 14:22
 */
 // Display extra logs data ?>

<h2><?php _e('Direct Stripe transaction data', 'direct-stripe'); ?></h2>
<table class="form-table">
    <tr>
        <th><label for="email_address"><?php _e('User email address', 'direct-stripe'); ?></label></th>
        <td>
            <input disabled="disabled" type="text" name="email_address" id="email_address" value="<?php echo esc_attr( get_the_author_meta( 'email_address' ) ); ?>" class="infos-sup" /><br />
        </td>
    </tr>
	<tr>
		<th><label for="stripe_id"><?php _e('Stripe customer ID', 'direct-stripe'); ?></label></th>
		<td>
			<input disabled="disabled" type="text" name="stripe_id" id="stripe_id" value="<?php echo esc_attr( get_post_meta( $post->ID , 'stripe_id', true ) ); ?>" class="infos-sup" /><br />
			<span class="description"><?php _e('stripe_id', 'direct-stripe'); ?></span>
		</td>
	</tr>
    <tr>
        <th><label for="type"><?php _e('Type of transaction', 'direct-stripe'); ?></label></th>
        <td>
            <input disabled="disabled" type="text" name="type" id="type" value="<?php echo esc_attr( get_post_meta( $post->ID , 'type', true ) ); ?>" class="infos-sup" /><br />
        </td>
    </tr>
    <tr>
        <th><label for="amount"><?php _e('Amount / Plan ID', 'direct-stripe'); ?></label></th>
        <td>
            <input disabled="disabled" type="text" name="amount" id="amount" value="<?php echo esc_attr( get_post_meta( $post->ID , 'amount', true ) ); ?>" class="infos-sup" /><br />
        </td>
    </tr>
    <tr>
        <th><label for="currency"><?php _e('Currency', 'direct-stripe'); ?></label></th>
        <td>
            <input disabled="disabled" type="text" name="currency" id="currency" value="<?php echo esc_attr( get_post_meta( $post->ID , 'currency', true ) ); ?>" class="infos-sup" /><br />
        </td>
    </tr>
    <tr>
        <th><label for="description"><?php _e('Description registered', 'direct-stripe'); ?></label></th>
        <td>
            <textarea disabled="disabled" name="description" id="description" value="<?php echo esc_attr( get_post_meta( $post->ID , 'description', true ) ); ?>" class="infos-sup" ><?php echo esc_attr( get_post_meta( $post->ID , 'description', true ) ); ?></textarea><br />
        </td>
    </tr>
</table>
