(function($) {

  $("#ds_insert_shortcode").click(function(){

    const ds_button = $("#ds_button").val();

    let ds_button_shortcode = '[direct-stripe value="' + ds_button + '"]';

    window.send_to_editor(ds_button_shortcode);

    /*
      jQuery.get( direct_stripe_admin_script_vars.api.buttons, function( data ) {

        const selected_button = data[ds_button];

        if( selected_button["type"] === "" ) {
          alert( direct_stripe_admin_script_vars.text.emptyType );
          return;
        }

        if( selected_button["type"] === "payment" && selected_button["amount"]=== "" || selected_button["type"] === "subscription" && selected_button["amount"] === "" ){
          alert( direct_stripe_admin_script_vars.text.emptyAmount );
          return;
        }


          let ds_button_shortcode = '[direct-stripe type="' + selected_button["type"] + '"';
          if( selected_button["amount"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' amount="' + selected_button["amount"]+ '"';
          }
          if( selected_button["button_id"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' button_id="' + selected_button["button_id"] + '"';
          }
          if( selected_button["name"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' name="' + selected_button["name"]+ '"';
          }
          if( selected_button["description"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' description="' + selected_button["description"] + '"';
          }
          if( selected_button["label"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' label="' + selected_button["label"] + '"';
          }
          if( selected_button["panellabel"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' panellabel="' + selected_button["panellabel"] + '"';
          }
          if( selected_button["coupon"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' coupon="' + selected_button["coupon"] + '"';
          }
          if( selected_button["setup_fee"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' setup_fee="' + selected_button["setup_fee"] + '"';
          }
          if( selected_button["zero_decimal"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' zero_decimal="' + selected_button["zero_decimal"] + '"';
          }
          if( selected_button["capture"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' capture="' + selected_button["capture"] + '"';
          }
          if( selected_button["billing"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' billing="' + selected_button["billing"] + '"';
          }
          if( selected_button["shipping"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' shipping="' + selected_button["shipping"] + '"';
          }
          if( selected_button["tc"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' tc="' + selected_button["tc"] + '"';
          }
          if( selected_button["rememberme"]!== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' rememberme="' + selected_button["rememberme"] + '"';
          }
          if( selected_button["display_amount"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' display_amount="' + selected_button["display_amount"] + '"';
          }
          if( selected_button["currency"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' currency="' + selected_button["currency"] + '"';
          }
          if( selected_button["custom_role"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' custom_role="' + selected_button["custom_role"] + '"';
          }
          if( selected_button["success_query"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' success_query="' + selected_button["success_query"] + '"';
          }
          if( selected_button["error_query"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' error_query="' + selected_button["error_query"] + '"';
          }
          if( selected_button["success_url"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' success_url="' + selected_button["success_url"] + '"';
          }
          if( selected_button["error_url"] !== "" ) {
            ds_button_shortcode = ds_button_shortcode + ' error_url="' + selected_button["error_url"] + '"';
          }

          ds_button_shortcode = ds_button_shortcode  + ']';



          window.send_to_editor(ds_button_shortcode);



      }); */

  });
})(jQuery);
