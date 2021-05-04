import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	Button,
	TextControl,
	SelectControl,
	HorizontalRule,
	__experimentalText as Text,
	Card,
	CardHeader,
	CardBody
} from '@wordpress/components';
import { setButtons, ModalAlert } from '../';
import { Grid, GridCell, GridRow } from '@rmwc/grid';

export class ButtonEditor extends Component {
	constructor( props ) {
		super( props );
		let currentButton;
		props.data.buttons.map( ( buttonObj ) => {
			if ( buttonObj.value == this.props.data.currentButton ) {
				currentButton = buttonObj;
			}
		} );

		this.state = {
			text:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.text !== 'undefined'
					? currentButton.text
					: '',
			value:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.value !== 'undefined'
					? currentButton.value
					: '',
			type:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.type !== 'undefined'
					? currentButton.type
					: '',
			amount:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.amount !== 'undefined'
					? currentButton.amount
					: '',
			button_id:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.button_id !== 'undefined'
					? currentButton.button_id
					: '',
			name:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.name !== 'undefined'
					? currentButton.name
					: '',
			description:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.description !== 'undefined'
					? currentButton.description
					: '',
			label:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.label !== 'undefined'
					? currentButton.label
					: '',
			panellabel:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.panellabel !== 'undefined'
					? currentButton.panellabel
					: '',
			coupon:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.coupon !== 'undefined'
					? currentButton.coupon
					: '',
			setup_fee:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.setup_fee !== 'undefined'
					? currentButton.setup_fee
					: false,
			zero_decimal:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.zero_decimal !== 'undefined'
					? currentButton.zero_decimal
					: false,
			capture:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.capture !== 'undefined'
					? currentButton.capture
					: false,
			billing:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.billing !== 'undefined'
					? currentButton.billing
					: false,
			shipping:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.shipping !== 'undefined'
					? currentButton.shipping
					: false,
			tc:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.tc !== 'undefined'
					? currentButton.tc
					: false,
			rememberme:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.rememberme !== 'undefined'
					? currentButton.rememberme
					: false,
			display_amount:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.display_amount !== 'undefined'
					? currentButton.display_amount
					: true,
			currency:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.currency !== 'undefined'
					? currentButton.currency
					: 'USD',
			locale:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.locale !== 'undefined'
					? currentButton.locale
					: 'auto',
			custom_role:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.custom_role !== 'undefined'
					? currentButton.custom_role
					: '',
			success_query:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.success_query !== 'undefined'
					? currentButton.success_query
					: '',
			error_query:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.error_query !== 'undefined'
					? currentButton.error_query
					: '',
			success_url:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.success_url !== 'undefined'
					? currentButton.success_url
					: '',
			error_url:
				typeof currentButton !== 'undefined' &&
				typeof currentButton.error_url !== 'undefined'
					? currentButton.error_url
					: '',
			isDeletionModalOpen: false,
		};
		this.setButtonSettingState = this.setButtonSettingState.bind( this );
		this.setButton = this.setButton.bind( this );
		this.openDeletionModal = this.openDeletionModal.bind( this );
		this.closeDeletionModal = this.closeDeletionModal.bind( this );
	}

	componentDidUpdate( nextProps ) {
		if ( nextProps.data.currentButton !== this.props.data.currentButton ) {
			this.setCurrentButtonObj();
		}
	}

	setCurrentButtonObj() {
		this.props.data.buttons.map( ( buttonObj ) => {
			if ( buttonObj.value === this.props.data.currentButton ) {
				for ( const [ key, value ] of Object.entries( buttonObj ) ) {
					this.setButtonSettingState( key, value );
				}
			}
		} );
	}

	setButtonSettingState( set, value ) {
		this.setState( { [ set ]: value } );
	}

	setButton( button, actions, isDelete ) {
		if ( typeof button === 'undefined' || button === '' ) {
			actions.notice( {
				state: true,
				status: 'warning',
				message: __( 'The button is not set values', 'direct-stripe' ),
			} );
		} else {
			actions.spinner();

			delete button.isDeletionModalOpen;

			const buttonValues = {
				id: button.value,
				data: JSON.stringify( button ),
			};

			setButtons( buttonValues, actions, isDelete );
		}
	}

	openDeletionModal() {
		this.setState( { isDeletionModalOpen: true } );
	}

	closeDeletionModal() {
		this.setState( { isDeletionModalOpen: false } );
	}

	render() {
		const {
				props,
				state,
				setButtonSettingState,
				setButton,
				openDeletionModal,
				closeDeletionModal,
			} = this,
			{ isDeletionModalOpen } = state,
			{ data } = props,
			{ strings } = data,
			actions = {
				resetButtons: data.resetButtons,
				spinner: data.spinner,
				notice: data.notice,
				setCurrentButton: data.setCurrentButton,
			};

		const saveButton = (
			<Button
				className="ds-save-button"
				isPrimary="true"
				onClick={ () => setButton( state, actions, false ) }
			>
				{ strings.saveButton }
			</Button>
		);

		const buttonControls = (
			<Card
				className="ds-createButtonCard dsMTB-1"
				size="small"
				isElevated="true"
				isBorderless="true"
			>
				<CardHeader>
					<Text variant="subtitle.small">
						{strings.buttonControlsTitle}
						</Text>
				</CardHeader>
				<CardBody>
					{saveButton}
					<Button
						className="ds-delete-button"
						isSecondary
						onClick={openDeletionModal}
					>
						{ strings.deleteButton }
					</Button>
				</CardBody>

			</Card>
		);

		return (
			<>
				<Grid>
					<GridRow>
						<GridCell align="middle" tablet={ 12 } desktop={ 6 }>
							<GridRow className="dsMTB-2" align="left">
								<GridCell align="middle" tablet={ 12 } desktop={ 3 }>
									<Text variant="subtitle.small">
										{ strings.valueIDLabel } :
									</Text>
								</GridCell>
								<GridCell align="middle" tablet={ 12 } desktop={ 9 }>
									<Text variant="subtitle.small">
										{ state.value }
									</Text>
								</GridCell>
							</GridRow>
							<GridRow>
								<GridCell align="middle" tablet={ 12 } desktop={ 3 }>
									<Text
										variant="subtitle.small"
										as="label"
										htmlFor="dsButtonName"
									>
										{ strings.buttonName } :
									</Text>
								</GridCell>
								<GridCell align="middle" tablet={ 12 } desktop={ 9 }>
									<TextControl
										className="dsMax-W15R"
										id="dsButtonName"
										value={ state.text }
										onChange={ ( value ) =>
											setButtonSettingState(
												'text',
												value
											)
										}
									/>
								</GridCell>
							</GridRow>
						</GridCell>
						<GridCell align="middle" tablet={ 12 } desktop={ 6 }>
							{buttonControls}
						</GridCell>
					</GridRow>
					<HorizontalRule />
					<GridRow className="dsMTB-2">
						<GridCell align="middle" span={ 12 }>
							<Text variant="title.small" as="h3">
								{ strings.buttonMainOptions }
							</Text>
						</GridCell>
					</GridRow>
					<GridRow>
						<GridCell align="top" tablet={ 12 } desktop={ 4 }>
							<SelectControl
								label={ strings.selectButtonType }
								value={ state.type }
								onChange={ ( value ) => 
									setButtonSettingState( 'type', value )
								}
								options={ [
									{ value: 'payment', label: strings.dsPaymentType },
									{
										value: 'subscription',
										label: strings.dsSubscriptionType,
									},
									{ value: 'donation', label: strings.dsDonationType, },
								] }
							/>
						</GridCell>
						<GridCell align="top" tablet={ 12 } desktop={ 4 }>
							{ state.type === 'donation' ? strings.valueDonationLabel :
								<TextControl					
									help={state.type === 'subscription' ? strings.valueAmountHint : ""}
									label={
										state.type === 'payment'
											? strings.valueAmountLabel
											: strings.valueSubscriptionLabel
									}
									value={ state.amount }
									onChange={ ( value ) => 
										setButtonSettingState(
											'amount',
											value
										)
									}
								/>
							}
						</GridCell>
						<GridCell align="top" tablet={ 12 } desktop={ 4 }>
							<TextControl					
								label={strings.valueCSSIDLabel}
								value={ state.button_id }
								onChange={ ( value ) => 
									setButtonSettingState(
										'button_id',
										value
									)
								}
							/>
						</GridCell>
					</GridRow>
					
					<HorizontalRule />
					<GridRow>{ saveButton }</GridRow>
				</Grid>
				{ isDeletionModalOpen && (
					<ModalAlert
						title={ strings.titDeleteButton }
						closeModal={ closeDeletionModal }
						closeModalText={ strings.cancel }
						modalAction={ () => {
							setButton( state, actions, true );
						} }
						modalActionText={ strings.deleteButton }
						text={ {
							first: strings.defDeleteButton,
							second: strings.queDeleteButton,
						} }
					/>
				) }
			</>
		);
	}
}
