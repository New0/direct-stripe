const api = ds_admin_app_vars.api;

export const getSettings = () => {
    console.log(api);
	wp.apiFetch( { path: api.settings } ).then( ( settings ) => {
        console.log(settings);
		return settings;
	} );
};

export const getButtons = () => {
	wp.apiFetch( { path: api.buttons } ).then( ( buttons ) => {
        console.log(buttons);
		return buttons;
	} );
};
