<?php
/**
 * Created by PhpStorm.
 * User: nahuel
 * Date: 30/04/2018
 * Time: 15:04
 */

class Ds_api_Settings {
    /**
     * Option key to save settings
     *
     * @var string
     */
    protected static $option_key = '_ds_settings';
    /**
     * Default settings
     *
     * @var array
     */
    protected static $defaults = array(
        'industry' => 'lumber',
        'amount' => 42
    );
    /**
     * Get saved settings
     *
     * @return array
     */
    public static function get_settings(){
        $saved = get_option( self::$option_key, array() );
        if( ! is_array( $saved ) || ! empty( $saved )){
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
    public static function save_settings( array  $settings ){
        //remove any non-allowed indexes before save
        foreach ( $settings as $i => $setting ){
            if( ! array_key_exists( $setting, self::$defaults ) ){
                unset( $settings[ $i ] );
            }
        }
        update_option( self::$option_key, $settings );
    }
}