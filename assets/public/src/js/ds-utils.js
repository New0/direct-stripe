//Set Values for donation buttons
function setDonationValue(instance) {
  var ds_values = window[instance];
  ds_values.original_amount = jQuery("#donationvalue-" + instance).val();
  jQuery(".dsDonationValue-" + instance).val(ds_values.original_amount);
  jQuery(".ds-modal-button-" + instance + " > .ds-modal-amount").html(
    ds_values.original_amount
  );
  return ds_values.original_amount;
}

//Check T&C checkbox not empty
function checkTC(element, instance) {
  return (
    jQuery(element).hasClass("ds-check-tc") &&
    !jQuery("#ds-conditions-" + instance).is(":checked")
  );
}

//Check Donation input
function checkDonationInput(element, ds_values, numbers) {
  return (
    jQuery(element).hasClass("ds-check-donation") &&
    !ds_values.original_amount &&
    !ds_values.original_amount.match(numbers)
  );
}

//Stop process
function returnError(ds_answer_input, direct_stripe_script_vars, error) {
  if (error === "emptyTc") {
    text = direct_stripe_script_vars.text.checkTC;
  } else if (error === "emptyDonation") {
    text = direct_stripe_script_vars.text.enterAmount;
  }

  jQuery(ds_answer_input).html(text + "<br/>");
  jQuery(ds_answer_input).addClass("error");
  jQuery(ds_answer_input).show();
  setTimeout(function() {
    jQuery(ds_answer_input).hide();
  }, 10000);
}

//Open / Cose modal window that holds the form
function modalEvent(instance) {
  //Get Modal Form
  var modal = document.getElementById("modal-" + instance);
  //Open Modal Form
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("ds-close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
