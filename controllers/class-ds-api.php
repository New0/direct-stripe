<?php
class DS_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'add_routes'));
    }

    /**
     * Add routes
     */
    public function add_routes( ) {
        //$fields = self::ds_options();
        //$buttons = self::ds_buttons();

        register_rest_route( 'direct-stripe/v1', '/settings',
            array(
                'methods'         => 'POST',
                'callback'        => array( $this, 'update_settings' ),
                'args'            => array(
                ),
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
                'text'  =>  __('Something went wrong, check nonces...', 'direct-stripe'),
                'error'  =>  true
            );
        }

        $set = $request->get_params();
        if( isset( $set ) ) {
            $key = key( $set );
        }
        if( isset( $key ) ) {
            $value = reset($set);
        }

        $booleans = array( 'direct_stripe_checkbox_api_keys', 'direct_stripe_use_redirections',
            'direct_stripe_admin_emails_checkbox', 'direct_stripe_user_emails_checkbox',
            'direct_stripe_admin_error_emails_checkbox', 'direct_stripe_user_error_emails_checkbox',
            'direct_stripe_check_records'
        );
        $texts = array( 'direct_stripe_publishable_api_key', 'direct_stripe_secret_api_key',
            'direct_stripe_test_publishable_api_key', 'direct_stripe_test_secret_api_key', 'direct_stripe_currency',
            'direct_stripe_use_custom_styles', 'direct_stripe_main_color_style', 'direct_stripe_border_radius',
            'direct_stripe_tc_text', 'direct_stripe_tc_link_text',
            'direct_stripe_tc_link', 'direct_stripe_admin_email_subject', 'direct_stripe_user_email_subject',
            'direct_stripe_admin_error_email_subject', 'direct_stripe_user_error_email_subject', 'direct_stripe_tc_error_bubble',
			'direct_stripe_button_locale'
        );
        $urls = array( 'direct_stripe_success_page', 'direct_stripe_error_page', 'direct_stripe_logo_image' );
        $post_kses = array( 'direct_stripe_admin_email_content', 'direct_stripe_user_email_content', 'direct_stripe_error_message',
            'direct_stripe_success_message', 'direct_stripe_user_error_email_content', 'direct_stripe_admin_error_email_content'
        );

        if ( in_array( $key, $booleans ) ) {
            $setting = array(
                $key => filter_var( $value, FILTER_VALIDATE_BOOLEAN )
            );
        } else if ( in_array( $key, $texts ) ) {
            $setting = array(
                $key => sanitize_text_field( $value )
            );
        } else if ( in_array( $key, $urls) ) {
            $setting = array(
                $key => esc_url( $value )
            );
        } else if ( in_array( $key, $post_kses) ) {
            $setting = array(
                $key => wp_kses_post( $value )
            );
        }

        DS_API_Settings::save_settings( $setting );
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

        $nonce = $request->get_param( '_dsnonce' );

        if ( ! wp_verify_nonce( $nonce, 'ds_rest' ) ) {
            return array(
                'text'  =>  'Something went wrong, check nonces...',
                'error'  =>  true
            );
        }

        if( $request->get_param( 'id' ) ) {
            $id = $request->get_param( 'id' );
        } else  {
            $id = null;
        }
        if( $request->get_param( 'delete' ) && $request->get_param( 'delete' ) === 'yes' ) {
            $delete = 'yes';
            $data = false;
        } else  {
            $delete = null;
            if( $request->get_param( 'data' ) ) {
                $data = json_decode( $request->get_param( 'data' ) );
            } else  {
                $data = null;
            }
        }
        DS_API_Settings::save_buttons( $id, $data, $delete );
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