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
