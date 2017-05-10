/**
 * Created by nfigueira on 13/04/2017.
 */

function stripe_checkout(ds_values) {
    var handler = StripeCheckout.configure({
        key: ds_values.key,
        token: function(token, args) {

            var parobj = ds_values;

            var type = parobj['type'];
            if (type === "donation") {
                var amount = jQuery("#donationvalue").val();
            } else {
                var amount = parobj.amount;
            }

            jQuery('#loadingDS').show();
            jQuery.post(
                ds_values.ajaxurl,
                {
                    'action': 'ds_process_button',
                    'stripeToken': token.id,
                    'stripeEmail': token.email,
                    'type': type,
                    'amount': amount,
                    'params': parobj,
                    'args': args
                },
                function (data) {
                    switch (data.id) {
                        case '1':
                            jQuery('#loadingDS').hide();
                            jQuery("#directStripe_answer").html(data.message);
                            jQuery("#directStripe_answer").show();
                            setTimeout(function() {
                             jQuery("#directStripe_answer").hide();
                             }, 10000);
                            break;
                        case '2':
                            jQuery('#loadingDS').hide();
                            window.location.replace(data.url);
                            break;
                        default:
                            jQuery('#loadingDS').hide();
                            jQuery("#directStripe_answer").html(data);
                            jQuery("#directStripe_answer").show();
                        setTimeout(function() {
                         jQuery("#directStripe_answer").hide();
                         }, 10000);
                    }
                }
            );
        }

    });
    return handler;
}
