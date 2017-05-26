<?php

/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 14/04/2017
 * Time: 12:07
 */
class dsCpt {

    public function __construct() {
        /* Create custom post type for transactions logs */
        add_action('init', array($this, 'direct_stripe_create_post_type'));
        //Rename Columns for direct Stripe Post Type
        add_filter('manage_edit-directstripelogs_columns', array($this, 'direct_stripe_logs_columns_names'));
        //Add content to custom columns
        add_action('manage_directstripelogs_posts_custom_column', array($this, 'direct_stripe_manage_logs_columns'));
        //Make custom columns sortable
        add_filter('manage_edit-directstripelogs_sortable_columns', array($this, 'direct_stripe_sortable_columns'));
        //Print extra data into logs
	    add_action( 'add_meta_boxes', array( $this, 'action_add_meta_boxes' ) );
    }

    /**
     * Log Transactions in WordPress admin
     *
     * @since 2.0.0
     */
    function direct_stripe_create_post_type() {
        // Set UI labels for Custom Post Type
        $labels = array(
            'name'                => _x( 'Direct Stripe logs', 'Post Type General Name', 'direct-stripe' ),
            'singular_name'       => _x( 'Direct Stripe log', 'Post Type Singular Name', 'direct-stripe' ),
            'parent_item_colon'   => __( 'Direct Stripe Parent Log', 'direct-stripe' ),
            'all_items'           => __( 'Direct Stripe logs', 'direct-stripe' ),
            'view_item'           => __( 'Direct Stripe log', 'direct-stripe' ),
            'add_new_item'        => __( 'Add New Direct Stripe log', 'direct-stripe' ),
            'add_new'             => __( 'Add New', 'direct-stripe' ),
            'edit_item'           => __( 'Direct Stripe log', 'direct-stripe' ),
            'update_item'         => __( 'Direct Stripe log', 'direct-stripe' ),
            'search_items'        => __( 'Search Direct Stripe log', 'direct-stripe' ),
            'not_found'           => __( 'Direct Stripe log Not Found', 'direct-stripe' ),
            'not_found_in_trash'  => __( 'Direct Stripe log Not found in Trash', 'direct-stripe' ),
        );

        // Set other options for Direct Stripe Post Type
        $args = array(
            'label'               => __( 'Direct Stripe logs', 'direct-stripe' ),
            'description'         => __( 'Direct Stripe logs', 'direct-stripe' ),
            'labels'              => $labels,
            'hierarchical'        => false,
            'public'              => false,
            'show_ui'             => true,
            'show_in_menu'        => 'direct_stripe',
            'show_in_nav_menus'   => true,
            'can_export'          => true,
            'exclude_from_search' => true,
            'publicly_queryable'  => false,
	        'map_meta_cap'        => true,
            'capability_type'     => 'page',
            'supports'            => array('nada'),
	        'taxonomies'          => array(),
	        'has_archive'         => false,
	        'show_in_rest'        => true
        );
        // Registering Direct Stripe Post Type
        register_post_type( 'Direct Stripe Logs', $args );
    }

    /**
     * Rename Colums for direct Stripe Post Type
     *
     * @since 2.0.0
     */
    function direct_stripe_logs_columns_names( $columns ) {
        $columns = array(
            'cb'            => '<input type="checkbox" />',
            'title'         => __( 'Transaction ID', 'direct-stripe' ),
            'author'        => __( 'Stripe User', 'direct-stripe' ),
            'amount'        => __( 'Amount / Plan ID', 'direct-stripe' ),
            'currency'      => __( 'Currency', 'direct-stripe' ),
            'type'	        =>	__( 'Type', 'direct-stripe' ),
            'description'	=>	__( 'Description', 'direct-stripe' ),
            'date'          => __( 'Date', 'direct-stripe' ),
        );
        return $columns;
    }

    /**
     * Add content to custom columns
     *
     * @since 2.0.0
     */
    function direct_stripe_manage_logs_columns( $column ) {
        global $post;
        switch( $column ) {

            /* If displaying the 'amount' column. */
            case 'amount' :
                $amount = get_post_meta( get_the_ID(), 'amount', true );
                if( is_numeric($amount) ) {
	                $amount = number_format( $amount / 100, 2 );
                }
                if ( empty( $amount ) )
                    echo __( 'Unknown', 'direct-stripe' );
                else
                    printf( __( '%s', 'direct-stripe' ), $amount );
                break;

            case 'type' :
                $type = get_post_meta( get_the_ID(), 'type', true );
                if ( empty( $type ) )
                    echo __( 'Unknown', 'direct-stripe' );
                else
                    printf( __( '%s', 'direct-stripe' ), $type );
                break;

            case 'description' :
                $type = get_post_meta( get_the_ID(), 'description', true );
                if ( empty( $type ) )
                    echo __( 'None provided', 'direct-stripe' );
                else
                    printf( __( '%s', 'direct-stripe' ), $type );
                break;
	
	        case 'currency' :
		        $type = get_post_meta( get_the_ID(), 'currency', true );
		        if ( empty( $type ) )
			        echo __( 'None provided', 'direct-stripe' );
		        else
			        printf( __( '%s', 'direct-stripe' ), $type );
		        break;

            /* Just break out of the switch statement for everything else. */
            default :
                break;
        }
    }

    /**
     * Make Direct Stripe logs columns sortable
     *
     * @since 2.0.0
     */
    function direct_stripe_sortable_columns( $columns ) {
        $columns = array(
            'title'	        =>	'title',
            'author'        =>	'author',
            'amount'        => 	'amount',
	        'currency'      => 	'currency',
            'type'	        =>	'type',
            'description'	=>	'description',
            'date'	        =>	'date'
        );
        return $columns;
    }
	
	/**
	 * Add meta box to post typ to print extra logs data
	 *
	 * @since 2.0.0
	 */
	public function action_add_meta_boxes()	{
		add_meta_box('ds_main_data_box', __('Main logs data', 'direct-stripe'), array( $this, 'render_main_meta_boxes_data' ), 'directstripelogs', 'normal', 'default');
		add_meta_box('ds_bs_data_box', __('Billing and shipping data', 'direct-stripe'), array( $this, 'render_billing_shipping_data' ), 'directstripelogs', 'normal', 'default');
	}
	
	/**
	 * Display billing and shipping data into logs
	 *
	 * @since 2.0.0
	 */
	public function render_main_meta_boxes_data( $post ){
		
		include_once( DirectStripe::DIR . '/includes/display-main-logs-data.php' );
	}
	public function render_billing_shipping_data( $post ){
		
		include_once( DirectStripe::DIR . '/includes/display-bs-logs-data.php' );
	}
	
}

$dsCpt = new dsCpt;