<?php //do
?>    
<script>
function ds_insert_shortcode(){
      var ds_type = jQuery("#ds_type").val();
      if( ds_type === "" ) {
          alert("Please select a type");
          return;
      }

      var ds_amount = jQuery("#ds_amount").val();
      if( ds_type === "payment" && ds_amount === "" || ds_type === "subscription" && ds_amount === "" ){
          alert("Please select an amount for payment type or plan ID for subscription type");
          return;
      }

      var ds_button_id = jQuery("#ds_button_id").val();
      var ds_name = jQuery("#ds_name").val();
      var ds_description = jQuery("#ds_description").val();
      var ds_label = jQuery("#ds_label").val();
      var ds_panellabel = jQuery("#ds_panellabel").val();
      var ds_coupon = jQuery("#ds_coupon").val();
      var ds_setup_fee = jQuery("#ds_setup_fee").val();
      var ds_capture = jQuery("#ds_capture").val();
      var ds_display_amount = jQuery("#ds_display_amount").val();
      var ds_currency = jQuery("#ds_currency").val();
      var ds_success_query = jQuery("#ds_success_query").val();
      var ds_error_query = jQuery("#ds_error_query").val();
      var ds_success_url = jQuery("#ds_success_url").val();
      var ds_error_url = jQuery("#ds_error_url").val();
  
      var ds_button_shortcode = '[direct-stripe type="' + ds_type + '"';
      if( ds_amount !== "" ) {
           ds_button_shortcode = ds_button_shortcode + ' amount="' + ds_amount + '"';
       } 
      if( ds_button_id !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' button_id="' + ds_button_id + '"';
      }
      if( ds_name !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' name="' + ds_name + '"';
      }
      if( ds_description !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' description="' + ds_description + '"';
      }
      if( ds_label !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' label="' + ds_label + '"';
      }
      if( ds_panellabel !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' panellabel="' + ds_panellabel + '"';
      }
      if( ds_coupon !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' coupon="' + ds_coupon + '"';
      }
      if( ds_setup_fee !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' setup_fee="' + ds_setup_fee + '"';
      }
      if( ds_capture !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' capture="' + ds_capture + '"';
      }
      if( ds_display_amount !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' display_amount="' + ds_display_amount + '"';
      }
      if( ds_currency !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' currency="' + ds_currency + '"';
      }
      if( ds_success_query !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' success_query="' + ds_success_query + '"';
      }
      if( ds_error_query !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' error_query="' + ds_error_query + '"';
      }
      if( ds_success_url !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' success_url="' + ds_success_url + '"';
      }
      if( ds_error_url !== "" ) {
         ds_button_shortcode = ds_button_shortcode + ' coupon="' + ds_error_url + '"';
      }
  
      ds_button_shortcode = ds_button_shortcode  + ']';

      window.send_to_editor(ds_button_shortcode);
        
 }
</script>
    <div id="ds_add_button" style="display:none;">      
      <div class="ds-row">
           <h3>
              <?php _e('Button Options','direct-stripe');?>
          </h3>
      </div>
      <div class="ds-row">
        <div class="ds-one-third">
                <strong><?php _e('Button Type','direct-stripe');?></strong><br />
                <select id="ds_type">
                    <option value=""><?php _e('Choose button type', 'direct-stripe'); ?></option>
                    <option value="payment"><?php _e('Payment', 'direct-stripe'); ?></option>
                  <option value="subscription"><?php _e('Subscription', 'direct-stripe'); ?></option>
                  <option value="donation"><?php _e('Donation', 'direct-stripe'); ?></option>
                </select> <br/>                    
         </div>
         <div class="ds-one-third">
            <strong><?php _e('Button Amount field','direct-stripe');?></strong><br />
                <input id="ds_amount" type="text" class="ds-shortcode-amount-field" name="ds_amount">
         </div>
         <div class="ds-one-third">
            <strong><?php _e('Button ID','direct-stripe');?></strong><br />
                <input id="ds_button_id" type="text" class="ds-shortcode-button-id" name="ds_button_id">     
         </div>
      </div>
      <div class="ds-row">
        <div class="ds-one-third">
            <strong><?php _e('Name','direct-stripe');?></strong><br />
                <input id="ds_name" type="text" class="ds-shortcode-name" name="ds_name">     
         </div>
         <div class="ds-one-third">
            <strong><?php _e('Label','direct-stripe');?></strong><br />
                <input id="ds_label" type="text" class="ds-shortcode-label" name="ds_label">     
          </div>
          <div class="ds-one-third">
            <strong><?php _e('Panel Label','direct-stripe');?></strong><br />
                <input id="ds_panellabel" type="text" class="ds-shortcode-panellabel" name="ds_panellabel">     
           </div>
      </div>
      <div class="ds-row">
        <div>
            <strong><?php _e('Description','direct-stripe');?></strong><br />
                <input id="ds_description" type="text" class="ds-shortcode-description" name="ds_description">     
            </div>
      </div>
      
          <div>
            <strong><?php _e('Coupon','direct-stripe');?></strong><br />
                <input id="ds_coupon" type="text" class="ds-shortcode-coupon" name="ds_coupon">     
            </div>
          <div>
            <strong><?php _e('Setup Fee','direct-stripe');?></strong><br />
                <input id="ds_setup_fee" type="text" class="ds-shortcode-setup-fee" name="ds_setup_fee">     
            </div>
         <div>
                <strong><?php _e('Capture','direct-stripe');?></strong><br />
                <select id="ds_capture">
                    <option value=""><?php _e('Choose no to capture later', 'direct-stripe'); ?></option>
                    <option value="true"><?php _e('Yes', 'direct-stripe'); ?></option>
                    <option value="false"><?php _e('No', 'direct-stripe'); ?></option>
                </select> <br/>                    
            </div>
         <div>
                <strong><?php _e('Display amount','direct-stripe');?></strong><br />
                <select id="ds_display_amount">
                    <option value=""><?php _e('Choose wether to display amount in Stripe Modal form button or not', 'direct-stripe'); ?></option>
                    <option value="true"><?php _e('Yes', 'direct-stripe'); ?></option>
                    <option value="false"><?php _e('No', 'direct-stripe'); ?></option>
                </select> <br/>                    
            </div>
          <div>
            <strong><?php _e('Currency','direct-stripe');?></strong><br />
                <input id="ds_currency" type="text" class="ds-shortcode-currency" name="ds_currency">     
            </div>
          <div>
            <strong><?php _e('Success Query','direct-stripe');?></strong><br />
                <input id="ds_success_query" type="text" class="ds-shortcode-success-query" name="ds_success_query">     
            </div>
          <div>
            <strong><?php _e('Error Query','direct-stripe');?></strong><br />
                <input id="ds_error_query" type="text" class="ds-shortcode-error-query" name="ds_error_query">     
            </div>
          <div>
            <strong><?php _e('Success url','direct-stripe');?></strong><br />
                <input id="ds_success_url" type="text" class="ds-shortcode-success-url" name="ds_success_url">     
            </div>
          <div>
            <strong><?php _e('Error url','direct-stripe');?></strong><br />
                <input id="ds_error_url" type="text" class="ds-shortcode-error-url" name="ds_error_url">     
            </div>

      <div>
            
                    <input type="button" class="button-primary" value="<?php _e('Insert Button','direct-stripe');?>" onclick="ds_insert_shortcode();"/>

                    <a class="button button-secondary" href="#" onclick="tb_remove(); return false;"><?php _e('Cancel','direct-stripe');?></a>
                </div>
        </div>
    </div>
    
    <?php
