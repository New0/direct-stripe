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
     * Default settings
     *
     * @var array
     */
    protected static $defaults = array();
    /**
     * Get saved settings
     *
     * @return array
     */
    public static function get_settings(){

        $ds_general = get_option( self::$ds_general_key, array() );
        $ds_styles = get_option( self::$ds_styles_key, array() );
        $ds_emails = get_option( self::$ds_emails_key, array() );

        $saved = array_merge($ds_general, $ds_styles, $ds_emails );

        if( ! is_array( $saved ) || empty( $saved )){
            return self::$defaults;
        }
        return wp_parse_args( $saved, self::$defaults );
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
                    update_option( self::$ds_styles_key, $ds_general );
                }
                else if( array_key_exists( $i, $ds_emails ) ){
                    $ds_emails[$i] = $setting;
                    update_option( self::$ds_emails_key, $ds_general );
                }
            }
        }

    }
}
$dsapisettings = new \DS_API_Settings;
