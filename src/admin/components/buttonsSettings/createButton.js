import { Component } from '@wordpress/element';
import {
	Button,
	TextControl,
	Card,
	CardBody
} from '@wordpress/components';
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
				} ),
			};

			setButtons( buttonValues, actions );

		}
	}

    componentWillUnmount() {
        this.props.data.notice({ state: false });
    }

	render() {
		const { data } = this.props;
		const { buttonName } = this.state;

		const actions = {
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
