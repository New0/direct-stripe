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
     * Default settings
     *
     * @var array
     */
    protected static $defaults = array('No Option saved');
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

        if( ! is_array( $saved ) || empty( $saved )){
            return self::$defaults;
        }
        return wp_parse_args( $saved, self::$defaults );
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
            "type":"Payment",
            "amount": 1000,
            "button_id": "My Button", 
            "description": "Description",
            "label": "Label",
            "panellabel": "Panel Label", 
            "coupon": "Coupon",
            "setup_fee": null,
            "zero_decimal": "false",
            "capture": "true",
            "billing": "false",
            "shipping": "false",
            "tc": "false",
            "rememberme": "true",
            "display_amount": "false",
            "currency": "USD",
            "custom_role": null,
            "success_query": "success query_args",
            "error_query": "error query_args",
            "success_url": "custom success url",
            "error_url": "custom error url"
        }' );

        $saved = get_option( self::$ds_buttons_key, array( 'ds-0' => $example ) );

        if( ! is_array( $saved ) || empty( $saved )){
            return self::$defaults;
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

        $ds_general = get_option( self::$ds_general_key, array() );
        $ds_styles = get_option( self::$ds_styles_key, array() );
        $ds_emails = get_option( self::$ds_emails_key, array() );

        foreach ( $settings as $i => $setting ){
            if( $setting != null ) {
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
     * Array keys must be whitelisted (IE must be keys of self::$defaults
     *
     * @param array $settings
     */
    public static function save_buttons( $id, $data ){

        $ds_buttons = get_option( self::$ds_buttons_key, array() );

            $ds_buttons[$id] = $data;

            update_option( self::$ds_buttons_key, $ds_buttons );

    }
}
$dsapisettings = new \DS_API_Settings;
