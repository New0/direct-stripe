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
/**
 * Created by nfigueira on 26/05/2017.
 */
(function($){

    $( "body" ).on("mousedown", ".direct-stripe-notice .notice-dismiss", function() {

        jQuery.post(
            ajaxurl,
            {
                action: 'dismissed_notice_handler',
            }
        );
    });

})(jQuery);
/**
 * Created by nfigueira on 25/04/2017.
 */
(function($) {
//Color Picker
    jQuery('.direct-stripe-color-field').wpColorPicker();

})(jQuery);
(function($) {
    //Image Uploads
    var ds_media_init = function(selector, button_selector)  {
        var clicked_button = false;

        jQuery(selector).each(function (i, input) {
            var button = jQuery(input).next(button_selector);
            button.click(function (event) {
                event.preventDefault();
                var selected_img;
                clicked_button = jQuery(this);

                // check for media manager instance
                if(wp.media.frames.ds_frame) {
                    wp.media.frames.ds_frame.open();
                    return;
                }
                // configuration of the media manager new instance
                wp.media.frames.ds_frame = wp.media({
                      title: direct_stripe_image_script_vars.title,
                    multiple: false,
                    library: {
                        type: 'image'
                    },
                    button: {
                        text: direct_stripe_image_script_vars.message
                    }
                });

                // Function used for the image selection and media manager closing
                var ds_media_set_image = function() {
                    var selection = wp.media.frames.ds_frame.state().get('selection');

                    // no selection
                    if (!selection) {
                        return;
                    }

                    // iterate through selected elements
                    selection.each(function(attachment) {
                        var url = attachment.attributes.url;
                        clicked_button.prev(selector).val(url);
                    });
                };
                // closing event for media manager
                wp.media.frames.ds_frame.on('close', ds_media_set_image);
                // image selection event
                wp.media.frames.ds_frame.on('select', ds_media_set_image);
                // showing media manager
                wp.media.frames.ds_frame.open();
            });
       });
    };
    ds_media_init('.ds-media-input', '.ds-media-button');


})(jQuery);
