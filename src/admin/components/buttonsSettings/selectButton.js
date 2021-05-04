import {
	SelectControl,
	__experimentalText as Text,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const SelectButton = ( props ) => {
	if (
		typeof props.data.buttons !== 'undefined' &&
		Object.keys( props.data.buttons[ 0 ] ).length > 0
	) {
		props.data.buttons.unshift( {} );
	}

	if ( typeof props.data.buttons !== 'undefined' ) {
		Object.values( props.data.buttons ).map( ( data ) => {
			if ( typeof data.text !== 'undefined' ) {
				data.label = data.text;
			}
		} );
	}

	const selectLabel = (
		<Text variant="title">{ props.data.strings.selectButton }</Text>
	);

	return (
		<>
			<Text variant="title.small" as="h3">
				{ props.data.strings.editButtonTitle }
			</Text>
			<SelectControl
				className="ds-select-current-button"
				label={ selectLabel }
				value={ props.data.currentButton }
				options={ props.data.buttons }
				onChange={ ( value ) => {
					props.data.setCurrentButton( value );
				} }
			/>
		</>
	);
};
