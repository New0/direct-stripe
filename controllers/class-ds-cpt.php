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
    }

    /**
     * Log Transactions in WordPress admin
     *
     * @since 2.0.0
     */
    function direct_stripe_create_post_type() {
        // Set UI labels for Custom Post Type
        $labels = array(
            'name'                => _x( 'Direct Stripe logs', 'Post Type General Name', DirectStripe::domain ),
            'singular_name'       => _x( 'Direct Stripe log', 'Post Type Singular Name', DirectStripe::domain ),
            'parent_item_colon'   => __( 'Direct Stripe Parent Log', DirectStripe::domain ),
            'all_items'           => __( 'Direct Stripe logs', DirectStripe::domain ),
            'view_item'           => __( 'Direct Stripe log', DirectStripe::domain ),
            'add_new_item'        => __( 'Add New Direct Stripe log', DirectStripe::domain ),
            'add_new'             => __( 'Add New', DirectStripe::domain ),
            'edit_item'           => __( 'Edit Direct Stripe log', DirectStripe::domain ),
            'update_item'         => __( 'Update Direct Stripe log', DirectStripe::domain ),
            'search_items'        => __( 'SearchDirect Stripe log', DirectStripe::domain ),
            'not_found'           => __( 'Direct Stripe log Not Found', DirectStripe::domain ),
            'not_found_in_trash'  => __( 'Direct Stripe log Not found in Trash', DirectStripe::domain ),
        );

        // Set other options for Direct Stripe Post Type
        $args = array(
            'label'               => __( 'Direct Stripe logs', DirectStripe::domain ),
            'description'         => __( 'Direct Stripe logs', DirectStripe::domain ),
            'labels'              => $labels,
            'hierarchical'        => false,
            'public'              => false,
            'show_ui'             => true,
            'show_in_menu'        => 'direct_stripe',
            'show_in_nav_menus'   => true,
            'can_export'          => false,
            'exclude_from_search' => true,
            'publicly_queryable'  => false,
            'capability_type'     => 'page',
            'supports'            => array( 'title' )
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
            'title'         => __( 'Transaction ID', DirectStripe::domain ),
            'author'        => __( 'Stripe User', DirectStripe::domain ),
            'amount'        => __( 'Amount', DirectStripe::domain ),
            'type'	        =>	__( 'Type', DirectStripe::domain ),
            'description'	=>	__( 'Description', DirectStripe::domain ),
            'date'          => __( 'Date', DirectStripe::domain )
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
                $firstamount = get_post_meta( get_the_ID(), 'amount', true );
                $secamount = $firstamount / 100;
                $amount = number_format( $secamount, 2 );
                if ( empty( $amount ) )
                    echo __( 'Unknown', DirectStripe::domain );
                else
                    printf( __( '%s', DirectStripe::domain ), $amount );
                break;

            case 'type' :
                $type = get_post_meta( get_the_ID(), 'type', true );
                if ( empty( $type ) )
                    echo __( 'Unknown', DirectStripe::domain );
                else
                    printf( __( '%s', DirectStripe::domain ), $type );
                break;

            case 'description' :
                $type = get_post_meta( get_the_ID(), 'description', true );
                if ( empty( $type ) )
                    echo __( 'None provided', DirectStripe::domain );
                else
                    printf( __( '%s', DirectStripe::domain ), $type );
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
            'type'	        =>	'type',
            'description'	=>	'description',
            'date'	        =>	'date'
        );
        return $columns;
    }
}

$dsCpt = new dsCpt;