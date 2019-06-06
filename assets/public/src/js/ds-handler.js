/**
 * Created by nfigueira on 13/04/2017.
 */

function stripe_checkout(token, ds_values, additionalData, paymentMethodID) {

    var dsProcess = document.querySelector(".ds-element-"+ds_values.instance);

    var parobj = ds_values,
    type = parobj["type"];

    var ds_answer_input = "#ds-answer-" + parobj.instance,
    ds_loading_span = "#loadingDS-" + parobj.instance;

    if(type === "donation") {
        var amount = setDonationValue(parobj.instance);
    } else {
        var amount = parobj.amount;
    }

    //jQuery(ds_loading_span).show();
    jQuery.post(
        ds_values.ajaxurl,
        {
            'action': 'ds_process_button',
            'stripeToken': token.id,
            'paymentMethodID': paymentMethodID,
            'stripeEmail': token.email,
            'type': type,
            'amount': amount,
            'params': parobj,
            'ds_nonce':parobj.ds_nonce
        },
        function(data) {
            handleServerResponse(data, ds_values);
        }
    );
}

function handleServerResponse(response, ds_values) {

  var dsProcess = document.querySelector(".ds-element-"+ds_values.instance),
  ds_answer_input = "#ds-answer-" + ds_values.instance;

    if (response.error) {
      console.log(response);
      // Show error from server on payment form
    } else if (response.requires_action) {
      // Use Stripe.js to handle required card action
      stripe.handleCardAction(
        response.payment_intent_client_secret
      ).then(function(result) {
        if (result.error) {
          // Show error in payment form
        } else {
          // The card action has been handled
          // The PaymentIntent can be confirmed again on the server
            jQuery.post(
                ds_values.ajaxurl,
                {
                    'action': 'ds_process_button',
                    'paymentIntentID': result.paymentIntent.id,
                    'params': ds_values,
                    'ds_nonce': ds_values.ds_nonce
                },
                function(data) {
                
                    switch (data.id) {
                        case "1":
                            //jQuery(ds_loading_span).hide();
                            dsProcess.classList.remove('submitting');
                            dsProcess.classList.add('submitted');
                            jQuery(ds_answer_input).addClass("success");
                            jQuery(ds_answer_input).html(data.message);
                            jQuery(ds_answer_input).show();
                            setTimeout(function() {
                                jQuery(ds_answer_input).hide();
                                }, 10000);
                                
                            break;
                        case "2":
                            //jQuery(ds_loading_span).hide();
                            dsProcess.classList.remove('submitting');
                            dsProcess.classList.add('submitted');
                            window.location.assign(data.url);
                            break;
                        default:
                            dsProcess.classList.remove('submitting');
                            dsProcess.classList.add('submitted');
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
    } else {
      // Show success message
    }
  }
