<?php  // Add button to add the shortcode

$is_post_edit_page = in_array(basename($_SERVER['PHP_SELF']), array('post.php', 'page.php', 'page-new.php', 'post-new.php'));

if( !$is_post_edit_page) {
  return;
} else {

      ?>
     <a href="#TB_inline?width=480&inlineId=ds_add_button" class="thickbox button ds_media_link" id="add_ds" title="<?php _e('Add Stripe button', 'direct-stripe') ?>">
         <img src="<?php echo DSCORE_URL; ?>assets/admin/dist/img/stripe-logo-black.svg" width="auto" height="20" ><?php _e('Add button', 'direct-stripe') ?>
     </a>
    <?php

}
