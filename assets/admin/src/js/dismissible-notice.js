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