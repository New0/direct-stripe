<?php

if ( ! class_exists( 'DSBlock' ) ) :

    class DSBlock
    {
        /**
         * Block init
         */
        public function __construct() {
            add_action( 'init', array( $this, 'ds_block' ) );
        }

        function ds_render_block_buttons( $atts ) {

            //Set up data
            include( DSCORE_PATH . 'includes/ds-data.php');
            //Enqueue JS and send parameters
            wp_localize_script('direct-stripe-handler-script', $instance, $params);
            wp_enqueue_script('direct-stripe-checkout-script');
            wp_enqueue_script('direct-stripe-handler-script');

            ob_start();
            include( DSCORE_PATH . 'includes/ds-button.php');
            include( DSCORE_PATH . 'includes/ds-answers.php');
            return ob_get_clean();

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


            if ( function_exists('register_block_type') ) {
                register_block_type( 'direct-stripe/payment-button', array(
                    'editor_script' => 'direct-stripe-block-script',
                    'script' => 'direct-stripe-block-script',
                    'render_callback' => array( $this, 'ds_render_block_buttons' ),
                    'attributes' => array(
                        'value' => array(
                            'type'      =>  'string',
                            'default'   =>  '0'
                        )
                    )
                ) );
            }

        }

    }


endif; //if class exists

$dsblock= new DSBlock;