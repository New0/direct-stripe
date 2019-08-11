/**
 * Created by nfigueira on 13/04/2017.
 * Rewritten 10/06/2019 for DS 2.2.0
 */
function stripe_checkout(token, ds_values, additionalData, paymentMethodID) {

    var dsProcess = document.querySelector(".ds-element-" + ds_values.instance);

    var parobj = ds_values,
    type = parobj["type"];

    var ds_answer_input = "#ds-answer-" + parobj.instance,
    ds_loading_span = "#loadingDS-" + parobj.instance;

    if(type === "donation") {
        var amount = setDonationValue(parobj.instance);
    } else {
        var amount = parobj.amount;
    }

    jQuery.post(
        ds_values.ajaxurl,
        {
            'action': 'ds_process_button',
            'stripeToken': token.id,
            'paymentMethodID': paymentMethodID,
            'allData': additionalData,
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

  if (response.requires_action && response.action_type === "incomplete") {
    // Use Stripe.js to handle required card action
    stripe.handleCardPayment(
      response.payment_intent_client_secret
    ).then(function(result){
      processResult(result, ds_values);
    });
  } else if (response.requires_action && response.action_type === "requires_action") {
    // Use Stripe.js to handle required card action
    stripe.handleCardAction(
      response.payment_intent_client_secret
    ).then(function(result){
      processResult(result, ds_values);
    });
  } else if ( typeof response === "object" && typeof response.id !== "undefined" ) {
        displayFinalResult(response, ds_values);
  } else {
    processResult(response, ds_values);
  }
}

function processResult(result, ds_values){

  if(typeof result.paymentIntent !== "undefined") {

    if ( result.paymentIntent.status === "requires_confirmation" ) {
        jQuery.post(
          ds_values.ajaxurl,
          {
            'action': 'ds_process_button',
            'paymentIntentID': result.paymentIntent.id,
            'params': ds_values,
            'ds_nonce': ds_values.ds_nonce
          },
          function(data) {
            displayFinalResult(data, ds_values);
          }
        );
    } else if ( result.paymentIntent.status === "succeeded" ) {
      jQuery.post(
        ds_values.ajaxurl,
        {
          'action': 'ds_process_button',
          'paymentIntentSucceeded': result.paymentIntent,
          'params': ds_values,
          'ds_nonce': ds_values.ds_nonce
        },
        function(data) {
          displayFinalResult(data, ds_values);
        }
      );
    }

  } else {
    displayFinalResult(result, ds_values);
  }

}

function displayFinalResult(data,  ds_values){
  
  var dsProcess = document.querySelector(".ds-element-" + ds_values.instance),
  success_input = document.querySelector("#ds-success-answer-" + ds_values.instance),
  error_div = document.querySelector("." + ds_values.instance + "-error"),
  error_input = document.querySelector("#ds-error-answer-" + ds_values.instance),
  form = document.querySelector(".ds-element-" + ds_values.instance + " > form ");
  
  switch (data.id) {
    case "1":
      dsProcess.classList.remove('submitting');
      dsProcess.classList.add('submitted');
      jQuery(success_input).html(data.message);
      break;
    case "2":
      dsProcess.classList.remove('submitting');
      dsProcess.classList.add('submitted');
      window.location.assign(data.url);
      break;
    default:
      console.log(error_div);
      console.log(data);
      dsProcess.classList.remove('submitting');
      dsProcess.classList.add('error');
      //form.classList.add('hide');
      //error_div.classList.add('visible');
      jQuery(ds_answer_input).addClass("error");
      if(typeof data.error.message !== "undefined"){
        jQuery(error_input).html(data.error.message);
      } else if(typeof data.message !== "undefined"){
        jQuery(error_input).html(data.message);
      }
      
  }
}