import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const api = ds_admin_app_vars.api;

apiFetch.use( apiFetch.createNonceMiddleware( api.nonce ) );

export const getSettings = () => {
	apiFetch( { url: api.settings } ).then( ( settings ) => {
		return settings;
	} );
};

export const getButtons = async () => {
	let buttons = await apiFetch( { url: api.buttons } );

	return buttons;
};

export const setSettings = ( settings ) => {
	apiFetch( {
		url: api.settings,
		method: 'POST',
		data: { settings },
	} ).then( ( res ) => {
		console.log( res );
	} );
};

export const setButtons = async ( buttons, actions ) => {
	console.log(buttons);
	let buttonSet = await apiFetch( {
		url: api.buttons + '?_wpnonce=' + api.nonce,
		method: 'POST',
		data: buttons,
	} ).then( ( res ) => {
		if ( ! res ) {
			actions.notice( {
				state: true,
				status: 'error',
				message: __(
					"Something wrong happened, couldn't create the Stripe button",
					'direct-stripe'
				),
			} );
		}
	} );
	
	actions.spinner();

	return buttonSet;
};
