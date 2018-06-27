const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  RichText,
  BlockControls,
  AlignmentToolbar,
} = wp.editor;
const { withAPIData } = wp.components;
/*let Buttons = [];
jQuery.ajax({
  url: ds_admin_block_vars.api.buttons,
}).done(function( response ) {
  Buttons = Object.values( response );
});
*/

registerBlockType( 'direct-stripe/payment-button', {
  title: ds_admin_block_vars.strings.title,
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
        label: ds_admin_block_vars.strings.contentDefault
      }
    },
    value: {
      type: 'string',
      default: '0'
    }
  },

  edit: withAPIData( props => {
      const { isSelected, attributes, setAttributes } = props;
      const { alignment, buttonItem, content, value } = attributes;

      let apiButtons = ds_admin_block_vars.api.buttons;
      let Buttons = Object.values( apiButtons );
    console.log( apiButtons );
    console.log( Buttons );
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

  }),

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