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
    var ds_values = window[instance],
    ds_script_vars = direct_stripe_script_vars;

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
    ds_answer_input = "#ds-pre-answer-" + instance;

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
        returnError(ds_answer_input, ds_script_vars, 'emptyTc');
        return false;
    } else if(donationInputState){
       returnError(ds_answer_input, ds_script_vars, 'emptyDonation');
       return false;
    }

    buildElement(instance, ds_values);
    //Modal events
    modalEvent(instance);

    e.preventDefault();
});
// Close Checkout on page navigation:
window.addEventListener("popstate", function () {
    handler.close();
});