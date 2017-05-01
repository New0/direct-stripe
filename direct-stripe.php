<?php
/**
 * Direct Stripe
 *
 * @package     DirectStripe
 * @author      Nicolas Figueira
 * @copyright   2017 Nicolas Figueira
 * @license     GPL-2.0+
 *
 * @wordpress-plugin
 * Plugin Name: Direct Stripe
 * Description: Use Stripe payment buttons anywhere in a WordPress website, let your users easily proceed to checkout
 * Version:     2.0.0
 * Author:      Nicolas Figueira
 * Author URI:  https://newo.me
 * Text Domain: direct-stripe
 * Domain Path: /languages
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

if(!defined('DSCORE_PATH')) {
    define('DSCORE_PATH', plugin_dir_path(__FILE__));
}
if(!defined('DSCORE_URL')) {
    define('DSCORE_URL', plugin_dir_url(__FILE__));
}
if(!defined('DSCORE_BASENAME')) {
    define('DSCORE_BASENAME', plugin_basename( __FILE__ ));
}

/**
 * Main Direct Stripe Class.
 *
 * @package DirectStripe
 * @since   2.0.0
 */
if ( ! class_exists( 'DirectStripe' ) ) :

    class DirectStripe {

        /**
         * Plugin file path.
         *
         * @since 2.0.0
         * @var string
         */
        const FILE = __FILE__;

        /**
         * Plugin directory path.
         *
         * @since 2.0.0
         * @var string
         */
        const DIR = __DIR__;

        /**
         * Plugin Version.
         *
         * @since 2.0.0
         * @var string
         */
        const version = '2.0.0';

        /**
         * Plugin Textdomain.
         *
         * @since 2.0.0
         * @var string
         */
        const domain = 'direct-stripe';

        /**
         * Plugin constructor.
         */
        public function __construct() {
            $this->includes();
            $this->init_hooks();
            $this->activation_hooks();
        }

        function activation_hooks() {
            register_activation_hook( self::FILE,  array( $this, 'direct_stripe_user_roles_on_activation') );
        }
        /**
         * Add Stripe user role on plugin activation
         *
         * @since 2.0.0
         */
        function direct_stripe_user_roles_on_activation() {
            add_role( 'stripe-user', __('Stripe user', 'direct-stripe'), array( 'read' => true ));
        }

        /**
         * Hook into actions and filters.
         *
         * @since 2.0.0
         */
        public function init_hooks() {
            add_action( 'plugins_loaded', array( $this, 'load_translation' ) );
        }

        /**
         * Load plugin translation.
         *
         * @since 2.0.0
         */
        public function load_translation() {
            load_plugin_textdomain( self::domain, false, plugin_basename( self::DIR ) . '/languages' );
        }
        /**
         * Include required core files.
         *
         * @since 2.0.0
         */
        public function includes() {
            include_once( 'controllers/class-ds-scripts.php' );
            include_once( 'controllers/class-ds-admin.php' );
            include_once( 'controllers/class-ds-button.php' );
            include_once( 'controllers/class-ds-cpt.php' );
            include_once( 'controllers/class-ds-users.php' );
        }
    }

endif; //if class exists

$directstripe = new DirectStripe;