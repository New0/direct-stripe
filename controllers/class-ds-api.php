<?php
class DS_API {

    public function __construct() {
        add_action('rest_api_init', array( $this, 'add_routes' ) );
    }


    /**
     * Add routes
     */
    public function add_routes( ) {
        $fields = self::ds_options();

        register_rest_route( 'direct-stripe/v1', '/settings',
            array(
                'methods'         => 'POST',
                'callback'        => array( $this, 'update_settings' ),
                'args' => $fields,
                'permissions_callback' => array( $this, 'permissions' )
            )
        );
        register_rest_route( 'direct-stripe/v1', '/settings',
            array(
                'methods'         => 'GET',
                'callback'        => array( $this, 'get_settings' ),
                'args'            => array(
                ),
                'permissions_callback' => array( $this, 'permissions' )
            )
        );
    }
    /**
     * Check request permissions
     *
     * @return bool
     */
    public function permissions(){
        return current_user_can( 'manage_options' );
    }
    /**
     * Update settings
     *
     * @param WP_REST_Request $request
     */
    public function update_settings( WP_REST_Request $request ){
        $settings = array(
            'direct_stripe_test_publishable_api_key' => $request->get_param( 'direct_stripe_test_publishable_api_key' ),
            'direct_stripe_test_secret_api_key' => $request->get_param( 'direct_stripe_test_secret_api_key' )
        );
        DS_API_Settings::save_settings( $settings );
        return rest_ensure_response( DS_API_Settings::get_settings())->set_status( 201 );
    }
    /**
     * Get settings via API
     *
     * @param WP_REST_Request $request
     */
    public function get_settings( WP_REST_Request $request ){
        return rest_ensure_response( DS_API_Settings::get_settings());
    }

    public function ds_options() {
        $options = array(
            'direct_stripe_test_publishable_api_key' => array(
                'type' => 'string',
                'required' => false,
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'direct_stripe_test_secret_api_key' => array(
                'type' => 'string',
                'required' => false,
                'sanitize_callback' => 'sanitize_text_field'
            )
        );
        return $options;
    }
}
$dsapi = new \DS_API;