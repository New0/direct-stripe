'use strict';

var stripe = Stripe( direct_stripe_script_vars.p_key );

function registerElements( elements, elementName ) {
	var formClass = '.' + elementName;
	var dsProcess = document.querySelector( formClass );

	var form = dsProcess.querySelector( 'form' );

	var error = form.querySelector( '.error' );
	var errorMessage = error.querySelector( '.message' );

	//Get unique button ID
	var instance = jQuery( form ).data( 'id' );
	//Get Button Values
	var ds_values = window[ instance ];

	//Reset trigger
	var resetButtonSuccess = dsProcess.querySelector(
		'a.reset-success-' + instance
	);
	var resetButtonError = dsProcess.querySelector(
		'a.reset-error-' + instance
	);

	function enableInputs() {
		Array.prototype.forEach.call(
			form.querySelectorAll(
				"input[type='text'], input[type='email'], input[type='tel']"
			),
			function ( input ) {
				input.removeAttribute( 'disabled' );
			}
		);
	}

	function disableInputs() {
		Array.prototype.forEach.call(
			form.querySelectorAll(
				"input[type='text'], input[type='email'], input[type='tel']"
			),
			function ( input ) {
				input.setAttribute( 'disabled', 'true' );
			}
		);
	}

	function triggerBrowserValidation() {
		// The only way to trigger HTML5 form validation UI is to fake a user submit
		// event.
		var submit = document.createElement( 'input' );
		submit.type = 'submit';
		submit.style.display = 'none';
		form.appendChild( submit );
		submit.click();
		submit.remove();
	}

	// Listen for errors from each Element, and show error messages in the UI.
	var savedErrors = {};
	elements.forEach( function ( element, idx ) {
		element.on( 'change', function ( event ) {
			if ( event.error ) {
				error.classList.add( 'visible' );
				savedErrors[ idx ] = event.error.message;
				errorMessage.innerText = event.error.message;
			} else {
				savedErrors[ idx ] = null;

				// Loop over the saved errors and find the first one, if any.
				var nextError = Object.keys( savedErrors )
					.sort()
					.reduce( function ( maybeFoundError, key ) {
						return maybeFoundError || savedErrors[ key ];
					}, null );

				if ( nextError ) {
					// Now that they've fixed the current error, show another one.
					errorMessage.innerText = nextError;
				} else {
					// The user fixed the last error; no more errors.
					error.classList.remove( 'visible' );
				}
			}
		} );
	} );

	// Listen on the form's 'submit' handler...
	form.addEventListener( 'submit', function ( e ) {
		e.preventDefault();

		// Trigger HTML5 validation UI on the form if any of the inputs fail
		// validation.
		var plainInputsValid = true;
		Array.prototype.forEach.call(
			form.querySelectorAll( 'input' ),
			function ( input ) {
				if ( input.checkValidity && ! input.checkValidity() ) {
					plainInputsValid = false;
					return;
				}
			}
		);
		if ( ! plainInputsValid ) {
			triggerBrowserValidation();
			return;
		}

		// Show a loading screen...
		dsProcess.classList.add( 'submitting' );

		// Disable all inputs.
		disableInputs();

		// Gather additional customer data we may have collected in our form.
		var name = form.querySelector( '#' + elementName + '-name' );
		var email = form.querySelector( '#' + elementName + '-email' );
		var phone = form.querySelector( '#' + elementName + '-phone' );
		var address1 = form.querySelector( '#' + elementName + '-address' );
		var city = form.querySelector( '#' + elementName + '-city' );
		var state = form.querySelector( '#' + elementName + '-state' );
		var zip = form.querySelector( '#' + elementName + '-zip' );
		var country = form.querySelector( '#' + elementName + '-country' );
		var billingDetails = {
			name: name ? name.value : undefined,
			email: email ? email.value : undefined,
			phone: phone ? phone.value : undefined,
			address: {
				line1: address1 ? address1.value : undefined,
				city: city ? city.value : undefined,
				state: state ? state.value : undefined,
				postal_code: zip ? zip.value : undefined,
				country: country ? country.value : undefined,
			},
		};

		// Gather additional customer data we may have collected in our form.
		var shName = form.querySelector( '#' + elementName + '-sh-name' );
		var shPhone = form.querySelector( '#' + elementName + '-sh-phone' );
		var shAddress = form.querySelector( '#' + elementName + '-sh-address' );
		var shCity = form.querySelector( '#' + elementName + '-sh-city' );
		var shState = form.querySelector( '#' + elementName + '-sh-state' );
		var shZip = form.querySelector( '#' + elementName + '-sh-zip' );
		var shCountry = form.querySelector( '#' + elementName + '-sh-country' );
		var shippingDetails = {
			name: shName ? shName.value : undefined,
			phone: shPhone ? shPhone.value : undefined,
			line1: shAddress ? shAddress.value : undefined,
			city: shCity ? shCity.value : undefined,
			state: shState ? shState.value : undefined,
			postal_code: shZip ? shZip.value : undefined,
			country: shCountry ? shCountry.value : undefined,
		};
		var additionalData = {
			billingDetails: billingDetails,
			shippingDetails: shippingDetails,
		};

		// Use Stripe.js to create a token. We only need to pass in one Element
		// from the Element group in order to create a token. We can also pass
		// in the additional customer data we collected in our form.
		stripe
			.createPaymentMethod( 'card', elements[ 0 ], {
				billing_details: billingDetails,
			} )
			.then( function ( resultP ) {
				if ( resultP.error ) {
					enableInputs();
					// Show error in payment form
					displayFinalResult( resultP, ds_values );
				} else {
					stripe
						.createToken( elements[ 0 ], {} )
						.then( function ( resultT ) {
							if ( resultT.token ) {
								stripe_checkout(
									resultT.token,
									ds_values,
									additionalData,
									resultP.paymentMethod.id
								);
							}
						} );
				}
			} );
	} );

	resetButtonError.addEventListener( 'click', function ( e ) {
		e.preventDefault();

		dsStripeResetForm( form, elements, dsProcess, error );
	} );

	resetButtonSuccess.addEventListener( 'click', function ( e ) {
		e.preventDefault();

		dsStripeResetForm( form, elements, dsProcess, error );
	} );

	function dsStripeResetForm( form, elements, dsProcess, error ) {
		// Resetting the form (instead of setting the value to `''` for each input)
		// helps us clear webkit autofill styles.
		form.reset();

		// Clear each Element.
		elements.forEach( function ( element ) {
			element.clear();
		} );

		// Reset error state as well.
		error.classList.remove( 'visible' );
		dsProcess.classList.remove( 'error' );

		// Resetting the form does not un-disable inputs, so we need to do it separately:
		enableInputs();
		dsProcess.classList.remove( 'submitted' );
	}
}
