<?php
/**
 * HTML for modal Name element
 * 
 * @since 2.2.0
 */
return '
<div class="row">
    <div class="field">
        <label for="ds-element-' . $instance . '-name" data-tid="ds-element.form.name_label">' . __( 'Name', 'direct-stripe') .'</label>
        <input id="ds-element-' . $instance . '-name" data-tid="ds-element.form.name_placeholder" class="input" type="text" placeholder="Jane Doe" required="" autocomplete="name">
    </div>
</div>
';