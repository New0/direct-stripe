<?php
/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 14/04/2017
 * Time: 11:48
 */
class dsScripts {

    public function __construct() {
        //Load admin scripts
        add_action('admin_enqueue_scripts', array($this, 'direct_stripe_load_admin_scripts' ) );
        //Styles and Script for ajax handling
        add_action( 'wp_enqueue_scripts', array( $this, 'direct_stripe_scripts' ) );
    }

    /**
     * Load admin Scripts
     *
     * @since 2.0.0
     */
    function direct_stripe_load_admin_scripts( $hook ) {

        $screen = get_current_screen();
        if( $screen->id === 'toplevel_page_direct_stripe' ){

            wp_enqueue_style( 'ds-vuetify', DSCORE_URL . 'admin-app/src/assets/css/vuetify.css' );
            wp_enqueue_style( 'direct-stripe-admin-app-icons', DSCORE_URL . 'admin-app/src/assets/css/material-design-icons.css' );
            wp_enqueue_style('wp-color-picker');
            wp_enqueue_media();
            wp_enqueue_script('direct-stripe-admin-app', DSCORE_URL . 'admin-app/dist/build.js', array('jquery', 'wp-color-picker'), ('0.0.1'), true );
            wp_localize_script('direct-stripe-admin-app', 'ds_admin_app_vars', self::direct_stripe_localization() );
            /*
            wp_enqueue_style( 'direct-stripe-admin-style', DSCORE_URL . 'assets/admin/dist/css/style.css', array( 'wp-blocks' ) );

            wp_enqueue_style('wp-color-picker');
            wp_enqueue_script('direct-stripe-admin-script', DSCORE_URL . 'assets/admin/dist/js/main.min.js', array( 'jquery', 'wp-color-picker', 'vue', 'ds-vuetify' ), ('1.0.0'), true );
            wp_localize_script('direct-stripe-admin-script', 'direct_stripe_image_script_vars', array(
                    'title' => __('Logo for Stripe Form', 'direct-stripe'),
                    'message' => __('Use selected image', 'direct-stripe')
                )
            );*/

        }

    }

    /**
     * Styles and Handles ajax request of button
     *
     * @since 2.0.0
     */
    function direct_stripe_scripts() {

        wp_enqueue_style( 'direct-stripe-style', DSCORE_URL . 'assets/public/dist/css/style.css' );
        include( DSCORE_PATH . 'includes/styles.php');
        wp_add_inline_style( 'direct-stripe-style', $custom_css );
        
	    wp_register_script('direct-stripe-checkout-script',  '//checkout.stripe.com/checkout.js' );
        wp_register_script('direct-stripe-handler-script', DSCORE_URL . 'assets/public/dist/js/main.min.js', array('jquery' ), false, false);

    }

    /**
     * Texts for js files
     *
     * @since 2.0.0
     */
    function direct_stripe_localization() {
        return array(
            'strings' => array(
                'settingSaved'          =>  __( 'Saved', 'direct-stripe' ),
                'settingError'          =>  __( 'Error', 'direct-stripe' ),
                'textSelect'            =>  __( 'Select', 'direct-stripe' ),
                'general'               =>  __( 'Global Settings', 'direct-stripe' ),
                'styles'                =>  __( 'Styles Settings', 'direct-stripe' ),
                'emails'                =>  __( 'Emails Settings', 'direct-stripe' ),
                'buttons'               =>  __( 'Buttons Settings', 'direct-stripe' ),
                'setApiKeys'            =>  __( 'Set API keys', 'direct-stripe' ),
                'livePKey'              =>  __( 'Live Publishable API key', 'direct-stripe' ),
                'liveSKey'              =>  __( 'Live Secret API key', 'direct-stripe' ),
                'useTestKeys'           =>  __( 'Use test keys / mode', 'direct-stripe' ),
                'testLink'              =>  __(  'Enable test mode and use test card numbers'),
                'testKeyNumber'         =>  __( 'Ex: Visa card test number 4242 4242 4242 4242', 'direct-stripe' ),
                'testKeyCvv'            =>  __( 'With any exp date and 3 CVV numbers', 'direct-stripe' ),
                'testPKey'              =>  __( 'Test Publishable API key', 'direct-stripe' ),
                'testSKey'              =>  __( 'Test Secret API key', 'direct-stripe' ),
                'currency'              =>  __( 'Currency', 'direct-stripe' ),
                'bubbleMessages'        =>  __( 'Success and error messages', 'direct-stripe' ),
                'successBubble'         =>  __( 'Success message', 'direct-stripe' ),
                'editSuccessBubble'     =>  __( 'Successful transaction', 'direct-stripe' ),
                'errorBubble'           =>  __( 'Error message', 'direct-stripe' ),
                'editErrorBubble'       =>  __( 'Something went wrong...', 'direct-stripe' ),
                'redirection'           =>  __( 'Redirect users to success or error pages when transaction completed', 'direct-stripe' ),
                'selectSuccessPage'     =>  __( 'Select success page', 'direct-stripe' ),
                'successPage'           =>  __( 'Success page', 'direct-stripe' ),
                'selectErrorPage'       =>  __( 'Select error page', 'direct-stripe' ),
                'errorPage'             =>  __( 'Error page', 'direct-stripe' ),
                'modalFormLogo'         =>  __( 'Modal form logo / image', 'direct-stripe' ),
                'selectImage'           =>  __( 'Select image', 'direct-stripe' ),
                'currentImage'          =>  __( 'Current logo / image', 'direct-stripe' ),
                'wpMediaTitle'          =>  __( 'Select or Upload Media Of Your Chosen Persuasion', 'direct-stripe' ),
                'wpMediaButton'         =>  __( 'Use this media', 'direct-stripe' ),
                'removeImage'           =>  __( 'Remove Image', 'direct-stripe' ),
                'altAttachment'         =>  __( 'Image for Modal Form', 'direct-stripe' ),
                'billingInformation'    =>  __( 'Billing information', 'direct-stripe' ),
                'billingAddress'        =>  __( 'Ask for address in modal Form', 'direct-stripe' ),
                'shippingAddress'       =>  __( 'Add shipping address option (billing address is always asked for when the shipping address option is enabled)', 'direct-stripe' ),
                'rememberMe'            =>  __( 'Allow remember me Stripe option in modal Form', 'direct-stripe' ),
                'customButtonStyles'    =>  __( 'Custom button styles', 'direct-stripe' ),
                'stylesRadioNo'         =>  __( 'Do not set styles', 'direct-stripe' ),
                'styleRadioStripe'      =>  __( 'Use default stripe styles', 'direct-stripe' ),
                'styleRadioDS'          =>  __( 'Use styles set below', 'direct-stripe' ),
                'chooseButtonStyles'    =>  __( 'Choose button styles', 'direct-stripe' ),
                'mainColor'             =>  __( 'Main Color', 'direct-stripe' ),
                'borderRadius'          =>  __( 'Border radius', 'direct-stripe' ),
                'termsAndConditions'    =>  __( 'Terms and conditions', 'direct-stripe' ),
                'useTC'                 =>  __( 'Use Terms and Conditions checkbox', 'direct-stripe' ),
                'selectTCPage'          =>  __( 'Select T&C page', 'direct-stripe' ),
                'tcText'                =>  __( 'Terms and conditions text', 'direct-stripe' ),
                'tcTextLinked'          =>  __( 'Terms and conditions link text', 'direct-stripe' ),
                'tcPage'                =>  __( 'Terms and conditions page', 'direct-stripe' ),
                'successAdminEmailTitle'=>  __( 'Automated emails to admin after successful transactions', 'direct-stripe' ),
                'checkSAE'              =>  __( 'Send emails to admin after successful transaction', 'direct-stripe' ),
                'adminSEmailSubject'    =>  __( 'Admin email subject', 'direct-stripe' ),
                'adminSEmailContent'    =>  __( 'Admin email content', 'direct-stripe' ),
                'successUserEmailTitle' =>  __( 'Automated emails to Stripe user after successful transactions', 'direct-stripe' ),
                'checkSUE'              =>  __( 'Send emails to Stripe user after successful transaction', 'direct-stripe' ),
                'userSEmailSubject'     =>  __( 'User email subject', 'direct-stripe' ),
                'userSEmailContent'     =>  __( 'User email content', 'direct-stripe' ),
                'errorAdminEmailTitle'  =>  __( 'Automated emails to admin after failed transaction', 'direct-stripe' ),
                'checkEAE'              =>  __( 'Send emails to admin after failed transaction', 'direct-stripe' ),
                'adminEEmailSubject'    =>  __( 'Admin error email subject', 'direct-stripe' ),
                'adminEEmailContent'    =>  __( 'Admin error email content', 'direct-stripe' ),
                'errorUserEmailTitle'   =>  __( 'Automated emails to Stripe user after failed transaction', 'direct-stripe' ),
                'checkEUE'              =>  __( 'Send emails to Stripe user after failed transaction', 'direct-stripe' ),
                'userEEmailSubject'     =>  __( 'User error email subject', 'direct-stripe' ),
                'userEEmailContent'     =>  __( 'User error email content', 'direct-stripe' ),
            ),
            'dsCorePath'    => DSCORE_PATH,
            'dsCoreUrl'     => DSCORE_URL,
            'api'   => array(
                'settings'      =>  esc_url_raw( rest_url( 'direct-stripe/v1/settings' ) ),
                'buttons'       =>  esc_url_raw( rest_url( 'direct-stripe/v1/buttons' ) ),
                'nonce'         =>  wp_create_nonce( 'ds_rest' ),
                'pages'         =>  esc_url_raw( rest_url( 'wp/v2/pages' ) ),
            )
        );
    }

}
$dsScripts = new dsScripts;