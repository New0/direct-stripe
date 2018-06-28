const { registerBlockType } = wp.blocks;
const {
  RichText,
  BlockControls,
  AlignmentToolbar,
} = wp.editor;
const {
  withAPIData,
  Spinner
} = wp.components;


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
      default: 'none'
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
    return {
      apiButtons: '/direct-stripe/v1/buttons'
    };
  } )(  ( { apiButtons, isSelected, attributes, setAttributes, className } ) => {
      //const { isSelected, attributes, setAttributes } = props;
      const { alignment, buttonItem, content, value } = attributes;

      if ( ! apiButtons.data ) {
        return (
          <p className={className} >
            <Spinner />
            { ds_admin_block_vars.strings.loading }
        </p>
        );
      }
      if ( 0 === apiButtons.data.length ) {
        return (
          ds_admin_block_vars.strings.noData
        );
      }

      let Buttons = [];
      Buttons = Object.values( apiButtons.data );

      const onChangeButton = updatedButton => {
        setAttributes({buttonItem: updatedButton.target.value});
        const newContent = Buttons.filter(button => button.value === updatedButton.target.value);
        if( typeof newContent[0] !== 'undefined' ) {
          setAttributes({content: newContent[0]});
          setAttributes({value: newContent[0]['value']});
        }
      }

      const onChangeAlignment =  updatedAlignment =>  {
        setAttributes( { alignment: updatedAlignment } );
      }

      return [
                isSelected && (
                <BlockControls key="controls">
                   <select class={className} value={value} onChange={onChangeButton}>
                      <option>{ds_admin_block_vars.strings.selectButton}</option>
                      {Buttons.map(item => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                    <AlignmentToolbar
                    value={alignment}
                    onChange={onChangeAlignment}
                    />
                </BlockControls>
              ),
            <div style={ { textAlign: alignment } }>
              <button class={className} value={content.value}>{content.label}</button>
            </div>
          ];

  }),

  save: props => {
    return null;
  }

} );