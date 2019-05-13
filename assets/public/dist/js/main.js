(function() {

    // Get the modal
    var modal = document.getElementById('ds-Modal');

    // Get the button that opens the modal
    var btn = document.getElementById("ds-Btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("ds-close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

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
})();
/**
 * Created by nfigueira on 10/05/2017.
 */

//Start process on button Click
jQuery(".direct-stripe-button-id").on("click", function (e) {
    //if(striperr){
      //  console.log(jQuery("#example-5"));
      //  jQuery("#example-5").addClass("ds-active");
   // } else {
        //Get unique button ID
    var instance = jQuery( this ).data("id");
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

    handler = stripe_checkout(ds_values);
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
      locale: window.__exampleLocale
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