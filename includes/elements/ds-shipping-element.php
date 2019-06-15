<?php
/**
 * HTML for billing element
 * 
 * @since 2.0.0
 */
$shipping = '
<hr />
<input id="shippingData-' . $instance . '" class="shippingData" type="checkbox" name="shippingData" value="shippingData" checked="">
<label for="shippingData-' . $instance . '" class="shippingDataLabel">' . __('Use same details for Shipping', 'direct-stripe') . '</label>

<div class="dsShippingDetails">
    <div class="row ds_form_title" data-locale-reversible="">' . __('Shipping information', 'direct-stripe') . '</div>
    <div class="row" data-locale-reversible="">
        <div class="field">      
            <input id="ds-element-' . $instance . '-sh-name"  class="input" type="text" autocomplete="name" name="shipping_name">
            <label for="ds-element-' . $instance . '--sh-name" data-tid="ds-element.form.shipping_name_label">' . __( 'Name', 'direct-stripe') .'</label>
        </div>
    </div>
    <div class="row" data-locale-reversible="">
        <div class="field">
            <input id="ds-element-' . $instance . '-sh-phone" data-tid="ds-element.form.shipping_phone_placeholder" class="input" type="tel" pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$" autocomplete="tel">
            <label for="ds-element-' . $instance . '-sh-phone" data-tid="ds-element.form.shipping_phone_label">' . __('Phone', 'direct-stripe') . '</label>
        </div>
    </div>
    <div class="row" data-locale-reversible="">
        <div class="field">
            <input id="ds-element-' . $instance . '-sh-address" data-tid="ds-element.form.shipping_address_placeholder" class="input" type="text" autocomplete="address-line1">
            <label for="ds-element-' . $instance . '-sh-address" data-tid="ds-element.form.shipping_address_label">' . __('Address', 'direct-stripe') . '</label>
        </div>
    </div>
    <div class="row" data-locale-reversible="">
        <div class="field">
            <input id="ds-element-' . $instance . '-sh-city" data-tid="elements_examples.form.shipping_city_placeholder" class="input" type="text" autocomplete="address-level2">
            <label for="ds-element-' . $instance . '-sh-city" data-tid="ds-element.form.shipping_city_label">' . __('City', 'direct-stripe') . '</label>
        </div>
        <div class="field">
            <input id="ds-element-' . $instance . '-sh-zip" data-tid="ds-element.form.shipping_postal_code_placeholder" class="input empty" type="text" autocomplete="postal-code">
            <label for="ds-element-' . $instance . '-sh-zip" data-tid="ds-element.form.shipping_postal_code_label">' . __('ZIP', 'direct-stripe') .'</label>
        </div>
    </div>
    <div class="row" data-locale-reversible="">
        <div class="field">
            <input id="eds-element-' . $instance . '-sh-state" data-tid="elements_examples.form.shipping_state_placeholder" class="input empty" type="text" autocomplete="address-level1">
            <label for="ds-element-' . $instance . '-sh-state" data-tid="ds-element.form.shipping_state_label">' . __('State', 'direct-stripe') . '</label>
        </div>
        <div class="field">
        <select id="ds-element-' . $instance . '-sh-country" data-tid="ds-element.form.shipping_country_placeholder" class="input empty" autocomplete="country">';

        if(!empty($ds_countries)){
            foreach($ds_countries as $country){
                $shipping.= '<option value="' . $country['code'] . '">' . $country['name'] . '</option>';
            }
        }

        $shipping .= '</select>
        <label for="ds-element-' . $instance . '-sh-country" data-tid="ds-element.form.shipping_country_label">' . __('Country', 'direct-stripe') .'</label>
    </div>
    </div>
</div>
';

return $shipping;