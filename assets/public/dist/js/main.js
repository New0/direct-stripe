/**
 * Created by nfigueira on 10/05/2017.
 */

jQuery(".direct-stripe-button-id").on("click", function (e) {

    var instance = jQuery( this ).data("id");
    var ds_values = window[instance];

    // Set currency
    if( "" !== ds_values.currency ) {
        var currency = ds_values.currency;
    } else {
        var currency = ds_values.general_currency;
    }

    if( ds_values.display_amount !== "false" && ds_values.type !== "subscription") {
        var amount = parseInt(ds_values.original_amount);
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
/**
 * Created by nfigueira on 13/04/2017.
 */

function stripe_checkout(ds_values) {
    var handler = StripeCheckout.configure({
        key: ds_values.key,
        token: function(token, args) {

            var parobj = ds_values;

            var type = parobj["type"];
            if (type === "donation") {
                var amount = jQuery("#donationvalue").val();
            } else {
                var amount = parobj.amount;
            }

            var ds_answer_input = "#ds-answer-" + parobj.instance;

            jQuery("#loadingDS").show();
            jQuery.post(
                ds_values.ajaxurl,
                {
                    'action': 'ds_process_button',
                    'stripeToken': token.id,
                    'stripeEmail': token.email,
                    'type': type,
                    'amount': amount,
                    'params': parobj,
                    // Billing name and address
                    'billing_name': args.billing_name,
                    'billing_address_country': args.billing_address_country,
                    'billing_address_zip': args.billing_address_zip,
                    'billing_address_state': args.billing_address_state,
                    'billing_address_line1': args.billing_address_line1,
                    'billing_address_city': args.billing_address_city,
                    'billing_address_country_code': args.billing_address_country_code,
                    // Shipping name and address
                    'shipping_name': args.shipping_name,
                    'shipping_address_country': args.shipping_address_country,
                    'shipping_address_zip': args.shipping_address_zip,
                    'shipping_address_state': args.shipping_address_state,
                    'shipping_address_line1': args.shipping_address_line1,
                    'shipping_address_city': args.shipping_address_city,
                    'shipping_address_country_code': args.shipping_address_country_code
                },
                function (data) {
                    switch (data.id) {
                        case "1":
                            jQuery("#loadingDS").hide();
                            jQuery(ds_answer_input).addClass("success");
                            jQuery(ds_answer_input).html(data.message);
                            jQuery(ds_answer_input).show();
                            setTimeout(function() {
                             jQuery(ds_answer_input).hide();
                             }, 10000);
                            break;
                        case "2":
                            jQuery("#loadingDS").hide();
                            window.location.assign(data.url);
                            break;
                        default:
                            jQuery("#loadingDS").hide();
                            jQuery(ds_answer_input).addClass("error");
                            jQuery(ds_answer_input).html(data);
                            jQuery(ds_answer_input).show();
                        setTimeout(function() {
                         jQuery(ds_answer_input).hide();
                         }, 10000);
                    }
                }
            );
        }

    });
    return handler;
}
