<?php
/**
 * HTML for the Modal form
 *  
 * @since 2.2.0
 */

$ds_modal_form_complete = '<!-- DS Modal -->
<div id="modal-' . $instance . '" class="ds-modal">

  <!-- Modal content -->
  <div class="ds-modal-content">
        <span class="ds-close">&times;</span>

        <div class="ds-form">

            <div class="cell ds-element in-form ds-element-' . $instance . '" id="ds-element-' . $instance . '">
                <form data-id="' . $instance . '">
                    <div id="ds-element-' . $instance . '-paymentRequest" class="element-paymentRequest">
                        <!--Stripe paymentRequestButton Element inserted here-->
                    </div>
                    ';

                    if( !empty($d_stripe_general['direct_stripe_logo_image']) && $d_stripe_general['direct_stripe_logo_image'] !== false ){
                        $ds_modal_form_complete .= $ds_modal_image;
                    }

                    if( !empty($ds_button->name) || !empty($ds_button->description) ){
                        $ds_modal_form_complete .= $ds_company_element;
                    }

                    $ds_modal_form_complete .= '<fieldset>
                        <legend class="card-only" data-tid="ds-element.form.pay_with_card">' . __('Pay with card', 'direct-stripe') . '</legend>
                        <legend class="payment-request-available" data-tid="elements_ds-element.form.enter_card_manually">' . __('Or enter card details', 'direct-stripe') . '</legend>
                        ';

                        $ds_modal_form_complete .= $ds_modal_name;
                        
                        $ds_modal_form_complete .= $ds_modal_email;

                        if( $ds_button->billing === true || $ds_button->shipping === true ){
                            $ds_modal_form_complete .= $ds_billing_element;
                        }

                        if( $ds_button->shipping === true ){
                            $ds_modal_form_complete .= '
                                <hr />
                                <input id="shippingData-' . $instance . '" class="shippingData" type="checkbox" name="shippingData" value="shippingData">
                                <label for="shippingData-' . $instance . '" class="shippingDataLabel">' . __('Add different shipping details', 'direct-stripe') . '</label>
                            ';
                            $ds_modal_form_complete .= $ds_shipping_element;
                        }

                        $ds_modal_form_complete .= $ds_card_element;

                        $ds_modal_form_complete .= $ds_modal_button;
                                              
                    $ds_modal_form_complete .= '
                    </fieldset>
                    ' . $ds_modal_error  . $ds_modal_success . '
                </form>
            </div>
        </div><!-- .ds-form -->

  </div>

</div>';

return $ds_modal_form_complete;