<?php
/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 12/05/2017
 * Time: 11:06
 */
defined( 'ABSPATH' ) or die( 'Cheatin\' uh?' );

if ( ! class_exists( 'ds_Logs_Taxonomy' ) ) :
	
	class ds_Logs_Taxonomy {
		/**
		 * The slug of the custom taxonomy.
		 *
		 * @since 2.0.0
		 *
		 * @var string
		 */
		const SLUG = 'ds-logs-type';
		/**
		 * Constructor - Set up the custom taxonomy
		 *
		 * @since  2.0.0
		 *
		 * @access public
		 */
		function __construct() {
			add_action( 'init', array( $this, 'register_taxonomy' ) );
		}
		/**
		 * Register taxonomy
		 *
		 * Register the Direct Stripe Logs taxonomy.
		 *
		 * @since  2.0.0
		 *
		 * @access public
		 * @return void
		 */
		public function register_taxonomy() {
			$labels = array(
				'name'           => _x( 'Transactions types', 'plural', 'direct-stripe' ),
				'singular_name'  => _x( 'Transaction type', 'singular', 'direct-stripe' ),
				'menu_name'      => __( 'Logs types', 'direct-stripe' ),
				'name_admin_bar' => __( 'Direct Stripe types', 'direct-stripe' ),
				'add_new_item'   => __( 'Add New log Type', 'direct-stripe' ),
				'all_items'      => __( 'All log Types', 'direct-stripe' ),
			);
			$args = array(
				'label'                 => __( 'Transaction type', 'direct-stripe' ),
				'labels'                => $labels,
				'public'                => true,
				'show_in_quick_edit'    => true,
				'publicly_queryable'	=> true,
				'show_in_menu'          => true,
				'show_in_nav_menus'     => true,
				'show_admin_column'     => true,
				'show_tagcloud'         => true,
				'hierarchical'          => true,
				'show_ui'               => true,
				'hierarchical'          => true,
				'query_var'             => true,
				'rewrite'               => array( 'slug' => self::SLUG ),
				'sort'                  => true,
				'capabilities'          => array(),
				'show_in_rest'          => true
			);
			register_taxonomy( self::SLUG, array('directstripelogs') , $args );
		}
	} /* End of class  ds_Logs_Taxonomy */
	$GLOBALS['ds_Logs_Taxonomy'] = new ds_Logs_Taxonomy();
endif; /* End of class-exists wrapper */