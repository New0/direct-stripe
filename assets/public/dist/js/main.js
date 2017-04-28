/**
 * Created by nfigueira on 13/04/2017.
 */
function processDirectStripe(token, args) {
    var parobj = ds_shortcode_params;
    var type = parobj['direct-stripe'];
    if( type === "donation") {
        var amount = jQuery("#donationvalue").val();
    } else {
        var amount = parobj.amount;
    }

    jQuery('#loadingDS').show();
    jQuery.post(
        ajaxurl,
        {
            'action': 'ds_process_button',
            'stripeToken': token.id,
            'stripeEmail': token.email,
            'type': type,
            'amount': amount,
            'params': parobj
        },
        function (data) {
            switch(data.id) {
                case '1':
                    jQuery('#loadingDS').hide();
                    jQuery("#directStripe_answer").html(data.message);
                    jQuery("#directStripe_answer").show();
                    /*setTimeout(function() {
                        jQuery("#directStripe_answer").hide();
                    }, 10000);*/
                    break;
                case '2':
                    jQuery('#loadingDS').hide();
                    window.location.replace(data.url);
                    break;
                default:
                    jQuery('#loadingDS').hide();
                    jQuery("#directStripe_answer").html(data);
                    jQuery("#directStripe_answer").show();
                    /*setTimeout(function() {
                        jQuery("#directStripe_answer").hide();
                    }, 10000);*/
            }
        }
    );
}
/**
 * Created by nfigueira on 25/04/2017.
 */
var ds_general_values = ds_general_values;
var ds_user_email = ds_user_email;

jQuery('.direct-stripe-button-id').each(function( index ) {

        var instance = jQuery( this ).data('id');
        var ds_shortcode_values = window["atts"+instance];

        if( ds_general_values.direct_stripe_checkbox_api_keys === '1'){
            var key = ds_general_values.direct_stripe_test_publishable_api_key;
        } else {
            var key = ds_general_values.direct_stripe_live_publishable_api_key;
        }

        var description = ds_shortcode_values.description;

        if( ds_shortcode_values.currency != undefined ) {
            var currency = ds_shortcode_values.currency;
        } else {
            var currency = ds_general_values.currency;
        }
        if( ds_general_values.direct_stripe_shipping_infos_checkbox === '1' || ds_shortcode_values.shipping === 'true' ) {
            shippingAddress = true;
            billingAddress = true;
        } else if( ds_general_values.direct_stripe_billing_infos_checkbox === '1' || ds_shortcode_values.billing === 'true' ) {
            shippingAddress = true;
            billingAddress = false;
        } else {
            shippingAddress = false;
            billingAddress = false;
        }

        var handler = StripeCheckout.configure({
            key: key,
            image: ds_general_values.direct_stripe_logo_image,
            locale: 'auto',
            token: processDirectStripe
        });


        jQuery(this).on('click', function (e) {

            var numbers = /^\+?[0-9]*\.?[0-9]+$/;
            var ds_answer_input = '#directStripe_answer';
            //Check T&C have been checked
            if (jQuery(this).hasClass("ds-check-tc") && !jQuery("#conditions").is(':checked')) {

                jQuery(ds_answer_input).html("Please check the T&C" + "<br/>");
                jQuery(ds_answer_input).css("color", "red");
                jQuery(ds_answer_input).show();
                setTimeout(function () {
                    jQuery(ds_answer_input).hide();
                }, 10000);

                return false;

            }

            //Check donation amount is fulfilled
            if (jQuery(this).hasClass("ds-check-donation") && !jQuery("#donationvalue").val() && !jQuery("#donationvalue").val().match(numbers)) {

                jQuery(ds_answer_input).html('Please enter amount' + '<br/>');
                jQuery(ds_answer_input).css("color", "red");
                jQuery(ds_answer_input).show();
                setTimeout(function () {
                    jQuery(ds_answer_input).hide();
                }, 10000);

                return false;
            }

            // Open Checkout with further options:
            handler.open({
                name: name,
                description: description,
                email: ds_user_email,
                currency: currency,
                billingAddress: billingAddress,
                shippingAddress: shippingAddress
            });
            e.preventDefault();
        });

        // Close Checkout on page navigation:
        window.addEventListener('popstate', function () {
            handler.close();
        });

    });
