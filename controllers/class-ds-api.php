<?php
class DS_API {

    public function __construct() {
        add_action('rest_api_init', [$this, 'add_routes']);
    }

    /**
     * Add routes
     */
    public function add_routes( ) {
        //$fields = self::ds_options();
        //$buttons = self::ds_buttons();

        register_rest_route( 'direct-stripe/v1', '/settings',
            [
                'methods'         => 'POST',
                'callback'        => [ $this, 'update_settings' ],
                'args'            => [
                ],
                'permission_callback' => [ $this, 'permissions' ]
            ]
        );
        register_rest_route( 'direct-stripe/v1', '/settings',
            [
                'methods'         => 'GET',
                'callback'        => [ $this, 'get_settings' ],
                'args'            => [
                ],
                'permission_callback' => [ $this, 'permissions' ]
            ]
        );
        register_rest_route( 'direct-stripe/v1', '/buttons',
            [
                'methods'         => 'POST',
                'callback'        => [ $this, 'update_buttons' ],
                'args'            => [
                ],
                'permission_callback' => [ $this, 'permissions' ]
            ]
        );
        register_rest_route( 'direct-stripe/v1', '/buttons',
            [
                'methods'         => 'GET',
                'callback'        => [ $this, 'get_buttons' ],
                'args'            => [
                ],
                'permission_callback' => [ $this, 'permissions' ]
            ]
        );

    }

    /**
     * Check request permissions
     *
     * @return bool
     */
    public function permissions(){
        //Nonce check validated by x-wp-nonce header in rest_cookie_check_errors()
        //User set via nonce check
        return current_user_can('edit_others_posts');
    }

    /**
     * Update settings
     *
     * @param WP_REST_Request $request
     */
    public function update_settings( WP_REST_Request $request ){

        //Nonce check validated by x-wp-nonce header in rest_cookie_check_errors()

        $set = $request->get_json_params();
        if( isset( $set ) ) {
            $key = key( $set );
        }
        if( isset( $key ) ) {
            $value = reset($set);
        }

        $booleans = [ 'direct_stripe_checkbox_api_keys', 'direct_stripe_use_redirections',
            'direct_stripe_admin_emails_checkbox', 'direct_stripe_user_emails_checkbox',
            'direct_stripe_admin_error_emails_checkbox', 'direct_stripe_user_error_emails_checkbox',
            'direct_stripe_check_records'
        ];
        $texts = [ 'direct_stripe_publishable_api_key', 'direct_stripe_secret_api_key',
            'direct_stripe_test_publishable_api_key', 'direct_stripe_test_secret_api_key', 'direct_stripe_currency',
            'direct_stripe_use_custom_styles', 'direct_stripe_main_color_style', 'direct_stripe_border_radius',
            'direct_stripe_tc_text', 'direct_stripe_tc_link_text',
            'direct_stripe_tc_link', 'direct_stripe_admin_email_subject', 'direct_stripe_user_email_subject',
            'direct_stripe_admin_error_email_subject', 'direct_stripe_user_error_email_subject', 'direct_stripe_tc_error_bubble',
			'direct_stripe_button_locale', 'direct_stripe_error_message', 'direct_stripe_success_message'
        ];
        $urls = [ 'direct_stripe_success_page', 'direct_stripe_error_page', 'direct_stripe_logo_image' ];
        $post_kses = [ 'direct_stripe_admin_email_content', 'direct_stripe_user_email_content', 'direct_stripe_user_error_email_content',
         'direct_stripe_admin_error_email_content'
        ];

        if ( in_array( $key, $booleans ) ) {
            $setting = [
                $key => filter_var( $value, FILTER_VALIDATE_BOOLEAN )
            ];
        } else if ( in_array( $key, $texts ) ) {
            $setting = [
                $key => sanitize_text_field( $value )
            ];
        } else if ( in_array( $key, $urls ) ) {
            $setting = [
                $key => $value && 'empty' != $value ? esc_url( $value ) : ''
            ];
        } else if ( in_array( $key, $post_kses ) ) {
            $setting = [
                $key => wp_kses_post( $value )
            ];
        }

        return rest_ensure_response( DS_API_Settings::save_settings( $setting ) );

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

        //Nonce check validated by x-wp-nonce header in rest_cookie_check_errors()

        $params = $request->get_json_params();

        if( !$params) return;

        //Get button ID if set
        $id = array_key_exists('id',  $params) ? $params['id'] : null;

        //Are we deleting a button 
        $delete = array_key_exists('delete',  $params) ? $params['delete'] : null;

        //Get data
        $data = array_key_exists('data',  $params) ? json_decode( $data = $params['data'] ) : null;

        return rest_ensure_response( DS_API_Settings::save_buttons( $id, $data, $delete ) );
        
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
        $options = [
            'direct_stripe_test_publishable_api_key' => [
                'type' => 'string',
                'required' => false,
                'sanitize_callback' => 'sanitize_text_field'
            ],
            'direct_stripe_test_secret_api_key' => [
                'type' => 'string',
                'required' => false,
                'sanitize_callback' => 'sanitize_text_field'
            ],
            'direct_stripe_buttons' => [
                'type' => 'string',
                'required' => false,
                'sanitize_callback' => 'sanitize_text_field'
            ]
        ];
        return $options;
    }

    public function ds_buttons() {
        $buttons = [
            'type' => 'json_object',
            'required' => false,
            'sanitize_callback' => 'sanitize_text_field'
        ];
        return $buttons;
    }
}
$dsapi = new \DS_API;