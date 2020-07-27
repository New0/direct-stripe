/**
 * Created by nfigueira on 10/05/2017.
 */

//Start process on button Click
jQuery( '.direct-stripe-button-id' ).on( 'click', function( e ) {
	//Get unique button ID
	var instance = jQuery( this ).data( 'id' );

	//Check if instance number isset
	if ( instance.length <= 0 ) {
		console.log( 'DS instance button missing' );
		return;
	}

	//Set amount value for donation buttons
	if ( jQuery( '.donationvalue' ).length > 0 ) {
		setDonationValue( instance );
	}
	//Get Button Values
	var ds_values = window[ instance ],
		ds_script_vars = direct_stripe_script_vars;

	// Set currency
	if ( '' !== ds_values.currency ) {
		var currency = ds_values.currency;
	} else {
		var currency = ds_values.general_currency;
	}
	//Prepare values for Stripe
	var billing = ds_values.billing === '1' || ds_values.billing === 'true',
		shipping = ds_values.shipping === '1' || ds_values.shipping === 'true',
		rememberme =
			ds_values.rememberme === '1' || ds_values.rememberme === 'true',
		numbers = /^\+?[0-9]*\.?[0-9]+$/,
		ds_answer_input = '#ds-pre-answer-' + instance;

	//Set amount
	if (
		ds_values.display_amount !== '' &&
		ds_values.type !== 'subscription' &&
		ds_values.type !== 'donation'
	) {
		var amount = parseInt( ds_values.original_amount );
	} else if (
		ds_values.display_amount !== '' &&
		ds_values.type === 'donation'
	) {
		if (
			ds_values.zero_decimal === '1' ||
			ds_values.zero_decimal === 'true'
		) {
			var amount = parseInt( ds_values.original_amount );
		} else {
			var amount = parseFloat( ds_values.original_amount * 100 );
		}
	} else {
		var amount = 0;
	}

	//Check T&C have been checked
	var tcState = checkTC( this, instance ),
		donationInputState = checkDonationInput( this, ds_values, numbers );
	if ( tcState ) {
		returnError( ds_answer_input, ds_script_vars, 'emptyTc' );
		return false;
	} else if ( donationInputState ) {
		returnError( ds_answer_input, ds_script_vars, 'emptyDonation' );
		return false;
	}

	buildElement( instance, ds_values, ds_script_vars );
	//Modal events
	ds.modal.open( instance );

	e.preventDefault();
} );
// Close Checkout on page navigation:
window.addEventListener( 'popstate', function() {
	handler.close();
} );

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

/**
 * Created by nfigueira on 13/04/2017.
 * Rewritten 10/06/2019 for DS 2.2.0
 */
function stripe_checkout( token, ds_values, additionalData, paymentMethodID ) {
	var parobj = ds_values,
		type = parobj[ 'type' ];

	if ( type === 'donation' ) {
		var amount = setDonationValue( parobj.instance );
	} else {
		var amount = parobj.amount;
	}

	jQuery.post(
		ds_values.ajaxurl,
		{
			action: 'ds_process_button',
			stripeToken: token.id,
			paymentMethodID: paymentMethodID,
			allData: additionalData,
			type: type,
			amount: amount,
			params: parobj,
			ds_nonce: parobj.ds_nonce,
		},
		function( data ) {
			handleServerResponse( data, ds_values );
		}
	);
}

function handleServerResponse( response, ds_values ) {
	if ( response.requires_source_action ) {
		switch ( response.action_type ) {
			case 'incomplete':
				stripe
					.handleCardPayment( response.payment_intent_client_secret )
					.then( function( result ) {
						processResult( result, ds_values );
					} );
				break;
			case 'requires_source_action':
				stripe
					.handleCardAction( response.payment_intent_client_secret )
					.then( function( result ) {
						processResult( result, ds_values );
					} );
				break;
			default:
				processResult( response, ds_values );
		}
	} else if (
		typeof response === 'object' &&
		typeof response.id !== 'undefined'
	) {
		displayFinalResult( response, ds_values );
	} else {
		processResult( response, ds_values );
	}
}

function processResult( result, ds_values ) {
	if ( typeof result.paymentIntent !== 'undefined' ) {
		if ( result.paymentIntent.status === 'requires_confirmation' ) {
			jQuery.post(
				ds_values.ajaxurl,
				{
					action: 'ds_process_button',
					paymentIntentID: result.paymentIntent.id,
					params: ds_values,
					ds_nonce: ds_values.ds_nonce,
				},
				function( data ) {
					displayFinalResult( data, ds_values );
				}
			);
		} else if ( result.paymentIntent.status === 'succeeded' ) {
			jQuery.post(
				ds_values.ajaxurl,
				{
					action: 'ds_process_button',
					paymentIntentSucceeded: result.paymentIntent,
					params: ds_values,
					ds_nonce: ds_values.ds_nonce,
				},
				function( data ) {
					displayFinalResult( data, ds_values );
				}
			);
		}
	} else {
		displayFinalResult( result, ds_values );
	}
}

function displayFinalResult( data, ds_values ) {
	var dsProcess = document.querySelector(
			'.ds-element-' + ds_values.instance
		),
		success_input = document.querySelector(
			'#ds-success-answer-' + ds_values.instance
		),
		error_input = document.querySelector(
			'#ds-error-answer-' + ds_values.instance
		);

	switch ( data.id ) {
		case '1':
			dsProcess.classList.remove( 'submitting' );
			dsProcess.classList.add( 'submitted' );
			jQuery( success_input ).html( data.message );
			break;
		case '2':
			dsProcess.classList.remove( 'submitting' );
			dsProcess.classList.add( 'submitted' );
			window.location.assign( data.url );
			break;
		default:
			dsProcess.classList.remove( 'submitting' );
			dsProcess.classList.add( 'error' );
			if ( typeof data.error !== 'undefined' ) {
				jQuery( error_input ).html( data.error.message );
			} else if ( typeof data.message !== 'undefined' ) {
				jQuery( error_input ).html( data.message );
			}
	}
}

( 'use strict' );

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
			function( input ) {
				input.removeAttribute( 'disabled' );
			}
		);
	}

	function disableInputs() {
		Array.prototype.forEach.call(
			form.querySelectorAll(
				"input[type='text'], input[type='email'], input[type='tel']"
			),
			function( input ) {
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
	elements.forEach( function( element, idx ) {
		element.on( 'change', function( event ) {
			if ( event.error ) {
				error.classList.add( 'visible' );
				savedErrors[ idx ] = event.error.message;
				errorMessage.innerText = event.error.message;
			} else {
				savedErrors[ idx ] = null;

				// Loop over the saved errors and find the first one, if any.
				var nextError = Object.keys( savedErrors )
					.sort()
					.reduce( function( maybeFoundError, key ) {
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
	form.addEventListener( 'submit', function( e ) {
		e.preventDefault();

		// Trigger HTML5 validation UI on the form if any of the inputs fail
		// validation.
		var plainInputsValid = true;
		Array.prototype.forEach.call(
			form.querySelectorAll( 'input' ),
			function( input ) {
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
			.then( function( resultP ) {
				if ( resultP.error ) {
					enableInputs();
					// Show error in payment form
					displayFinalResult( resultP, ds_values );
				} else {
					stripe
						.createToken( elements[ 0 ], {} )
						.then( function( resultT ) {
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

	resetButtonError.addEventListener( 'click', function( e ) {
		e.preventDefault();

		dsStripeResetForm( form, elements, dsProcess, error );
	} );

	resetButtonSuccess.addEventListener( 'click', function( e ) {
		e.preventDefault();

		dsStripeResetForm( form, elements, dsProcess, error );
	} );

	function dsStripeResetForm( form, elements, dsProcess, error ) {
		// Resetting the form (instead of setting the value to `''` for each input)
		// helps us clear webkit autofill styles.
		form.reset();

		// Clear each Element.
		elements.forEach( function( element ) {
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

var ds = window.ds || {};

//Set Values for donation buttons
function setDonationValue( instance ) {
	var ds_values = window[ instance ];
	ds_values.original_amount = jQuery( '#donationvalue-' + instance ).val();
	jQuery( '.dsDonationValue-' + instance ).val( ds_values.original_amount );
	jQuery( '.ds-modal-button-' + instance + ' > .ds-modal-amount' ).html(
		ds_values.original_amount
	);
	return ds_values.original_amount;
}

//Check T&C checkbox not empty
function checkTC( element, instance ) {
	return (
		jQuery( element ).hasClass( 'ds-check-tc' ) &&
		! jQuery( '#ds-conditions-' + instance ).is( ':checked' )
	);
}

//Check Donation input
function checkDonationInput( element, ds_values, numbers ) {
	return (
		jQuery( element ).hasClass( 'ds-check-donation' ) &&
		! ds_values.original_amount &&
		! ds_values.original_amount.match( numbers )
	);
}

//Stop process
function returnError( ds_answer_input, direct_stripe_script_vars, error ) {
	if ( error === 'emptyTc' ) {
		text = direct_stripe_script_vars.text.checkTC;
	} else if ( error === 'emptyDonation' ) {
		text = direct_stripe_script_vars.text.enterAmount;
	}

	jQuery( ds_answer_input ).html( text + '<br/>' );
	jQuery( ds_answer_input ).addClass( 'error' );
	jQuery( ds_answer_input ).show();
	setTimeout( function() {
		jQuery( ds_answer_input ).hide();
	}, 10000 );
}

// Modal window
ds.modal = {
	// Stores the modal instances of the page
	instances: [],
	/**
	 * Initialize a modal instance
	 *
	 * @param string instance
	 * @return the jQuery object
	 */
	initInstance: function( instance ) {
		// If the instance was already initialize, return it (avoid duplicating events)
		if ( this.instances[ instance ] ) return this.instances[ instance ];

		// Store the modal jQuery object
		this.instances[ instance ] = jQuery( '#modal-' + instance );

		// Get the <span> element that closes the modal
		var $close = this.instances[ instance ].find( '.ds-close' );

		// Move the modal to the document root to avoid inheriting styles from inner containers
		this.instances[ instance ].appendTo( 'body' );

		// When the user clicks on <span> (x), close the modal
		$close.on(
			'click',
			function( e ) {
				e.preventDefault();
				this.instances[ instance ].hide();
			}.bind( this )
		);

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function( event ) {
			if ( event.target == this.instances[ instance ][ 0 ] ) {
				this.instances[ instance ].hide();
			}
		}.bind( this );

		return this.instances[ instance ];
	},
	/**
	 * Open the modal
	 *
	 * @param {string} instance
	 */
	open: function( instance ) {
		if ( ! ds.modal.instances[ instance ] )
			ds.modal.initInstance( instance );
		// Open Modal Form
		ds.modal.instances[ instance ].show();
	},
	/**
	 * Close the modal
	 *
	 * @param {string} instance
	 */
	close: function( instance ) {
		if ( ! ds.modal.instances[ instance ] ) return;
		// Close Modal Form
		ds.modal.instances[ instance ].hide();
	},
};
