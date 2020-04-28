function buildElement( instance, ds_values, ds_script_vars ) {
	'use strict';

	var elements = stripe.elements( {
		// Stripe's examples are localized to specific languages, but if
		// you wish to have Elements automatically detect your user's locale,
		// use `locale: 'auto'` instead.
		locale: ds_values.locale,
	} );

	/**
	 * Card Element
	 */
	var ce_styles = ds_script_vars.styles.card_element;
	var card = elements.create( 'card', {
		iconStyle: 'solid',
		style: {
			base: {
				iconColor: ce_styles.iconColor,
				color: ce_styles.color,
				fontWeight: ce_styles.fontWeight,
				fontFamily: ce_styles.fontFamily,
				fontSize: ce_styles.fontSize,
				fontSmoothing: 'antialiased',
				'::placeholder': {
					color: ce_styles.placeholderColor,
				},
				':-webkit-autofill': {
					color: ce_styles.webkitAutofillColor,
				},
			},
			invalid: {
				iconColor: ce_styles.invalidIconColor,
				color: ce_styles.invalidColor,
			},
		},
	} );
	card.mount( '#ds-element-' + instance + '-card' );

	registerElements( [ card ], 'ds-element-' + instance );
}
