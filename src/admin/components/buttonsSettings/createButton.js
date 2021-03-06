import { Component } from '@wordpress/element';
import { Button, TextControl, Card, CardBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { setButtons } from '../';

export class CreateButton extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			buttonName: '',
		};

		this.setButton = this.setButton.bind( this );
		this.setButtonName = this.setButtonName.bind( this );
	}

	setButtonName( value ) {
		this.setState( { buttonName: value } );
	}

	setButton( buttonName, actions ) {
		if ( typeof buttonName === 'undefined' || buttonName === '' ) {
			actions.notice( {
				state: true,
				status: 'warning',
				message: __(
					'Define a button name before creating it',
					'direct-stripe'
				),
			} );
		} else {
			actions.spinner();

			function uniqueNumber() {
				let date = Date.now();
				if ( date <= uniqueNumber.previous ) {
					date = ++uniqueNumber.previous;
				} else {
					uniqueNumber.previous = date;
				}
				return date;
			}
			uniqueNumber.previous = 0;
			function ID() {
				return uniqueNumber();
			}

			let buttonID = 'ds' + ID();

			const buttonValues = {
				id: buttonID,
				data: JSON.stringify( {
					text: buttonName,
					value: buttonID,
					type: 'payment',
					amount: 1000,
					button_id: buttonID,
					name: __( 'Company Name', 'direct-stripe' ),
					description: __( 'Description', 'direct-stripe' ),
					label: __( 'Payment', 'direct-stripe' ),
					panellabel: __( 'Confirm payment', 'direct-stripe' ),
					coupon: '',
					setup_fee: '',
					zero_decimal: false,
					capture: true,
					billing: false,
					shipping: false,
					tc: false,
					rememberme: false,
					display_amount: false,
					currency: 'USD',
					locale: 'auto',
				} ),
			};

			setButtons( buttonValues, actions, false );
		}
	}

	componentWillUnmount() {
		this.props.data.notice( { state: false } );
	}

	render() {
		const { data } = this.props,
			{ buttonName } = this.state,
			actions = {
				resetButtons: data.resetButtons,
				spinner: data.spinner,
				notice: data.notice,
			};

		return (
			<div>
				<Card
					className="ds-createButtonCard"
					size="small"
					isElevated="true"
					isBorderless="true"
				>
					<CardBody>
						<TextControl
							label={ data.strings.createButtonsTitle }
							value={ buttonName }
							onChange={ ( value ) =>
								this.setButtonName( value )
							}
						/>
					</CardBody>
					<CardBody>
						<Button
							isPrimary="true"
							onClick={ () =>
								this.setButton( buttonName, actions )
							}
						>
							{ data.strings.createButtons }
						</Button>
					</CardBody>
				</Card>
			</div>
		);
	}
}
