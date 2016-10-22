=== Direct Stripe ===

Contributors: Nicolas Figueira

Donate link: https://newo.me/direct-stripe-payment-button-for-wordpress/

Tags: payment button, stripe button , stripe, custom stripe button, stripe modal form, stripe checkout, direct checkout, easy payments, receive payments, accept credit cards, accept payments

Requires at least: 3.0.1

Tested up to: 4.6

Stable tag: 1.0

License: GPLv2 or later 

License URI: http://www.gnu.org/licenses/gpl-2.0.html


Stripe payment buttons for WordPress, Stripe modal form, custom styles, automated emails

== Description ==

Easily add Stripe buttons to a WordPress website with a simple shortcode.

Customize the button via shortcode attributes.

Customize emails sent after a successful or error action on modal form submission.

Set up landing pages after payments or errors.

First release => functionnal button for payment/donation and subscriptions.

Logs users and transactions in WordPress admin.

Set custom styles and automated emails.

Ready for translation 
 - French installed

=> Display the Stripe button on your site with a simple shortcode [direct-stripe]

 - These are the valid options :

    - type : payment / subscription /donation
    - name : Name displayed in Stripe modal form (shop name). Set by fefault to the sitename
    - description : Product description displayed on modal form. Set by default to the site description.description
    - amount : Amount to charge if payment type (Stripe format : 100 is 1,00) or plan-id for subscription type, not required for donations
    - abel : Text displayed on button to display modal form
    - panellabel : Text for modal form button
	- coupon : coupon id set in stripe admin

 - Exemples, put a shortcode in a page / post content or template :

    - Payment button for the amount of 50,00 (the currency set up in global settings), using the coupon xmas_offer (created in Stripe admin) :
        - [direct-stripe type="payment" amount="5000" name="My Shop" description="The great product you dream of" label="Proceed to checkout" panellabel="Pay now" coupon="xmas-offer"]

    - Subscription button for the plan monthly-plan (created in stripe admin) with coupon first-month-50 (created in Stripe admin) :
        - [direct-stripe type="subscription" amount="monthly-plan" coupon="first-month-50" description="The great monthly plan" label="Subscribe" panellabel="That's it"]

    - Donation button :
        - [direct-stripe type="donation" name="My plugin" description="Help me improve the plugin" label="Buy me coffee" panellabel="This will add one more setting option!"]


=> Global Setup

  - Log in to your stripe's account or create one at https://dashboard.stripe.com/register

  - Configure settings in admin panel :

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

== Installation ==

1.0 Upload the plugin files to the /wp-content/plugins/direct-stripe directory, or install the plugin through the WordPress plugins screen directly. 
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

In progress, in the meanwhile asking yours may help to fill this section.

== Screenshots ==

assets/screenshot-1.png

assets/screenshot-2.png

assets/screenshot-3.png

assets/screenshot-4.png

== Changelog == 
1.0 Released functionnal button for payment/donation and subscriptions. 
Logs users and transactions in WordPress admin. 
Set custom styles and automaed emails.
