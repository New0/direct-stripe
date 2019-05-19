'use strict';

var stripe = Stripe(direct_stripe_script_vars.p_key);

function registerElements(elements, exampleName) {
  var formClass = '.' + exampleName;
  var example = document.querySelector(formClass);

  var form = example.querySelector('form');
  var resetButton = example.querySelector('a.reset');
  var error = form.querySelector('.error');
  var errorMessage = error.querySelector('.message');

  //Get unique button ID
  var instance = jQuery( form  ).data("id");
  //Get Button Values
  var ds_values = window[instance];

  function enableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.removeAttribute('disabled');
      }
    );
  }

  function disableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.setAttribute('disabled', 'true');
      }
    );
  }

  function triggerBrowserValidation() {
    // The only way to trigger HTML5 form validation UI is to fake a user submit
    // event.
    console.log("triggerBrowserValidation");
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    form.appendChild(submit);
    submit.click();
    submit.remove();
  }

  // Listen for errors from each Element, and show error messages in the UI.
  var savedErrors = {};
  elements.forEach(function(element, idx) {
    element.on('change', function(event) {
      if (event.error) {
        error.classList.add('visible');
        savedErrors[idx] = event.error.message;
        errorMessage.innerText = event.error.message;
      } else {
        savedErrors[idx] = null;

        // Loop over the saved errors and find the first one, if any.
        var nextError = Object.keys(savedErrors)
          .sort()
          .reduce(function(maybeFoundError, key) {
            return maybeFoundError || savedErrors[key];
          }, null);

        if (nextError) {
          // Now that they've fixed the current error, show another one.
          errorMessage.innerText = nextError;
        } else {
          // The user fixed the last error; no more errors.
          error.classList.remove('visible');
        }
      }
    });
  });

  // Listen on the form's 'submit' handler...
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Trigger HTML5 validation UI on the form if any of the inputs fail
    // validation.
    var plainInputsValid = true;
    Array.prototype.forEach.call(form.querySelectorAll('input'), function(
      input
    ) {
      if (input.checkValidity && !input.checkValidity()) {
        plainInputsValid = false;
        return;
      }
    });
    if (!plainInputsValid) {
      triggerBrowserValidation();
      return;
    }

    // Show a loading screen...
    example.classList.add('submitting');

    // Disable all inputs.
    disableInputs();

    // Gather additional customer data we may have collected in our form.
    var name = form.querySelector('#' + exampleName + '-name');
    var email = form.querySelector('#' + exampleName + '-email');
    var address1 = form.querySelector('#' + exampleName + '-address');
    var city = form.querySelector('#' + exampleName + '-city');
    var state = form.querySelector('#' + exampleName + '-state');
    var zip = form.querySelector('#' + exampleName + '-zip');
    var additionalData = {
      "name": name ? name.value : undefined,
      "email": email? email.value : undefined,
      "address": {
        "line1": address1 ? address1.value : undefined,
        "city": city ? city.value : undefined,
        "state": state ? state.value : undefined,
        "postal_code": zip ? zip.value : undefined,
      }
      
    };

    // Use Stripe.js to create a token. We only need to pass in one Element
    // from the Element group in order to create a token. We can also pass
    // in the additional customer data we collected in our form.
    stripe.createPaymentMethod('card', elements[0], {
      billing_details: additionalData
    }).then(function(resultP) {
     
      console.log(resultP);
      if (resultP.error) {
        // Show error in payment form
         enableInputs();
         errorMessage.innerText = resultP.error.message;
      } else {

        stripe.createToken(elements[0], {}).then(function(resultT) {
          if (resultT.token) {
            stripe_checkout(resultT.token, ds_values, additionalData, resultP.paymentMethod.id)
          }
        });
      
      } 
    });
    
  });

  resetButton.addEventListener('click', function(e) {
    e.preventDefault();
    // Resetting the form (instead of setting the value to `''` for each input)
    // helps us clear webkit autofill styles.
    form.reset();

    // Clear each Element.
    elements.forEach(function(element) {
      element.clear();
    });

    // Reset error state as well.
    error.classList.remove('visible');

    // Resetting the form does not un-disable inputs, so we need to do it separately:
    enableInputs();
    example.classList.remove('submitted');
  });
}
/**
 * Created by nfigueira on 10/05/2017.
 */

//Start process on button Click
jQuery(".direct-stripe-button-id").on("click", function (e) {

    //Get unique button ID
    var instance = jQuery( this ).data("id");

    //Check if instance number isset
    if(instance.length <= 0){
        console.log("DS instance button missing");
        return;
    }

    //Set amount value for donation buttons
    if(jQuery(".donationvalue").length > 0){
        setDonationValue(instance);    
    }
    //Get Button Values
    var ds_values = window[instance];

    // Set currency
    if( "" !== ds_values.currency ) {
        var currency = ds_values.currency;
    } else {
        var currency = ds_values.general_currency;
    }
    //Prepare values for Stripe
    var billing = ds_values.billing === "1" || ds_values.billing === "true",
    shipping = ds_values.shipping === "1" || ds_values.shipping === "true",
    rememberme = ds_values.rememberme === "1" || ds_values.rememberme === "true",
    numbers = /^\+?[0-9]*\.?[0-9]+$/,
    ds_answer_input = "#ds-answer-" + instance;

    //Set amount
    if( ds_values.display_amount !== "" && ds_values.type !== "subscription" && ds_values.type !== "donation" ) {
        var amount = parseInt(ds_values.original_amount);
    } else if( ds_values.display_amount !== "" && ds_values.type === "donation" ) {
        if( ds_values.zero_decimal === "1" || ds_values.zero_decimal === "true"  ) {
          var amount = parseInt(ds_values.original_amount);
        } else {
          var amount = parseFloat(ds_values.original_amount * 100);
        }
    } else {
        var amount = 0;
    }

    //Check T&C have been checked
    var tcState = checkTC(this, instance),
    donationInputState = checkDonationInput(this, ds_values, numbers);
    if(tcState){
        returnError(ds_answer_input, direct_stripe_script_vars, 'emptyTc');
        return false;
    } else if(donationInputState){
       returnError(ds_answer_input, direct_stripe_script_vars, 'emptyDonation');
       return false;
    }

    //Modal events
    modalEvent(instance);
    /*handler = stripe_checkout(ds_values);
    if( billing !== false ) {
        handler.open({
            'key': ds_values.key,
            'locale': ds_values.locale,
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
            'locale': ds_values.locale,
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
*/
    e.preventDefault();
});
// Close Checkout on page navigation:
window.addEventListener("popstate", function () {
    handler.close();
});
(function() {
    "use strict";
  
    var elements = stripe.elements({
      // Stripe's examples are localized to specific languages, but if
      // you wish to have Elements automatically detect your user's locale,
      // use `locale: 'auto'` instead.
      locale: 'auto'
    });
  
    /**
     * Card Element
     */
    var card = elements.create("card", {
      iconStyle: "solid",
      style: {
        base: {
          iconColor: "#fff",
          color: "#fff",
          fontWeight: 400,
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "16px",
          fontSmoothing: "antialiased",
  
          "::placeholder": {
            color: "#BFAEF6"
          },
          ":-webkit-autofill": {
            color: "#fce883"
          }
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE"
        }
      }
    });
    card.mount("#example5-card");
  
    /**
     * Payment Request Element
     */
    var paymentRequest = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        amount: 2500,
        label: "Total"
      },
      requestShipping: true,
      shippingOptions: [
        {
          id: "free-shipping",
          label: "Free shipping",
          detail: "Arrives in 5 to 7 days",
          amount: 0
        }
      ]
    });

    paymentRequest.on("token", function(result) {
      console.log("result"+result);
      var example = document.querySelector(".example5");
      example.querySelector(".token").innerText = result.token.id;
      example.classList.add("submitted");
      result.complete("success");
    });
  
    var paymentRequestElement = elements.create("paymentRequestButton", {
      paymentRequest: paymentRequest,
      style: {
        paymentRequestButton: {
          theme: "light"
        }
      }
    });

    paymentRequest.canMakePayment().then(function(result) {
      if (result) {
        document.querySelector(".example5 .card-only").style.display = "none";
        document.querySelector(
          ".example5 .payment-request-available"
        ).style.display =
          "block";
        paymentRequestElement.mount("#example5-paymentRequest");
      }
    });
  
    registerElements([card], "example5");

})();
  
/**
 * Created by nfigueira on 13/04/2017.
 */

function stripe_checkout(token, ds_values, additionalData, paymentMethodID) {
           
    var example = document.querySelector(".example5");

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
    console.log(paymentMethodID);
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
            console.log(data);
            handleServerResponse(data, ds_values);
        }
    );
}

function handleServerResponse(response, ds_values) {
    console.log(response);
    if (response.error) {
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
                            example.classList.remove('submitting');
                            example.classList.add('submitted');
                            jQuery(ds_answer_input).addClass("success");
                            jQuery(ds_answer_input).html(data.message);
                            jQuery(ds_answer_input).show();
                            setTimeout(function() {
                                jQuery(ds_answer_input).hide();
                                }, 10000);
                                
                            break;
                        case "2":
                            //jQuery(ds_loading_span).hide();
                            example.classList.remove('submitting');
                            example.classList.add('submitted');
                            window.location.assign(data.url);
                            break;
                        default:
                            example.classList.remove('submitting');
                            example.classList.add('submitted');
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

//Set Values for donation buttons
function setDonationValue(instance){
    var ds_values = window[instance];
    ds_values.original_amount = jQuery("#donationvalue-"+instance).val();
    return ds_values.original_amount;
 }

 //Check T&C checkbox not empty
 function checkTC(element, instance){
    return jQuery(element).hasClass("ds-check-tc") && !jQuery("#ds-conditions-" + instance).is(":checked");
 }

 //Check Donation input
 function checkDonationInput(element, ds_values, numbers){
     return jQuery(element).hasClass("ds-check-donation") && !ds_values.original_amount && !ds_values.original_amount.match(numbers);
 }
 
 //Stop process
function returnError(ds_answer_input, direct_stripe_script_vars, error){
    if(error === 'emptyTc'){
        text = direct_stripe_script_vars.text.checkTC;
    } else if(error === 'emptyDonation') {
        text = direct_stripe_script_vars.text.enterAmount;
    }
    jQuery(ds_answer_input).html( text + "<br/>");
    jQuery(ds_answer_input).addClass("error");
    jQuery(ds_answer_input).show();
    setTimeout(function () {
        jQuery(ds_answer_input).hide();
    }, 10000);
}

//Open / Cose modal window that holds the form
function modalEvent( instance) {
    //Get Modal Form
    var modal = document.getElementById("modal-"+ instance);
    //Open Modal Form
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("ds-close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    } 
}