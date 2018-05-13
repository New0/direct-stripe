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


        /*function ds_render_block_buttons( $attributes ) {
            $ds_buttons = get_option( 'direct_stripe_buttons' );
            if ( count( $ds_buttons ) === 0 ) {
                return 'No Button';
            }

            var_dump($attributes);

            return 'ok';
        }*/

        function  ds_block() {
            wp_register_script(
                'direct-stripe-block-script',
                DSCORE_URL . 'assets/block-assets/dist/js/main.js',
                array( 'wp-blocks', 'wp-element' )
            );

            register_block_type( 'direct-stripe/payment-button', array(
                'editor_script' => 'direct-stripe-block-script',
                /*'render_callback' => array( $this, 'ds_render_block_buttons' ),
                'attributes' => array(
                    'cool' => ''
                )*/
            ) );
        }


    }


endif; //if class exists

$dsblock= new DSBlock;
