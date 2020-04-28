import domReady from '@wordpress/dom-ready';
import { dsTabPanel } from './components/tabs';
import { getSettings, getButtons } from './components/settings-api';

const strings = ds_admin_app_vars.strings;
const settings = getSettings();
const buttons = getButtons();

const AdminApp = () => (
    <dsTabPanel />
);

const appProps = {
	"text": strings,
    "settings": settings,
    "buttons":  buttons
};
console.log(appProps);
domReady( function() {
	const adminApp = wp.element.createElement( AdminApp, appProps );
	wp.element.render( adminApp, document.getElementById( 'ds-admin-app' ) );
} );
