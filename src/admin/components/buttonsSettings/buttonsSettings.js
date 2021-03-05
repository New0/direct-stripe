import { HorizontalRule } from '@wordpress/components';
import { CreateButton, SelectButton, ButtonEditor   } from './';

export const ButtonsSettings = ( props ) => {

	const { data } = props;
	const { currentButton, buttons, setButton } = data;

	return (
		<div>
			<CreateButton 
				data={ data }
			/>
			<HorizontalRule />
			<SelectButton 
				setButton={setButton} 
				currentButton={currentButton}
				buttons={buttons}
			/>
			<ButtonEditor />
		</div>
	);
	
}
