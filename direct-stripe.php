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
 * Version:     3.0.0-beta
 * Author:      Nicolas Figueira
 * Author URI:  https://newo.me
 * Text Domain: direct-stripe
 * Domain Path: /languages
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Direct Stripe use MIT Licensed libraries ( https://opensource.org/licenses/MIT ) :
 * VueJS : https://github.com/vuejs/vue
 * Axios : https://github.com/axios/axios
 * Vuetify : https://github.com/vuetifyjs/vuetify
 * Stripe PHP : https://github.com/stripe/stripe-php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!defined('DSCORE_PATH')) {
    define('DSCORE_PATH', plugin_dir_path(__FILE__));
}
if (!defined('DSCORE_URL')) {
    define('DSCORE_URL', plugin_dir_url(__FILE__));
}
if (!defined('DSCORE_BASENAME')) {
    define('DSCORE_BASENAME', plugin_basename(__FILE__));
}

/**
 * Main Direct Stripe Class.
 *
 * @package DirectStripe
 * @since   2.0.0
 */
if (!class_exists('DirectStripe')) :

    class DirectStripe
    {

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
        const version = '3.0.0-beta';

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
        public function __construct()
        {

            if (!class_exists('Stripe\Stripe')) {
                require self::DIR . '/vendor/autoload.php';
            }

            $this->includes();
            $this->init_hooks();
            $this->activation_hooks();
            $this->register_stripe_app();
        }

        /**
         * Register Stripe App https://stripe.com/docs/building-plugins#setappinfo
         * 
         * @since 3.0.0
         */
        function register_stripe_app()
        {
            \Stripe\Stripe::setAppInfo(
                "WordPress Direct Stripe Plugin",
                self::version,
                "https://wordpress.org/plugins/direct-stripe/"
            );
        }

        function activation_hooks()
        {
            register_activation_hook(self::FILE,  array($this, 'direct_stripe_on_activation'));
        }
        /**
         * Add Stripe user role on plugin activation
         *
         * @since 2.0.0
         */
        function direct_stripe_on_activation()
        {
            add_role('stripe-user', __('Stripe user', 'direct-stripe'), array('read' => true));
        }

        /**
         * Hook into actions and filters.
         *
         * @since 2.0.0
         */
        public function init_hooks()
        {
            add_action('plugins_loaded', array($this, 'load_translation'));
            add_filter('plugin_action_links', array($this, 'ds_plugin_action_links'), 10, 2);
            add_action('upgrader_process_complete', array($this, 'ds_check_update'), 10, 2);
            add_action('admin_notices', array($this, 'ds_display_update_notice'));
        }

        /**
         * Load plugin translation.
         *
         * @since 2.0.0
         */
        public function load_translation()
        {
            load_plugin_textdomain(self::domain, false, plugin_basename(self::DIR) . '/languages');
        }

        /**
         * Add shortcut from plugins page
         *
         * @since 2.0.0
         */
        function ds_plugin_action_links($links, $file)
        {
            static $this_plugin;

            if (!$this_plugin) {
                $this_plugin = plugin_basename(__FILE__);
            }

            if ($file == $this_plugin) {
                $settings_link = '<a href="' . admin_url('admin.php?page=direct_stripe') . '">' . __("Settings", "direct-stripe") . '</a>';
                array_unshift($links, $settings_link);
            }

            return $links;
        }

        /**
         * Filter the Gutenberg Block
         *
         * @since 2.1.12
         *
         * @return bool $enqueue Whether to enqueue block or not.
         */
        public static function should_load_gutenberg_block()
        {
            return apply_filters('direct_stripe_should_load_gutenberg_block', true);
        }


        /**
         * Include required core files.
         *
         * @since 2.0.0
         */
        public function includes()
        {
            $ds_load_block = self::should_load_gutenberg_block();
            include_once('controllers/class-ds-api-settings.php');
            include_once('controllers/class-ds-api.php');
            include_once('controllers/class-ds-scripts.php');
            if ($ds_load_block) {
                include_once('controllers/class-ds-block.php');
            }
            include_once('controllers/class-ds-admin.php');
            include_once('controllers/class-ds-button.php');
            include_once('controllers/class-ds-cpt.php');
            //include_once( 'controllers/class-ds-logs-taxonomies.php' );
            include_once('controllers/class-ds-users.php');
        }


        /**
         * Add admin notice on update
         *
         * @since 3.0.0
         */
        public function ds_check_update($upgrader_object, $options)
        {

            // If an update has taken place and the updated type is plugins and the plugins element exists
            if ($options['action'] === 'update' && $options['type'] === 'plugin' && isset($options['plugins'])) {
                // Iterate through the plugins being updated and check if ds is there
                foreach ($options['plugins'] as $plugin) {
                    if ($plugin === DSCORE_BASENAME) {
                        // Set a transient to record that ds plugin has just been updated
                        set_transient('ds_plugin_updated', 1);
                    }
                }
            }
        }

        /**
         * Add admin notice on update
         *
         * @since 3.0.0
         */
        public function ds_display_update_notice()
        {

            // Check the transient to see if we've just updated the plugin
            if (get_transient('ds_plugin_updated')) {
                $message =  __('Thanks for updating Direct Stripe. The update includes a new process and design to work with SCA regulation and accept 3D secure transactions. Please test and make sure that it matches your needs.', 'ds-stripe');

                echo '<div class="notice notice-success">' . $message . '</div>';
                delete_transient('ds_plugin_updated');
            }
        }
    }

endif; //if class exists

$directstripe = new DirectStripe;
