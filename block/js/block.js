const { registerBlockType } = wp.blocks;
const { apiFetch } = wp;
const {
  RichText,
  BlockControls,
  AlignmentToolbar
} = wp.editor;
const { Spinner } = wp.components;
const { Component } = wp.element;

/** Component used for edit function **/
class setStripeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiButtons: {},
      isLoading: false,
      error: false,
      dsSettings: {},
      buttonClass: ''
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    apiFetch( { path: 'direct-stripe/v1/buttons'} )
      .then( response => {
          this.setState({ apiButtons: response });
          this.setState({ isLoading: false });
        }
      )
      .catch( error => {
        console.log(error);
        this.setState({ error: true });
      });
    apiFetch( { path: 'direct-stripe/v1/settings'} )
      .then( response => {
          const style = response.direct_stripe_use_custom_styles;
          if( style  === '1' ) {
            this.setState({ buttonClass: 'direct-stripe-button direct-stripe-button-id ' });
          } else if( style === '2' ) {
            this.setState({ buttonClass: 'original-stripe-button direct-stripe-button-id ' });
          } else {
            this.setState({ buttonClass:  'stripe-button-ds direct-stripe-button-id ' });
          }
      })
      .catch( error => {
        console.log(error);
      });
  }

  render()  {
    const { buttonClass, apiButtons, isLoading, error } = this.state;
    const { className, isSelected, attributes, setAttributes } = this.props;
    const { alignment, buttonItem, content, value } = attributes;

    if (isLoading) {
      return (
        <p className={className}>
          <Spinner/>
          {ds_admin_block_vars.strings.loading}
        </p>
      );
    }
    if (error) {
      return (
        ds_admin_block_vars.strings.noData
      );
    }

    const onChangeButton = updatedButton => {
      setAttributes({buttonItem: updatedButton.target.value});
      const newContent = Buttons.filter(button => button.value === updatedButton.target.value);
      if (typeof newContent[0] !== 'undefined') {
        setAttributes({content: newContent[0]});
        setAttributes({value: newContent[0]['value']});
      }
    }

    const onChangeAlignment = updatedAlignment => {
      setAttributes({alignment: updatedAlignment});
    }

    let Buttons = [];
    Buttons = Object.values( apiButtons );

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
      <div style={{textAlign: alignment}}>
        <button class={buttonClass} value={content.value}>{content.label}</button>
      </div>
    ];
  }

}

/** Block parameters **/
registerBlockType( 'direct-stripe/direct-stripe-button', {
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

  edit: setStripeButton,

  save: props => {
    return null;
  }

} );