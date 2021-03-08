import { Component } from '@wordpress/element';
import {
	TabPanel,
	Spinner,
	Notice,
	HorizontalRule,
} from '@wordpress/components';
import {
	GlobalSettings,
	StylesSettings,
	EmailsSettings,
	ButtonsSettings,
	getButtons,
} from './';

export class DsTabPanel extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			buttons: this.resetButtons(),
			currentButton: '',
			spinner: false,
			notice: {
				state: false,
				status: '',
				message: '',
				context: '',
			},
		};

		this.handleSpinner = this.handleSpinner.bind( this );
		this.handleNotice = this.handleNotice.bind( this );
		this.removeNotice = this.removeNotice.bind( this );
		this.resetButtons = this.resetButtons.bind( this );
		this.setCurrentButton = this.setCurrentButton.bind( this );
	}

	handleSpinner() {
		this.setState( { spinner: ! this.state.spinner } );
	}

	handleNotice( notice ) {
		this.setState( {
			notice: {
				state: notice.state,
				status: notice.status,
				message: notice.message,
			},
		} );
	}

	removeNotice() {
		this.setState( {
			notice: {
				state: false,
				status: '',
				message: '',
			},
		} );
	}

	resetButtons() {
		getButtons().then( ( buttonsData ) => {
			if ( typeof buttonsData !== 'undefined' ) {
				this.setState( { buttons: Object.values( buttonsData ) } );
			}
		} );
	}

	setCurrentButton( button ) {
		this.setState( { currentButton: button } );
	}

	render() {
		const {
				handleSpinner,
				handleNotice,
				setCurrentButton,
				resetButtons,
				state,
				props,
			} = this,
			{ currentButton, buttons } = state,
			{ strings } = props,
			passedData = {
				spinner: handleSpinner,
				notice: handleNotice,
				setCurrentButton: setCurrentButton,
				resetButtons: resetButtons,
				buttons: buttons,
				currentButton: currentButton,
				strings: strings,
			};

		return (
			<div>
				<div
					className={ `ds-spinner ${
						this.state.spinner ? 'active' : 'hidden'
					}` }
				>
					<Spinner />
				</div>
				<TabPanel
					className="ds-tab-panel"
					activeClass="ds-active-tab"
					tabs={ [
						{
							name: 'global',
							title: strings[ 'general' ],
							className: 'ds-global-settings',
							content: <GlobalSettings />,
						},
						{
							name: 'styles',
							title: strings[ 'styles' ],
							className: 'ds-styles-settings',
							content: <StylesSettings />,
						},
						{
							name: 'emails',
							title: strings[ 'emails' ],
							className: 'ds-emails-settings',
							content: <EmailsSettings />,
						},
						{
							name: 'buttons',
							title: strings[ 'buttons' ],
							className: 'ds-buttons-settings',
							content: <ButtonsSettings data={ passedData } />,
						},
					] }
				>
					{ ( tab ) => (
						<div>
							<div
								className={ `ds-notice ${
									this.state.notice.state ? 'active' : ''
								}` }
							>
								<Notice
									status={ this.state.notice.status }
									onRemove={ this.removeNotice }
									isDismissible="true"
									shouldCloseOnClickOutside="true"
								>
									{ this.state.notice.message }
								</Notice>
							</div>
							<HorizontalRule />
							{ tab.content }
						</div>
					) }
				</TabPanel>
			</div>
		);
	}
}
