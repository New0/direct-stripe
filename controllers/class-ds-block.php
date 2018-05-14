<?php

if ( ! class_exists( 'DSBlock' ) ) :

    class DSBlock
    {
        /**
         * Block init
         */
        public function __construct() {
            add_action( 'init', array( $this, 'ds_block' ) );
            //add_action( 'enqueue_block_assets', array( $this, 'ds_enqueue_block_assets') );
        }


        function ds_render_block_buttons( $attributes ) {
            $ds_buttons = get_option( 'direct_stripe_buttons' );
            if ( count( $ds_buttons ) === 0 ) {
                return 'No Button';
            }

            var_dump($attributes);

            return 'ok';
        }

        function ds_enqueue_block_assets() {

            wp_register_script(
                'direct-stripe-block-script',
                DSCORE_URL . 'assets/block-assets/dist/js/main.js',
                array( 'wp-blocks', 'wp-element', 'wp-component' )
            );

        }

        function ds_block() {

            wp_register_script(
                'direct-stripe-block-script',
                DSCORE_URL . 'block/js/block.build.js',
                array( 'wp-blocks', 'wp-element', 'jquery', 'wp-components' )
            );

            wp_localize_script('direct-stripe-block-script', 'ds_admin_block_vars', array(
                    'strings' => array(
                        'saved' => __( 'Settings Saved', 'direct-stripe' ),
                        'error' => __( 'Error', 'direct-stripe' )
                    ),
                    'dsCorePath' => DSCORE_PATH,
                    'dsCoreUrl' => DSCORE_URL,
                    'api'     => array(
                        'settings'   => esc_url_raw( rest_url( 'direct-stripe/v1/settings' ) ),
                        'buttons'    => esc_url_raw( rest_url( 'direct-stripe/v1/buttons' ) ),
                        'nonce' => wp_create_nonce( 'wp_rest' )
                    )
                )
            );

            register_block_type( 'direct-stripe/payment-button', array(
                'editor_script' => 'direct-stripe-block-script',
                'script' => 'direct-stripe-block-script',
                /*'render_callback' => array( $this, 'ds_render_block_buttons' ),
                'attributes' => array(
                    'cool' => ''
                )*/
            ) );
        }

    }


endif; //if class exists

$dsblock= new DSBlock;
