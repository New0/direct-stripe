<?php
/**
 * HTML for billing element
 * 
 * @since 2.0.0
 */
return '
<hr />
<div class="row ds_form_title" data-locale-reversible="">' . __('Billing information', 'direct-stripe') . '</div>
<div class="row" data-locale-reversible="">
    <div class="field">
        <input id="ds-element-' . $instance . '-phone" data-tid="ds-element.form.phone_placeholder" class="input" type="text" required="" autocomplete="tel">
        <label for="ds-element-' . $instance . '-phone" data-tid="ds-element.form.phone_label">' . __('Phone', 'direct-stripe') . '</label>
    </div>
</div>
<div class="row" data-locale-reversible="">
    <div class="field">
        <input id="ds-element-' . $instance . '-address" data-tid="ds-element.form.address_placeholder" class="input" type="text" required="" autocomplete="address-line1">
        <label for="ds-element-' . $instance . '-address" data-tid="ds-element.form.address_label">' . __('Address', 'direct-stripe') . '</label>
    </div>
</div>
<div class="row" data-locale-reversible="">
    <div class="field">
        <input id="ds-element-' . $instance . '-city" data-tid="ds-element.form.city_placeholder" class="input" type="text" required="" autocomplete="address-level2">
        <label for="ds-element-' . $instance . '-city" data-tid="ds-element.form.city_label">' . __('City', 'direct-stripe') .'</label>
    </div>
    <div class="field">
        <input id="ds-element-' . $instance . '-state" data-tid="ds-element.form.state_placeholder" class="input empty" type="text" required="" autocomplete="address-level1">
        <label for="ds-element-' . $instance . '-state" data-tid="ds-element.form.state_label">' . __('State', 'direct-stripe') .'</label>
    </div>
    <div class="field">
        <input id="ds-element-' . $instance . '-zip" data-tid="ds-element.form.postal_code_placeholder" class="input empty" type="text" required="" autocomplete="postal-code">
        <label for="ds-element-' . $instance . '-zip" data-tid="ds-element.form.postal_code_label">' . __('ZIP', 'direct-stripe') . '</label>
    </div>
</div>
';