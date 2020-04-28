import { TabPanel, Animate } from '@wordpress/components';

const onSelect = ( tabName ) => {
	console.log( 'Selecting tab', tabName );
};

export const dsTabPanel = () => (
	<TabPanel
		className="ds-tab-panel"
		activeClass="ds-active-tab"
		onSelect={ onSelect }
		tabs={ [
			{
				name: 'global',
				title: 'Global',
				className: 'ds-global-settings',
			},
			{
				name: 'styles',
				title: 'Styles',
				className: 'ds-styles-settings',
			},
			{
				name: 'emails',
				title: 'Emails',
				className: 'ds-emails-settings',
			},
			{
				name: 'buttons',
				title: 'Buttons',
				className: 'ds-buttons-settings',
			},
		] }
	>
		{ ( tab ) => <p>{ tab.title }</p> }
	</TabPanel>
);
