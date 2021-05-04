import {
	HorizontalRule,
	__experimentalText as Text,
} from '@wordpress/components';
import { CreateButton, SelectButton, ButtonEditor } from './';

export const ButtonsSettings = ( props ) => {
	const { data } = props;
	const { currentButton, buttons } = data;

	return (
		<div>
			<CreateButton data={ data } />
			<HorizontalRule />
			{ typeof buttons !== 'undefined' && buttons.length > 0 && (
				<SelectButton data={ data } />
			) }
			{ typeof currentButton !== 'undefined' &&
			currentButton.length > 0 ? (
				<ButtonEditor data={ data } />
			) : (
				<Text variant="subtitle" as="h4">
					{ data.strings.currentlySelectedNo }
				</Text>
			) }
		</div>
	);
};
