<?php
/**
 * HTML for Email modal element
 * 
 * @since 2.2.0
 */

if( !empty($params['current_email_address']) ) { 
    return '
        <div class="row">
            <div class="field">
                <input id="ds-element-' . $instance . '-email" class="input" type="text" required="" autocomplete="email" value="' . $params['current_email_address'] . '">
                <label for="ds-element-' . $instance . '-email" data-tid="ds-element.form.email_label">' . __('Email', 'direct-stripe') . '</label>
            </div>
        </div>
    ';
} else {
    return '
        <div class="row">
            <div class="field">
                <input id="ds-element-' . $instance . '-email" class="input" type="text" required="" autocomplete="email">
                <label for="ds-element-' . $instance . '-email" data-tid="ds-element.form.email_label">' . __('Email', 'direct-stripe') . '</label>
            </div>
        </div>
    ';
}