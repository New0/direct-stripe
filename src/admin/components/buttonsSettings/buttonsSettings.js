import { HorizontalRule } from '@wordpress/components';
import { CreateButton } from './createButton.js';
import { SelectButton } from './selectButton.js';

export class ButtonsSettings extends React.Component {

    render() {
        return (
            <div>
                <CreateButton data={this.props.data}/>
                <HorizontalRule />
                <SelectButton data={this.props.data}/>
            </div>
        )
    }
   
};