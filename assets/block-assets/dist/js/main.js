const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, InspectorControls } = wp.blocks; // Import registerBlockType() from wp.blocks
const { SelectControl } = InspectorControls;
const { Component } = wp.element;

const withAPIData = wp.components.withAPIData;

  registerBlockType( 'direct-stripe/payment-button', {
    title: 'Stripe Payment Button',
    icon: 'money',
    category: 'common',

    edit: withAPIData( function() {
      return {
        buttons: '/direct-stripe/v1/buttons'
      };
    } )( function( props ) {

      let attributes = props.attributes,
          setAttributes = props.setAttributes,
          className = props.className,
          id = props.id;

      if ( ! props.buttons.data ) {
        return "loading !";
      }
      if ( props.buttons.data.length === 0 ) {
        return "No buttons";
      }

      const Buttons = Object.values( props.buttons.data );


    //return using WordPress createElement
      return 'ok';
    }),

    save: function(props) {

      return 'ok';
    }

  });

