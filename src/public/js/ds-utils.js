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
	setTimeout( function () {
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
	initInstance: function ( instance ) {
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
			function ( e ) {
				e.preventDefault();
				this.instances[ instance ].hide();
			}.bind( this )
		);

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function ( event ) {
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
	open: function ( instance ) {
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
	close: function ( instance ) {
		if ( ! ds.modal.instances[ instance ] ) return;
		// Close Modal Form
		ds.modal.instances[ instance ].hide();
	},
};
