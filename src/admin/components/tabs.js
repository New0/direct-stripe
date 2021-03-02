import { Component } from '@wordpress/element';
import { TabPanel, Spinner, Notice } from '@wordpress/components';
import { GlobalSettings } from './globalSettings/globalSettings.js';
import { StylesSettings } from './stylesSettings/stylesSettings.js';
import { EmailsSettings } from './emailsSettings/emailsSettings.js';
import { ButtonsSettings } from './buttonsSettings/buttonsSettings.js';
import { getButtons }  from './settings-api';

export const spinnerState = (state) => {
		
	const newState = {
		...state, 
		spinner: !state.spinner
	};

	return newState;

};

export const noticeState = (state, notice) => {
		
	const newState = {
		...state, 
		notice: {
			state: notice.state,
			status: notice.status,
			message: notice.message

		}
	};

	return newState;

};

export const buttonsState = ( state, buttons ) => {
	const newState = {
		...state, 
		buttons: buttons
	};

	return newState;
}

export class DsTabPanel extends Component {

	constructor(props) {    
		super(props)
		this.props = {
			buttons: getButtons()
		}
		this.state = {
			buttons: {},
			currentButton: {},
			spinner: false,
			notice: {
				state: false,
				status: "",
				message: ""
			}
		}

		this.handleSpinner = this.handleSpinner.bind(this);
		this.handleNotice = this.handleNotice.bind(this);
		this.removeNotice = this.removeNotice.bind(this);
		this.handleButtons = this.handleButtons.bind(this);
	}

	handleSpinner() {	
		this.setState( spinnerState(this.state) );
	}

	handleNotice( notice ) {
		this.setState( noticeState( this.state, notice ) )
	}

	removeNotice() {
		const defaultNotice = {
			state: false,
			status: "",
			message: ""
		}
		this.setState( noticeState( this.state, defaultNotice ) )
	}

	handleButtons( buttons ) {
		this.setState( buttonsState( this.state, buttons ) )
	}
	
	
	render(){

		const passedData = {
			spinner: this.handleSpinner,
			notice: this.handleNotice,
			buttons: this.handleButtons
		}
		
		return (
			<div>
				<div className={`ds-spinner ${this.state.spinner ? "active" : "hidden"}`} >
					<Spinner />
				</div>
				<div className={`ds-notice ${this.state.notice.state ? "active" : "hidden"}`} >
					<Notice 
						status={this.state.notice.status}
						onRemove={this.removeNotice}
					>
						{this.state.notice.message}
					</Notice>
				</div>
				<TabPanel
					className="ds-tab-panel"
					activeClass="ds-active-tab"
					tabs={ [
						{
							name: 'global',
							title: 'Global',
							className: 'ds-global-settings',
							content: <GlobalSettings />
						},
						{
							name: 'styles',
							title: 'Styles',
							className: 'ds-styles-settings',
							content: <StylesSettings />
						},
						{
							name: 'emails',
							title: 'Emails',
							className: 'ds-emails-settings',
							content: <EmailsSettings />
						},
						{
							name: 'buttons',
							title: 'Buttons',
							className: 'ds-buttons-settings',
							content: <ButtonsSettings data={passedData}/>
						},
					] }
				>
					{ ( tab ) => <p>{ tab.content }</p> }
				</TabPanel>
			</div>
		)
	}
	
}
