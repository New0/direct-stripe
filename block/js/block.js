const { __ } = wp.i18n;
const { registerBlockType, BlockControls, AlignmentToolbar, RichText } = wp.blocks;

let Buttons = [];
jQuery.ajax({
  url: ds_admin_block_vars.api.buttons,
}).done(function( response ) {
  Buttons = Object.values( response );
});

registerBlockType( 'direct-stripe/payment-button', {
  title: __( 'Stripe Payment button' ),
  category: 'common',
  icon: 'money',
  attributes: {
    buttonItem: {
      type: 'string'
    },
    alignment: {
      type: 'string',
    },
    content: {
      type: 'object',
      default: {
        label: __('Button not set')
      }
    },
    value: {
      type: 'string',
      default: '0'
    }
  },

  edit: props => {
      const { isSelected, attributes, setAttributes } = props;
      const { alignment, buttonItem, content, value } = attributes;

      const onChangeButton = updatedButton => {
        setAttributes({buttonItem: updatedButton.target.value});
        const newContent = Buttons.filter(button => button.value === updatedButton.target.value);
        setAttributes({content: newContent[0]});
        setAttributes({value: newContent[0]['value']});
      }

      const onChangeAlignment =  updatedAlignment =>  {
        setAttributes( { alignment: updatedAlignment } );
      }

      return [
                isSelected && (
                <BlockControls key="controls">
                   <select value={value} onChange={onChangeButton}>
                      <option>Select Button</option>
                      {Buttons.map(item => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                </BlockControls>
              ),
            <button value={content.value}>{content.label}</button>
          ];

  },

  save: props => {
    return null;
  }

} );

/*  Alignment Toolbar to return
 <!-- <AlignmentToolbar
    value={alignment}
    onChange={onChangeAlignment}
  /> -->
*/