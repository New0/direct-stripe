( function( wp ) {

  var el = wp.element.createElement;
  var __ = wp.i18n.__;
  wp.blocks.registerBlockType( 'direct-stripe/stripe-button-block', {
    title: 'Direct Stripe button',
    category: 'common',
    logo: '../img/stipe-logo-black.svg',
    supportHTML: false,
    attributes: {
      type: {
        selector: 'p',
        attribute: 'type'
      }
    },
    edit: function( props ) {
      console.log(props);
      var attributes = props.attributes,
        setAttributes= props.setAttributes,
        className = props.className,
        focus = props.focus,
        id = props.id;

      //Define id to mount VueJs app into
      var vueAppIdAttr = '#block-' + id;


      //Set default for who we're saying who to.
      if( ! attributes.hasOwnProperty( 'type' ) ){
        attributes.type = 'Payment'
      }

      //Create copy of attributes to create initial state of Vue app with
      var vueInitialState = {};
      Object.keys( attributes ).forEach( function (key) {
        vueInitialState[key] =  attributes[key];
      });

      var template =  '<div class="editor-block-list__block">' +
        '<p>Type: {{type}}</p>' +
        '<input v-model="type" />' +
        '</div>';

      //create Vue app
      var APP = new Vue({
        //mount on element we're about to create with el()
        el: vueAppIdAttr,
        data: function () {
          return vueInitialState
        },
        //Use watchers to update React
        watch: {
          type: function (newValue) {
            setAttributes({ type:newValue});
          }
        },
        //template for Vue app
        template: template
      });

      //return using WordPress createElement
      return el(
        'div',
        { className: className },
        [
          el(
            'p',
            {
              className:className,
              type: attributes.type
            },
            el(
              'div',
              {
                id: vueAppIdAttr
              }
            )
          )
        ]
      );
    },
    save: function(attributes,className) {
      el(
        'p',
        {
          className:className,
          type: attributes.type
        }
      );
    }
  });
})(
  window.wp
);