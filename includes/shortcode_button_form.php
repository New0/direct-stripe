<?php //do
?>
<div id="ds_add_button" style="display:none;">
  <div class="ds-row">
      <h4><?php _e('Select Direct Stripe Button','direct-stripe');?></h4>
      <p><?php _e('Buttons are to be set at Direct Stripe -> Settings / Buttons', 'direct-stripe'); ?> </p>
  </div><br/>


    <div class="ds-row ds-flex">
        <div class="ds-one-third">
            <?php
            $buttons = get_option('direct_stripe_buttons');
            if ( $buttons ) { ?>
                <select id="ds_button">
                    <?php
                        foreach( $buttons as $button ) { ?>
                            <option value="<?php echo $button->value; ?>"><?php echo $button->text ?></option>
                    <?php  } ?>
                </select>
            <?php } else { ?>
                <p><?php _e('Set a button at Direct Stripe -> Settings / Buttons', 'direct-stripe'); ?> </p>
            <?php } ?>
        </div>
    </div>

    <br/>

      <div class="ds-row ds_buttons">
          <input id="ds_insert_shortcode" type="button" class="button-primary" value="<?php _e('Insert Button','direct-stripe');?>" />
          <a class="button button-secondary" href="#" onclick="tb_remove(); return false;"><?php _e('Cancel','direct-stripe');?></a>
      </div>

</div>
