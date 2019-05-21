<?php
    
    //HTML for the Modal form

$ds_modal_form_complete = '<!-- DS Modal -->
<div id="modal-' . $instance . '" class="ds-modal">

  <!-- Modal content -->
  <div class="ds-modal-content">
        <span class="ds-close">&times;</span>

        <div class="ds-form">

            <div class="cell ds-element in-form ds-element-' . $instance . '" id="ds-element-' . $instance . '">
                <form data-id="' . $instance . '">
                    <div id="ds-element-' . $instance . '-paymentRequest">
                        <!--Stripe paymentRequestButton Element inserted here-->
                    </div>
                    <fieldset>
                        <legend class="card-only" data-tid="elements_examples.form.pay_with_card">Pay with card</legend>
                        <legend class="payment-request-available" data-tid="elements_examples.form.enter_card_manually">Or enter card details</legend>
                        ' . $ds_modal_name . '
                        <div class="row">
                            <div class="field">
                                <label for="ds-element-' . $instance . '-email" data-tid="elements_examples.form.email_label">Email</label>
                                <input id="ds-element-' . $instance . '-email" data-tid="elements_examples.form.email_placeholder" class="input" type="text" placeholder="janedoe@gmail.com" required="" autocomplete="email">
                            </div>
                        </div>';

                        if( $ds_button->billing === true ){
                            $ds_modal_form_complete .= $ds_billing_element;
                        }

                        if( $ds_button->shipping === true ){
                            $ds_modal_form_complete .= $ds_shipping_element;
                        }

                        $ds_modal_form_complete .= $ds_card_element;

                        $ds_modal_form_complete .= $ds_modal_button;
                                              
                    $ds_modal_form_complete .= '
                    </fieldset>
                    ' . $ds_modal_error . $ds_modal_success . '
                </form>
                
            </div>
        </div><!-- .ds-form -->

  </div>

</div>';

return $ds_modal_form_complete;