'use strict';

var stripe = Stripe(direct_stripe_script_vars.p_key);

function registerElements(elements, elementName) {

  var formClass = '.' + elementName;
  var dsProcess = document.querySelector(formClass);

  var form = dsProcess.querySelector('form');

  var resetButton = dsProcess.querySelector('a.reset');

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
    dsProcess.classList.add('submitting');

    // Disable all inputs.
    disableInputs();

    // Gather additional customer data we may have collected in our form.
    var name = form.querySelector('#' + elementName + '-name');
    var email = form.querySelector('#' + elementName + '-email');
    var address1 = form.querySelector('#' + elementName + '-address');
    var city = form.querySelector('#' + elementName + '-city');
    var state = form.querySelector('#' + elementName + '-state');
    var zip = form.querySelector('#' + elementName + '-zip');
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
    dsProcess.classList.remove('submitted');
  });
}