<?php
/**
 * HTML for modal Name element
 * 
 * @since 2.2.0
 */
return '
<div class="row">
    <div class="field">      
        <input id="ds-element-' . $instance . '-name"  class="input" type="text" required="" autocomplete="name" name="name">
        <label for="ds-element-' . $instance . '-name" data-tid="ds-element.form.name_label">' . __( 'Name', 'direct-stripe') .'</label>
    </div>
</div>
';