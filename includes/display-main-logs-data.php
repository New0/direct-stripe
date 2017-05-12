<?php
/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 11/05/2017
 * Time: 14:22
 */
 ?>

<h2><?php _e('Direct Stripe transaction data', 'direct-stripe'); ?></h2>
<table class="form-table">
    <tr>
        <th><label for="token"><?php _e('Token', 'direct-stripe'); ?></label></th>
        <td>
            <input disabled="disabled" type="text" name="token" id="token" value="<?php echo esc_attr( $post->post_name ); ?>" class="infos-sup" /><br />
        </td>
    </tr>
    <tr>
        <th><label for="charge_id"><?php _e('Event object ID', 'direct-stripe'); ?></label></th>
        <td>
            <input disabled="disabled" type="text" name="charge_id" id="charge_id" value="<?php echo esc_attr(  get_post_meta( $post->ID , 'charge_id', true ) ); ?>" class="infos-sup" /><br />
        </td>
    </tr>
    <tr>
        <th><label for="email_address"><?php _e('User email address', 'direct-stripe'); ?></label></th>
        <td>
            <input disabled="disabled" type="text" name="email_address" id="email_address" value="<?php echo esc_attr( the_author_meta( 'user_email', $post->post_author ) ); ?>" class="infos-sup" /><br />
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
    </tr>
    <tr>
        <th><label for="capture"><?php _e('Captured', 'direct-stripe'); ?></label></th>
        <td>
            <input disabled="disabled" type="text" name="capture" id="capture" value="<?php if( get_post_meta( $post->ID , 'capture', true ) === '1' ) { echo 'Yes'; } else { echo 'No'; };  ?>" class="infos-sup" /><br />
        </td>
    </tr>
    </tr>
    <tr>
        <th><label for="coupon"><?php _e('Coupon used', 'direct-stripe'); ?></label></th>
        <td>
            <input disabled="disabled" type="text" name="coupon" id="coupon" value="<?php echo esc_attr( get_post_meta( $post->ID , 'coupon', true ) ); ?>" class="infos-sup" /><br />
        </td>
    </tr>
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
