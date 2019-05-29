<?php
/**
 * HTML for billing element
 * 
 * @since 2.0.0
 */
return '
<div class="dsShippingDetails">
    <div class="row ds_form_title" data-locale-reversible="">' . __('Shipping information', 'direct-stripe') . '</div>
    <div class="row" data-locale-reversible="">
        <div class="field">
            <input id="ds-element-' . $instance . '-sh-phone" data-tid="ds-element.form.shipping_phone_placeholder" class="input" type="text" required="" autocomplete="tel">
            <label for="ds-element-' . $instance . '-sh-phone" data-tid="ds-element.form.shipping_phone_label">' . __('Phone', 'direct-stripe') . '</label>
        </div>
    </div>
    <div class="row" data-locale-reversible="">
        <div class="field">
            <input id="ds-element-' . $instance . '-sh-address" data-tid="ds-element.form.shipping_address_placeholder" class="input" type="text" required="" autocomplete="address-line1">
            <label for="ds-element-' . $instance . '-sh-address" data-tid="ds-element.form.shipping_address_label">' . __('Address', 'direct-stripe') . '</label>
        </div>
    </div>
    <div class="row" data-locale-reversible="">
        <div class="field">
            <input id="ds-element-' . $instance . '-sh-city" data-tid="elements_examples.form.shipping_city_placeholder" class="input" type="text" required="" autocomplete="address-level2">
            <label for="ds-element-' . $instance . '-sh-city" data-tid="ds-element.form.shipping_city_label">' . __('City', 'direct-stripe') . '</label>
        </div>
        <div class="field">
            <input id="example5-state" data-tid="elements_examples.form.shipping_state_placeholder" class="input empty" type="text" required="" autocomplete="address-level1">
            <label for="ds-element-' . $instance . '-sh-state" data-tid="ds-element.form.shipping_state_label">' . __('State', 'direct-stripe') . '</label>
        </div>
        <div class="field">
            <input id="ds-element-' . $instance . '-sh-zip" data-tid="ds-element.form.shipping_postal_code_placeholder" class="input empty" type="text" required="" autocomplete="postal-code">
            <label for="ds-element-' . $instance . '-sh-zip" data-tid="ds-element.form.shipping_postal_code_label">' . __('ZIP', 'direct-stripe') .'</label>
        </div>
    </div>
</div>
';