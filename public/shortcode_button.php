<?php  // Add button to add the shortcode

$is_post_edit_page = in_array(basename($_SERVER['PHP_SELF']), array('post.php', 'page.php', 'page-new.php', 'post-new.php'));

if( !$is_post_edit_page) {
  return;
} else {
  
  // do a version check for the new 3.5 UI
  $version = get_bloginfo('version');

  if ($version < 3.5) {
      // show button for v 3.4 and below
      $image_btn =  DSCORE_PATH .'/images/date-button.gif';
    ?>
     <a href="#TB_inline?width=480&inlineId=ds_add_button" class="thickbox" id="add_ds" title="<?php _e('Add Stripe button', 'direct-stripe') ?>"><img src="<?php $image_btn ?>" alt="<?php _e('Add Stripe button', 'direct-stripe') ?>" /></a>
    <?php
  } else { 
      // display button matching new UI
      ?>
     <a href="#TB_inline?width=480&inlineId=ds_add_button" class="thickbox button ds_media_link" id="add_ds" title="<?php _e('Add Stripe button', 'direct-stripe') ?>"><span class="ds_media_icon "></span><?php _e('Add Stripe button', 'direct-stripe') ?></a>
    <?php
  }
  
}
