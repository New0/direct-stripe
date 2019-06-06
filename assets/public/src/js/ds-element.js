function buildElement(instance) {
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
            color: "#fff"
          },
          ":-webkit-autofill": {
            color: "#fff"
          }
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE"
        }
      }
    });
    card.mount("#ds-element-"+instance+"-card");
  
    registerElements([card], "ds-element-"+instance);

}
  