<?php
class DS_API_Settings {
    /**
     * Option key to save general settings
     *
     * @var string
     */
    protected static $ds_general_key = 'direct_stripe_general_settings';
    /**
     * Option key to save styles settings
     *
     * @var string
     */
    protected static $ds_styles_key = 'direct_stripe_styles_settings';
    /**
     * Option key to save emails settings
     *
     * @var string
     */
    protected static $ds_emails_key = 'direct_stripe_emails_settings';
    /**
     * Option key to save buttons settings
     *
     * @var string
     */
    protected static $ds_buttons_key = 'direct_stripe_buttons';
    /**
     * Default global settings
     *
     * @var array
     */
    protected static $empty = array( '0' => 'No Options saved' );
    /**
     * Default global settings
     *
     * @var array
     */
    protected static $ds_general_defaults = array(
        'direct_stripe_publishable_api_key'    =>  '',
        'direct_stripe_secret_api_key'         =>  '',
        'direct_stripe_checkbox_api_keys'           =>  '',
        'direct_stripe_test_publishable_api_key'    =>  '',
        'direct_stripe_test_secret_api_key'         =>  '',
        'direct_stripe_currency'                    =>  '',
        'direct_stripe_success_message'             =>  '',
        'direct_stripe_error_message'               =>  '',
        'direct_stripe_use_redirections'            =>  '',
        'direct_stripe_success_page'                =>  '',
        'direct_stripe_error_page'                  =>  '',
        'direct_stripe_logo_image'                  =>  '',
        'direct_stripe_check_records'               =>  '',
        'direct_stripe_billing_infos_checkbox'      =>  '',
        'direct_stripe_shipping_infos_checkbox'     =>  '',
        'direct_stripe_rememberme_option_checkbox'  =>  ''
    );
    /**
     * Default  styles settings
     *
     * @var array
     */
    protected static $ds_styles_defaults = array(
        'direct_stripe_use_custom_styles'           =>  '',
        'direct_stripe_main_color_style'            =>  '',
        'direct_stripe_border_radius'               =>  '',
        'direct_stripe_use_tc_checkbox'             =>  '',
        'direct_stripe_tc_text'                     =>  '',
        'direct_stripe_tc_link_text'                =>  '',
        'direct_stripe_tc_link'                     =>  '',
        'direct_stripe_tc_error_bubble'             =>  ''
    );
    /**
     * Default emails settings
     *
     * @var array
     */
    protected static $ds_emails_defaults = array(
        'direct_stripe_admin_emails_checkbox'       =>  '',
        'direct_stripe_admin_email_subject'         =>  '',
        'direct_stripe_admin_email_content'         =>  '',
        'direct_stripe_user_emails_checkbox'        =>  '',
        'direct_stripe_user_email_subject'          =>  '',
        'direct_stripe_user_email_content'          =>  '',
        'direct_stripe_admin_error_emails_checkbox' =>  '',
        'direct_stripe_admin_error_email_subject'   =>  '',
        'direct_stripe_admin_error_email_content'   =>  '',
        'direct_stripe_user_error_emails_checkbox'  =>  '',
        'direct_stripe_user_error_email_subject'    =>  '',
        'direct_stripe_user_error_email_content'    =>  ''
    );
    /**
     * Default settings
     *
     * @var array
     */
    public static function defaults() {

        $defaults = array_merge( self::$ds_general_defaults, self::$ds_styles_defaults, self::$ds_emails_defaults );

        return $defaults;
    }
    /**
     * Merge all saved settings
     *
     * @return array
     */
    public static function merge_saved_settings() {

        $ds_general = get_option( self::$ds_general_key, array() );
        $ds_styles = get_option( self::$ds_styles_key, array() );
        $ds_emails = get_option( self::$ds_emails_key, array() );

        $saved = array_merge($ds_general, $ds_styles, $ds_emails );

        return $saved;
    }
    /**
     * Get saved settings
     *
     * @return array
     */
    public static function get_settings(){

        $saved = self::merge_saved_settings();
        $defaults = self::defaults();

        if( ! is_array( $saved ) || empty( $saved )){
            return $defaults;
        }
        return wp_parse_args( $saved, $defaults );
    }
    /**
     * Get saved buttons
     *
     * @return array
     */
    public static function get_buttons(){
        $example = json_decode( '{ 
            "text": "Example button", 
            "value": 0, 
            "type":"payment",
            "amount": "1000",
            "button_id": "MyButton", 
            "name": "Company Name"
            "description": "Description",
            "label": "Payment",
            "panellabel": "Confirm payment", 
            "coupon": "",
            "setup_fee": "",
            "zero_decimal": false,
            "capture": true,
            "billing": false,
            "shipping": false,
            "tc": false,
            "rememberme": false,
            "display_amount": false,
            "currency": "USD",
            "custom_role": "",
            "success_query": "",
            "error_query": "",
            "success_url": "",
            "error_url": ""
        }' );

        $saved = get_option( self::$ds_buttons_key, array( 'ds-0' => $example ) );

        if( ! is_array( $saved ) || empty( $saved )){
            return self::$empty;
        }
        return $saved;
    }

    /**
     * Save settings
     *
     * Array keys must be whitelisted (IE must be keys of self::$defaults
     *
     * @param array $settings
     */
    public static function save_settings( $settings ){

        if( get_option( self::$ds_general_key, array() ) ) {
            $saved_general = get_option( self::$ds_general_key, array() );
            $ds_general =  wp_parse_args( $saved_general, self::$ds_general_defaults );
        } else {
            $ds_general = self::$ds_general_defaults;
        }
        if( get_option( self::$ds_styles_key, array() ) ) {
            $saved_styles = get_option( self::$ds_styles_key, array() );
            $ds_styles = wp_parse_args( $saved_styles, self::$ds_styles_defaults );
        } else {
            $ds_styles = self::$ds_styles_defaults;
        }
        if( get_option( self::$ds_emails_key, array() ) ) {
            $saved_emails = get_option( self::$ds_emails_key, array() );
            $ds_emails = wp_parse_args( $saved_emails, self::$ds_emails_defaults );
        } else {
            $ds_emails = self::$ds_emails_defaults;
        }



        foreach ( $settings as $i => $setting ){
            if( isset( $setting ) ) {
                if( array_key_exists( $i, $ds_general ) ){
                    $ds_general[$i] = $setting;
                    update_option( self::$ds_general_key, $ds_general );
                } else if( array_key_exists( $i, $ds_styles ) ){
                    $ds_styles[$i] = $setting;
                    update_option( self::$ds_styles_key, $ds_styles );
                } else if( array_key_exists( $i, $ds_emails ) ){
                    $ds_emails[$i] = $setting;
                    update_option( self::$ds_emails_key, $ds_emails );
                }
            }
        }

    }

    /**
     * Save buttons
     *
     * @param array $buttons
     */
    public static function save_buttons( $id, $data, $delete ){

        $ds_buttons = get_option( self::$ds_buttons_key, array() );

        if( array_key_exists( $id, $ds_buttons ) && $delete === 'yes' ) {
            unset( $ds_buttons[$id] );
            update_option( self::$ds_buttons_key, $ds_buttons );
        } else {
            if( $data ) {
                $ds_buttons[$id] = $data;
                update_option( self::$ds_buttons_key, $ds_buttons );
            }
        }

    }
}
$dsapisettings = new \DS_API_Settings;
