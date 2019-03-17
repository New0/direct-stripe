/**
 * Created by nfigueira on 13/04/2017.
 */

function stripe_checkout(ds_values) {
    var handler = StripeCheckout.configure({
        key: ds_values.key,
        token: function(token, args) {
           
            var parobj = ds_values,
            type = parobj["type"];

            var ds_answer_input = "#ds-answer-" + parobj.instance,
            ds_loading_span = "#loadingDS-" + parobj.instance;

            if(type === "donation") {
                var amount = setDonationValue(parobj.instance);
            } else {
                var amount = parobj.amount;
            }

            jQuery(ds_loading_span).show();
            
            jQuery.post(
                ds_values.ajaxurl,
                {
                    'action': 'ds_process_button',
                    'stripeToken': token.id,
                    'stripeEmail': token.email,
                    'type': type,
                    'amount': amount,
                    'params': parobj,
                    'ds_nonce':parobj.ds_nonce,
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
                            jQuery(ds_loading_span).hide();
                            jQuery(ds_answer_input).addClass("success");
                            jQuery(ds_answer_input).html(data.message);
                            jQuery(ds_answer_input).show();
                            setTimeout(function() {
                             jQuery(ds_answer_input).hide();
                             }, 10000);
                            break;
                        case "2":
                            jQuery(ds_loading_span).hide();
                            window.location.assign(data.url);
                            break;
                        default:
                            jQuery(ds_loading_span).hide();
                            jQuery(ds_answer_input).addClass("error");
                            jQuery(ds_answer_input).html(data.message);
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
