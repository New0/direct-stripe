/**
 * Created by nfigueira on 10/05/2017.
 */

jQuery( "#donationvalue" ).keyup(function(e) {

  var instance = jQuery( this ).data("donation-input-id");
  var ds_values = window[instance];

  ds_values.original_amount = e.target.value;

});

jQuery(".direct-stripe-button-id").on("click", function (e) {

    var instance = jQuery( this ).data("id");
    var ds_values = window[instance];

    // Set currency
    if( "" !== ds_values.currency ) {
        var currency = ds_values.currency;
    } else {
        var currency = ds_values.general_currency;
    }

    if( ds_values.display_amount !== "false" && ds_values.type !== "subscription" && ds_values.type !== "donation" ) {
        var amount = parseInt(ds_values.original_amount);
    } else if( ds_values.type === "donation" ) {
        if( ds_values.zero_decimal === "1" || ds_values.zero_decimal === "true"  ) {
          var amount = ds_values.original_amount
        } else {
          var amount = ds_values.original_amount * 100;
        }
    } else {
        var amount = 0;
    }
    if( ds_values.billing === "1" || ds_values.billing === "true" ) {
        billing = true;
    } else {
        billing = false;
    }
    if( ds_values.shipping === "1" || ds_values.shipping === "true" ) {
        shipping = true;
    } else {
        shipping = false;
    }
    if( ds_values.rememberme === "1" || ds_values.rememberme === "true" ) {
        rememberme = true;
    } else {
        rememberme = false;
    }

    var numbers = /^\+?[0-9]*\.?[0-9]+$/;
    var ds_answer_input = "#ds-answer-" + instance;

    //Check T&C have been checked
    if (jQuery(this).hasClass("ds-check-tc") && !jQuery("#ds-conditions-" + instance).is(":checked")) {

        jQuery(ds_answer_input).html( direct_stripe_script_vars.text.checkTC + "<br/>");
        jQuery(ds_answer_input).addClass("error");
        jQuery(ds_answer_input).show();
        setTimeout(function () {
            jQuery(ds_answer_input).hide();
        }, 10000);

        return false;
    }

    //Check donation amount is fulfilled
    if (jQuery(this).hasClass("ds-check-donation") && !jQuery("#donationvalue").val() && !jQuery("#donationvalue").val().match(numbers)) {

        jQuery(ds_answer_input).html( direct_stripe_script_vars.text.enterAmount + "<br/>");
        jQuery(ds_answer_input).addClass("error");
        jQuery(ds_answer_input).show();
        setTimeout(function () {
            jQuery(ds_answer_input).hide();
        }, 10000);

        return false;
    }

    handler = stripe_checkout(ds_values);
    if( billing !== false ) {
      handler.open({
        'key': ds_values.key,
        'locale': 'auto',
        'image': ds_values.image,
        'name': ds_values.name,
        'description': ds_values.description,
        'email': ds_values.current_email_address,
        'currency': currency,
        'panelLabel':   ds_values.panellabel,
        'amount': amount,
        'billingAddress': billing,
        'shippingAddress': shipping,
        'allowRememberMe': rememberme
      });
    } else {
      handler.open({
        'key': ds_values.key,
        'locale': 'auto',
        'image': ds_values.image,
        'name': ds_values.name,
        'description': ds_values.description,
        'email': ds_values.current_email_address,
        'currency': currency,
        'panelLabel': ds_values.panellabel,
        'amount': amount,
        'allowRememberMe': rememberme
      });
    }

    e.preventDefault();
});
// Close Checkout on page navigation:
window.addEventListener("popstate", function () {
    handler.close();
});