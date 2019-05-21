<?php
/**
 * HTML Modal button element
 * 
 * @since 2.2.0
 */

if( $ds_button->display_amount === true && $ds_button->type !== "subscription" ){
    return '
        <button class="ds-modal-button-' . $instance . '" type="submit" data-tid="elements_examples.form.pay_button">
            <span class="ds-modal-panellabel">' . esc_attr( $ds_button->panellabel ) . '</span>
            <span class="ds-modal-amount">' . esc_attr( base64_decode($ds_button->amount) ) . '</span>
            <span class="ds-modal-currency">' . esc_attr( $ds_button->currency ) . '</span>
        </button>
    ';
} else {
    return '
        <button class="ds-modal-button-' . $instance . '" type="submit" data-tid="elements_examples.form.pay_button">
            <span class="ds-modal-panellabel">' . esc_attr( $ds_button->panellabel ) . '</span>
        </button>
    ';
}
