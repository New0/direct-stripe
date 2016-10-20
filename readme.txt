=== Direct Stripe ===
Contributors: Nicolas Figueira
Donate link: https://newo.me/direct-stripe-payment-button-for-wordpress/
Tags: payment button, stripe button , stripe, custom stripe button, stripe modal form, stripe checkout, direct checkout, easy payments, receive payments, accept credit cards, accept payments
Requires at least: 3.0.1
Tested up to: 4.6
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Stripe payment button for WordPress

== Description ==

Easily add Stripe buttons to a WordPress website with a shortcodes.
Customize the button via shortcode attributes.
Customize emails sent after a successful or error action on the button.
Set up redirections pages after payments or errors.



== Installation ==


1. Upload the plugin files to the `/wp-content/plugins/direct-stripe` directory, or install the plugin through the WordPress plugins screen directly.
1.1 Activate the plugin through the 'Plugins' screen in WordPress

Log in to your stripe's account or create one at https://dashboard.stripe.com/register

=>Configure settings in admin panel :

  -> Direct Stripe -> Settings
  
    ->General settings
        -> Enter your Stripe API keys ( find them at https://dashboard.stripe.com/account/apikeys )
        -> Option for test mode / keys
        -> Set your stripe's account currency 
        -> Choose a success and error pages
        -> Choose a log for your Stripes modal forms
        
    -> Styles Settings
        -> Choose to use custom buton
        -> Set custom button main colors
        -> Set custom button borders radius
        -> Choose to use a T&C checkbox 
        -> Set texts and link to T&C pages
        
    -> Emails Settings
        -> Choose to use automated emails for successful payments to admin
        -> Set Email subject and content
        -> Choose to use automated emails for successful payments to Stripe's user
        -> Set Email subject and content
        -> Choose to use automated emails for unsuccessful payments to admin
        -> Set Email subject and content
        -> Choose to use automated emails for unsuccessful payments to Stripe's user


== Frequently Asked Questions ==

Waiting For them!

== Screenshots ==


== Changelog ==
