import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withState } from '@wordpress/compose';
import { getButtons }  from '../settings-api';

export class SelectButton extends React.Component {

    constructor(props) {
        super(props);
        

        this.state = { button: this.props.data.buttons( getButtons() ) };
    }
    

     render() {

        console.log( getButtons() );
        const ButtonSelectControl = withState( {
            button: this.state.button,
        } )( ( { button, setState } ) => (
            <SelectControl
                label={ __("Select Button", "direct-stripe") }
                value={ button }
                options={ [
                    {'label': "1", "value": "value1"},
                    {'label': "2", "value": "value2"} 
                ] }
                onChange={ ( value ) => { setState( { button: value } ) } }
            />
        ) );

        return (  
            <ButtonSelectControl />
        )
    }

}