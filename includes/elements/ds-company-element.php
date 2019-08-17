<?php
/**
 * HTML for company name and product description in modal 
 * 
 * @since 2.2.0
 */

 return '
 <div class="row">
    <div class="ds-company-name"><p>' . esc_attr( $ds_button->name ) .'</p></div>
</div>
<div class="row">
    <div class="ds-product-description"><p>' . esc_attr( $ds_button->description ) .'</p></div>
 </div>
 ';