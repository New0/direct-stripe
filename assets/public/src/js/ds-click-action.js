/**
 * Created by nfigueira on 10/05/2017.
 */

jQuery('.direct-stripe-button-id').on('click', function (e) {

    var instance = jQuery( this ).data('id');
    var ds_values = window[instance];

    // Set currency
    if( "" !== ds_values.currency ) {
        var currency = ds_values.currency;
    } else {
        var currency = ds_values.general_currency;
    }

    if( ds_values.display_amount !== 'false' && ds_values.type !== 'subscription') {
        var amount = parseInt(ds_values.original_amount);
    } else {
        var amount = 0;
    }

// Set remember me option
    if( ds_values.rememberme === 'true' ) {
        var rememberme = true;
    } else if( ds_values.rememberme !== 'false' && ds_values.general_rememberme === '1' ) {
        var rememberme = true;
    } else {
        var rememberme = false;
    }

//Set billing and shipping
    if( ds_values.shipping === 'true') {
        var shipping = true;
        var billing = true;
    } else if( ds_values.shipping !== 'false' && ds_values.general_shipping === '1' ) {
        var shipping = true;
        var billing = true;
    } else if(ds_values.billing === 'true' && ds_values.shipping !== 'true') {
        var shipping = false;
        var billing = true;
    } else if( ds_values.billing !== 'false' && ds_values.general_billing === '1' ) {
        var shipping = false;
        var billing = true;
    } else {
        var shipping = false;
        var billing = false;
    }

    var numbers = /^\+?[0-9]*\.?[0-9]+$/;
    var ds_answer_input = '#ds-answer-' + instance;

    //Check T&C have been checked
    if (jQuery(this).hasClass("ds-check-tc") && !jQuery("#ds-conditions-" + instance).is(':checked')) {

        jQuery(ds_answer_input).html("Please check the T&C" + "<br/>");
        jQuery(ds_answer_input).addClass("error");
        jQuery(ds_answer_input).show();
        setTimeout(function () {
            jQuery(ds_answer_input).hide();
        }, 10000);

        return false;

    }

    //Check donation amount is fulfilled
    if (jQuery(this).hasClass("ds-check-donation") && !jQuery("#donationvalue").val() && !jQuery("#donationvalue").val().match(numbers)) {

        jQuery(ds_answer_input).html('Please enter amount' + '<br/>');
        jQuery(ds_answer_input).addClass("error");
        jQuery(ds_answer_input).show();
        setTimeout(function () {
            jQuery(ds_answer_input).hide();
        }, 10000);

        return false;
    }

    handler = stripe_checkout(ds_values);
    // Open Checkout with further options:
    handler.open({
        'locale': 'auto',
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
    e.preventDefault();
});
// Close Checkout on page navigation:
window.addEventListener('popstate', function () {
    handler.close();
});