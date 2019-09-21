function buildElement(instance, ds_values, ds_script_vars) {
  "use strict";

  var elements = stripe.elements({
    // Stripe's examples are localized to specific languages, but if
    // you wish to have Elements automatically detect your user's locale,
    // use `locale: 'auto'` instead.
    locale: ds_values.locale
  });

  /**
   * Card Element
   */
  var card = elements.create("card", {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: ds_script_vars.iconColor,
        color: ds_script_vars.color,
        fontWeight: ds_script_vars.fontWeight,
        fontFamily: ds_script_vars.fontFamily,
        fontSize: ds_script_vars.fontSize,
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: ds_script_vars.placeholderColor
        },
        ":-webkit-autofill": {
          color: ds_script_vars.webkitAutofillColor
        }
      },
      invalid: {
        iconColor: ds_script_vars.invalidIconColor,
        color: ds_script_vars.invalidColor
      }
    }
  });
  card.mount("#ds-element-" + instance + "-card");

  registerElements([card], "ds-element-" + instance);
}
