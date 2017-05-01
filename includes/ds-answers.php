<?php
/**
 * Created by PhpStorm.
 * User: nfigueira
 * Date: 27/04/2017
 * Time: 14:47
 */
// Ajax answer span
    $direct_stripe_ajax_answer_span = '<span id="directStripe_answer"></span>';
    echo apply_filters('direct_stripe_ajax_answer_span', $direct_stripe_ajax_answer_span );
?>

<?php //old actions
do_action( 'direct_stripe_after_script_tag' );
do_action( 'direct_stripe_after_form' );

//Spinner for ajax process
$begin = '<div id="loadingDS" style="display:none;">';
$text = '<h2 class="loadingDS" data-text="' . __('Processing', 'direct-stripe') . '">' . __('Processing', 'direct-stripe') . '</h2>';
$dots = '<img src="' . DSCORE_URL . 'assets/public/dist/img/three-dots.svg" width="60" alt="">';
$end = '</div>';

$ds_processing_transaction_spinner = $begin;
$ds_processing_transaction_spinner .=  $text;
$ds_processing_transaction_spinner .=  $dots;
$ds_processing_transaction_spinner .=  $end;

echo apply_filters('direct_stripe_processing_transaction_spinner', $ds_processing_transaction_spinner, $begin, $end, $text, $dots );