<?php
/**
 * HTML for Modal Card element
 * 
 * @since 2.0.0
 */

return '
<div class="row">
    <div class="field">
        <label for="ds-element-' . $instance .'-card" data-tid="ds-element.form.card_label">' . __('Card', 'direct-stripe') . '</label>
        <div id="ds-element-' . $instance .'-card" class="input StripeElement StripeElement--empty">
            <div class="__PrivateStripeElement" style="margin: 0px !important; padding: 0px !important; border: medium none !important; display: block !important; background: transparent none repeat scroll 0% 0% !important; position: relative !important; opacity: 1 !important;">
                <iframe allowtransparency="true" scrolling="no" name="__privateStripeFrame22" allowpaymentrequest="true" src="https://js.stripe.com/v3/elements-inner-card-526df1d2f610b7ed4891cd03d8cb5720.html#style[base][iconColor]=%23fff&amp;style[base][color]=%23fff&amp;style[base][fontWeight]=400&amp;style[base][fontFamily]=Helvetica+Neue%2C+Helvetica%2C+Arial%2C+sans-serif&amp;style[base][fontSize]=16px&amp;style[base][fontSmoothing]=antialiased&amp;style[base][::placeholder][color]=%23BFAEF6&amp;style[base][:-webkit-autofill][color]=%23fce883&amp;style[invalid][iconColor]=%23FFC7EE&amp;style[invalid][color]=%23FFC7EE&amp;iconStyle=solid&amp;locale=en&amp;componentName=card&amp;wait=false&amp;rtl=false&amp;keyMode=test&amp;origin=https%3A%2F%2Fstripe.dev&amp;referrer=https%3A%2F%2Fstripe.dev%2Felements-examples%2F&amp;controllerId=__privateStripeController1" title="Secure payment input frame" style="border: medium none !important; margin: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; height: 19.2px;" frameborder="0"></iframe>
                <input class="__PrivateStripeElement-input" aria-hidden="true" aria-label=" " autocomplete="false" maxlength="1" style="border: medium none !important; display: block !important; position: absolute !important; height: 1px !important; top: 0px !important; left: 0px !important; padding: 0px !important; margin: 0px !important; width: 100% !important; opacity: 0 !important; background: transparent none repeat scroll 0% 0% !important; pointer-events: none !important; font-size: 16px !important;">
            </div>
        </div>
    </div>
</div>
';