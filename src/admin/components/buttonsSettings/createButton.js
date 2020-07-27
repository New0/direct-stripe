import { Button, TextControl, Card, CardBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { setButtons }  from '../settings-api';

export class CreateButton extends React.Component {

    constructor(props)
    {
        super(props);
        
        this.state = {
            buttonName: "Button Name"
        }
     
    }

    setButton( buttonName, actions ) { 

        if(typeof buttonName === "undefined" || buttonName === "" ){
            actions.notice(
				{
					state: true,
					status: "warning",
					message: __("Define a button name before creating it", "direct-stripe")
				}
			);
        } else {

            actions.spinner();

            function uniqueNumber() {
                let date = Date.now();
                if (date <= uniqueNumber.previous) {
                    date = ++uniqueNumber.previous;
                } else {
                    uniqueNumber.previous = date;
                }
                return date;
            }
            uniqueNumber.previous = 0;
            function ID(){
                return uniqueNumber();
            }
    
            let buttonID = "ds" + ID();
            
            const buttonValues = { 
                "id": buttonID, 
                "data": JSON.stringify({ 
                    "text": buttonName, 
                    "value": buttonID
                })
            }
    
            setButtons( buttonValues, actions );
        }  
         
    }

    render() {

        const actions = {
            spinner:  this.props.data.spinner,
            notice: this.props.data.notice
        }

        return (
            <div>
                 <Card className="ds-createButtonCard" size="small" isElevated="true" isBorderless="true">
                    <CardBody>
                        <TextControl
                            label={ __("Name of button to create", "direct-stripe") }
                            value={ this.state.buttonName }
                            onChange={ ( value ) => this.setState( { buttonName: value } ) }
                        />
                    </CardBody>
                    <CardBody>
                        <Button 
                            isPrimary="true" 
                            onClick={ () => this.setButton( this.state.buttonName, actions ) }
                        >{ __("Create New Button", "direct-stripe") }</Button>
                    </CardBody>
                </Card>
            </div>
        
        )
    }

}