<?php
class DS_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'add_routes'));
    }

    /**
     * Add routes
     */
    public function add_routes( ) {
        $fields = self::ds_options();
        $buttons= self::ds_buttons();

        register_rest_route( 'direct-stripe/v1', '/settings',
            array(
                'methods'         => 'POST',
                'callback'        => array( $this, 'update_settings' ),
                'args' => $fields,
                'permission_callback' => array( $this, 'permissions' )
            )
        );
        register_rest_route( 'direct-stripe/v1', '/settings',
            array(
                'methods'         => 'GET',
                'callback'        => array( $this, 'get_settings' ),
                'args'            => array(
                ),
                'permission_callback' => array( $this, 'permissions' )
            )
        );
        register_rest_route( 'direct-stripe/v1', '/buttons',
            array(
                'methods'         => 'POST',
                'callback'        => array( $this, 'update_buttons' ),
                'args'            => array(
                ),
                'permission_callback' => array( $this, 'permissions' )
            )
        );
        register_rest_route( 'direct-stripe/v1', '/buttons',
            array(
                'methods'         => 'GET',
                'callback'        => array( $this, 'get_buttons' ),
                'args'            => array(
                ),
                'permission_callback' => array( $this, 'permissions' )
            )
        );

    }


    /**
     * Check request permissions
     *
     * @return bool
     */
    public function permissions(){

        $user_id = apply_filters( 'determine_current_user', false );
        wp_set_current_user( $user_id );

        return current_user_can('edit_others_posts');
    }


    /**
     * Update settings
     *
     * @param WP_REST_Request $request
     */
    public function update_settings( WP_REST_Request $request ){


        $nonce = $request->get_param( '_dsnonce' );

        if ( ! wp_verify_nonce( $nonce, 'ds_rest' ) ) {
            return array(
                'text'  =>  'Something went wrong, check nonces...',
                'error'  =>  true
            );
        }

        $settings = array(
            'direct_stripe_live_publishable_api_key'    =>  sanitize_text_field( $request->get_param( 'direct_stripe_live_publishable_api_key' ) ),
            'direct_stripe_live_secret_api_key'         =>  sanitize_text_field( $request->get_param( 'direct_stripe_live_secret_api_key' ) ),
            'direct_stripe_checkbox_api_keys'           =>  sanitize_text_field( $request->get_param( 'direct_stripe_checkbox_api_keys' ) ),
            'direct_stripe_test_publishable_api_key'    =>  sanitize_text_field( $request->get_param( 'direct_stripe_test_publishable_api_key' ) ),
            'direct_stripe_test_secret_api_key'         =>  sanitize_text_field( $request->get_param( 'direct_stripe_test_secret_api_key' ) ),
            'direct_stripe_currency'                    =>  sanitize_text_field( $request->get_param( 'direct_stripe_currency' ) ),
            'direct_stripe_success_message'             =>  sanitize_text_field( $request->get_param( 'direct_stripe_success_message' ) ),
            'direct_stripe_error_message'               =>  sanitize_text_field( $request->get_param( 'direct_stripe_error_message' ) ),
            'direct_stripe_use_redirections'            =>  sanitize_text_field( $request->get_param( 'direct_stripe_use_redirections' ) ),
            'direct_stripe_success_page'                =>  esc_url_raw( $request->get_param( 'direct_stripe_success_page' ) ),
            'direct_stripe_error_page'                  =>  esc_url_raw( $request->get_param( 'direct_stripe_error_page' ) ),
            'direct_stripe_logo_image'                  =>  esc_url_raw( $request->get_param( 'direct_stripe_logo_image' ) ),
            'direct_stripe_billing_infos_checkbox'      =>  sanitize_text_field( $request->get_param( 'direct_stripe_billing_infos_checkbox' ) ),
            'direct_stripe_shipping_infos_checkbox'     =>  sanitize_text_field( $request->get_param( 'direct_stripe_shipping_infos_checkbox' ) ),
            'direct_stripe_rememberme_option_checkbox'  =>  sanitize_text_field( $request->get_param( 'direct_stripe_rememberme_option_checkbox' ) ),
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

    /**
     * Update buttons via API
     *
     * @param WP_REST_Request $request
     */
    public function update_buttons( WP_REST_Request $request ){

        $id = $request->get_param( 'id' );
        $data = json_decode( $request->get_param( 'data' ) );

        DS_API_Settings::save_buttons( $id, $data );
        return rest_ensure_response( DS_API_Settings::get_buttons())->set_status( 201 );
    }
    /**
     * Get buttons via API
     *
     * @param WP_REST_Request $request
     */
    public function get_buttons( WP_REST_Request $request ){
        return rest_ensure_response( DS_API_Settings::get_buttons());
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
            ),
            'direct_stripe_buttons' => array(
                'type' => 'string',
                'required' => false,
                'sanitize_callback' => 'sanitize_text_field'
            )
        );
        return $options;
    }
    public function ds_buttons() {
        $buttons = array(
            'type' => 'json_object',
            'required' => false,
            'sanitize_callback' => 'sanitize_text_field'
        );
        return $buttons;
    }
}
$dsapi = new \DS_API;