import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const api = ds_admin_app_vars.api;

apiFetch.use( apiFetch.createNonceMiddleware( api.nonce ) );

export const getSettings = () => {
	apiFetch( { url: api.settings } ).then( ( settings ) => {
		return settings;
	} );
};

export const getButtons = () => {
	
	apiFetch( { url: api.buttons } ).then( ( res ) => {
		return res;
	});

};

export const setSettings = (settings) => {
	apiFetch( {
		url: api.settings,
		method: 'POST',
		data: { settings },
	} ).then( res => {
		console.log( res );
	} );
}

export const setButtons = ( buttons, actions ) => {

	apiFetch( {
		url: api.buttons + "?_wpnonce=" + api.nonce,
		method: 'POST',
		data: buttons,
	} ).then( res => {
		if( !res ){
			actions.notice(
				{
					state: true,
					status: "error",
					message: __("Something wrong happened, couldn't create the Stripe button", "direct-stripe")
				}
			);
		} 
		actions.spinner();
	} );
}
