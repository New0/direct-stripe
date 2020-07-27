import domReady from '@wordpress/dom-ready';
import { DsTabPanel } from './components/tabs';

import './styles/main.scss';

const strings = ds_admin_app_vars.strings;

const Admin = () => (
    <DsTabPanel />
);

domReady( function() {
	wp.element.render( 
        wp.element.createElement( Admin ), 
        document.getElementById( 'ds-admin-app' ) 
    );
});
