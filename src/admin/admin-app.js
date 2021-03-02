import domReady from '@wordpress/dom-ready';
import { render, createElement } from '@wordpress/element';
import { DsTabPanel } from './components/tabs';

const strings = ds_admin_app_vars.strings;
console.log(strings);

const Admin = () => (
    <DsTabPanel />
);

domReady( function() {
	render( 
        createElement( Admin ), 
        document.getElementById( 'ds-admin-app' ) 
    );
});
