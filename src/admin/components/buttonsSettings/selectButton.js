import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const SelectButton = ( props ) => {
	
	return ( <SelectControl
			className="ds-select-current-button"
			label={ __( 'Select Button', 'direct-stripe' ) }
			value={ props.currentButton }
			options={ props.buttons }
			onChange={ ( value ) => {
				props.setButton( value );
			} }
		/>
	);
}
