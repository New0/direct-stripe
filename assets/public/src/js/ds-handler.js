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

  var dsProcess = document.querySelector(".ds-element-" + ds_values.instance),
  ds_answer_input = "#ds-answer-" + ds_values.instance;
  if (response.requires_action && response.action_type === "incomplete") {
    // Use Stripe.js to handle required card action
    stripe.handleCardPayment(
      response.payment_intent_client_secret
    ).then(function(result){
      displayFinalResult(result, ds_values);
    });
  } else if (response.requires_action && response.action_type === "requires_action") {
    // Use Stripe.js to handle required card action
    stripe.handleCardAction(
      response.payment_intent_client_secret
    ).then(function(result){
      processResult(result, ds_values);
    });
  } else {
    processResult(response, ds_values);
  }
}

function processResult(result, ds_values){
  var dsProcess = document.querySelector(".ds-element-" + ds_values.instance),
  ds_answer_input = "#ds-answer-" + ds_values.instance;

  console.log(result);
  if ( result.paymentIntent.status === "requires_confirmation") {
      jQuery.post(
          ds_values.ajaxurl,
          {
              'action': 'ds_process_button',
              'paymentIntentID': result.paymentIntent.id,
              'params': ds_values,
              'ds_nonce': ds_values.ds_nonce
          },
          function(data) {
            console.log(data);
            displayFinalResult(data, ds_values);
          }
      );
  } else {
    console.log("elseProcess");
    displayFinalResult(result, ds_values);
  }
}

function displayFinalResult(data,  ds_values){
  var dsProcess = document.querySelector(".ds-element-" + ds_values.instance),
  ds_answer_input = "#ds-answer-" + ds_values.instance;
  switch (data.id) {
    case "1":
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
      dsProcess.classList.remove('submitting');
      dsProcess.classList.add('submitted');
      window.location.assign(data.url);
      break;
    default:
        console.log("elseDisplay");
      dsProcess.classList.remove('submitting');
      dsProcess.classList.add('error');
      jQuery(ds_answer_input).addClass("error");
      jQuery(ds_answer_input).html(data.message);
      jQuery(ds_answer_input).show();
      setTimeout(function() {
          jQuery(ds_answer_input).hide();
      }, 10000);
  }
}