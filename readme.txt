=== Direct Stripe ===
Contributors: nahuelmahe
Donate link: https://newo.me/direct-stripe-payment-button-for-wordpress/
Tags: payments, stripe, credit cards, donations, subscriptions, checkout, direct checkout
Requires at least: 4.2
Tested up to: 5.1.1
Stable tag: 2.1.14
License: GPLv2 or later 
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==
#Simple Payments, Donations and Subscriptions using Stripe

###High conversion Stripe checkout buttons, easily start charging without users leaving your website, Styling, T&C and automated emails options!

#####Gutenberg ready since 2.1.0, simply insert Direct Stripe buttons using a block !!

Features :

- Automatically recognize email address of logged-in users

- Customize the button looks, use Stripe styles or your theme's button styles.

- GDPR / Terms and conditions checkbox option

- Setup automated emails sent after a successful and failed transactions

- Set up landing/redirection pages or set the success/error text for transaction responses

- Choose whether to log users and transactions in WordPress admin ( If used, this needs to apply GDPR )

- Option to ask for the billing details

- Marketers can easily add query data to redirections

- Ready for translations

####New Settings interface since 2.1.0, it includes button configuration from the settings page


###Global Setup

Log in to your stripe's account or create one at https://dashboard.stripe.com/register

######=> Configure settings in WordPress administration panel at Direct Stripe -> Settings


#####General settings :

* Enter your Stripe API keys ( find them at https://dashboard.stripe.com/account/apikeys )
* Option for test mode / keys
* Set your stripe's account currency
* Choose a success and error pages
* Choose a logo for your Stripes modal forms


#####Styles Settings :

- Choose to use custom buton
- Set custom button main colors
- Set custom button borders radius
- Choose to use a T&C checkbox
- Set texts and link to T&C pages


#####Emails Settings :

- Choose to use automated emails for successful payments to admin
- Set Email subject and content
- Choose to use automated emails for successful payments to Stripe's user
- Set Email subject and content
- Choose to use automated emails for unsuccessful payments to admin
- Set Email subject and content
- Choose to use automated emails for unsuccessful payments to Stripe's user

#####Buttons Settings :

- Create buttons from a settings page
- Insert buttons in the content area with a simple button
- Direct Stripe is Gutenberg ready, a Gutenberg block is available for Gutenberg users


######Actions and Filter hooks available for developers <https://newo.me/direct-stripe-actions-and-filters-hooks/>***

== Installation ==

1. Upload the plugin files to the /wp-content/plugins/direct-stripe directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Log in to your stripe's account or create one at https://dashboard.stripe.com/register
4. Configure settings and buttons in admin panel

Minimal steps :

- Copy API keys from the Stripe dashboard under Developers -> API keys

- Paste Stripe API keys in your WordPress admin at Direct Stripe -> settings under the Global settings tab ( I recommend copying live and test keys at once, then simply use the test option to use test keys).

- Create a button under the Buttons Settings tab ( the button requires at least a type and an amount in order to work => ( amount if the type is payment, Princing Plan ID if the type is a subscription and nothing if the type is Donation ) )

- Go to the page/post you want to insert a button into and select the Direct Stripe Gutenberg Block, then select the button to display within the block. ( in the case you use the old editor, use the Direct Stripe button on top of the editor to insert the button)

You can also insert direct stripe buttons using a shortcode `[direct-stripe value="ds-154185704588"]` (useful for widgets and templates) (  ds-1541857045880 being the unique ID of the button created at Direct Stripe settings under the Buttons Settings tab )


== Changelog ==

=2.1.14=
* Fix decimals on amount displayed within the modal form button for Donation button types.
* Allows support for multiple donations buttons on same page
* Support for locale language in Button settings
* Refactor JS process
* Stripe API update
* Updated pot reference for translations
* Updated french translation

=2.1.13=
* Fix old shortcode T&C condition issue
* Add option for locale language in button settings
* Declare $update_button when not updating button

=2.1.12=
* Add filter to disable Gutenberg block (in case of page builder use like cornerstone)
* Add notice for Display Amount working only for Payment and Donation buttons types.
* Make the processing animation dependant on the button
* Update Stripe API

More about Actions and filter hooks available at https://newo.me/direct-stripe-actions-and-filters-hooks/

=2.1.11=
* Fix Fix update customer when WP user exists but Stripe ID isn't stored
* Admin App Emails Intro Notice

=2.1.10.3=
* Fix testing with user logged in that has a stripe ID set that created issues

=2.1.10.2=
* Fix transaction failing issues
* Tested up to 5.0.0

=2.1.10.1=
*Rewrote the nonce verification for Ajax

=2.1.10=
* Added an Update card button type
* Added the T&C error bubble text as an option in styles settings panel
* Added a T&C filter hook 'direct_stripe_tc_conditions'
* Restored default button type to payment
* Updated French translation
* Stripe API Update

=2.1.9=
* Fix Gutenberg block since withApiData was deprecated
* Added styles to buttons in the Gutenberg editor
* Stripe API Update
* Add $button_id to 'direct_stripe_charge_data' filter hook

=2.1.8=
* Reset the loading spinner in the admin app
* Fix create a wp user when a user is found in Stripe customers
* Added the Filter Hook ds_filter_params

=2.1.7.3=
* Really fix redirection issue (2.1.7.2 didn't push the fix)

=2.1.7.2=
* Fix Redirection bug
* Update Stripe API
* Change $answer->object logic for errors

=2.1.7.1=
* Fixes issue with capture, display amount and zero decimal settings

=2.1.7=
* Improved admin app Delete button modal and loading animation
* Fixed Default Card update for customers ( causing bugs on subscription )
* Handling unknown value argument on frontend to prevent showing a button that is not set

=2.1.6=
* Improved admin app accessibility
* Improved french translation
* New filter hooks
   * 'direct_stripe_charge_data'
   * 'direct_stripe_subscription_data'
   * 'direct_stripe_setup_fee_data'

More about Actions and filter hooks available at https://newo.me/direct-stripe-actions-and-filters-hooks/

=2.1.5.1=
* Fixed T&C bug

=2.1.5=
* New markup Hooks
    * direct_stripe_div_before
    * direct_stripe_button
    * direct_stripe_div_after
    * direct_stripe_after_button

    More about Actions and filter hooks available at https://newo.me/direct-stripe-actions-and-filters-hooks/


=2.1.4=
* Fixed list of pages in options for redirections pages
* Added an option to choose not to record data in WordPress database
* Added alignment in the gutenberg Block
* Rewriting of the process

=2.1.3=
* Fixed Bug with subscription, when a setup fee was used the error "product does not exist" was received

=2.1.2=
* Fixed T&C bug
* French Translation

=2.1.1=
* Fixed hidden Live API keys in admin-app

=2.1.0=
* Gutenberg Block
* Vuejs admin panel
* User friendly Amounts
* Display amount option for donations
* API Routes direct-stripe/v1/settings and direct-stripe/v1/buttons

=2.0.8=
* Added the token to the 5th parameter for the 'direct_stripe_before_success_redirection' filter

=2.0.7=
* Restored original Stripe styles as an option in settings

=2.0.6=
* Added argument zero_decimal to shortcode to use zero decimal amount values in donation


=2.0.5=
* Doesn't register Users Stripe ID for tests transactions, this avoid to create an error if the same testing user create a live transaction and is find in WordPress admin but not in live Stripe account.

=2.0.4=
* Replaced subscription setup fee from charge to invoiceItem
* Error messages update

=2.0.3=
**Fixed admin email on success for donations and subscriptions bug**


=2.0.2=
**Fixed redirections bug**

=2.0.1=
**Fixed live key bug**

=2.0.0=
**Major code redesign with Ajax handling of transactions**

* Option for billing and shipping details now stored in logs
* Fixed bug that forced disable custom button on chrome for ios
* Fixed T&C only with custom button, now T&C can be asked per button and with or without custom button

List of actions and filters hooks at <https://newo.me/direct-stripe-actions-and-filters-hooks/>

=1.2.2=
* Filters for emails subject
    * direct_stripe_success_user_email_subject
    * direct_stripe_success_admin_email_subject
    * direct_stripe_error_user_email_subject
    * direct_stripe_error_admin_email_subject

* Filters for emails content
    * direct_stripe_success_user_email_content
    * direct_stripe_success_admin_email_content
    * direct_stripe_error_user_email_content
    * direct_stripe_error_admin_email_content

    Filters explained at : https://newo.me/filter-direct-stripe-emails/

=1.2.1.2=
* Back to small id for stripe customer object in create payment

=1.2.1.1=
* Corrects error redirection link bug

=1.2.1=
* **Custom_role** added as shortcode argument custom_role="custom_user_role"
* $user_id passed to 'direct_stripe_before_success_redirection' and 'direct_stripe_before_error_redirection' actions

 
= 1.2.0 =
* **Button that triggers the options form to insert automatically the shortcode in editor area**
* New shortcode argument button_id
* Fixed amount not showing in modal form since version 1.1.9 due to new amount encryption
* Automatically recognize email address of logged_in users
* New parameters $post_id and $button_id passed to 'direct_stripe_before_success_redirection' and 'direct_stripe_before_error_redirection' actions

= 1.1.9 =
* **New Shortcode options**
* success_query : pass query_vars into success redirection url => success_query="query1:var1,query2:var2"
* error_query : pass query_vars into error redirection url => error_query="query1:var1,query2:var2"
* success_url: Success redirection option per button => success_url="http://wordpress.org/"
* error_url : Error redirection option per button => error_url="http://wordpress.org/"

**Testing Actions** 
* direct_stripe_before_form
* direct_stripe_after_data_fields
* direct_stripe_after_script_tag
* direct_stripe_after_form
* direct_stripe_before_success_redirection
* direct_stripe_before_error_redirection


= 1.1.8 =
New shortcode options
- currency : use a currency argument to use per shortcode currencies => currency="EUR"

Update of Stripe API library to 4.4.2

!!!! Fixed typo creating classname collision with other stripe plugins... !!!!

Testing:
- success_query : pass query_vars into success redirection url => success_query="my_query=var" ( to use multiple queries please use %26 to encode & like  => success_query="my_query1=var%26my_query2=var2")
- error_query : pass query_vars into error redirection url => error_query="my_query=var" ( to use multiple queries please use %26 to encode & like  => error_query="my_query1=var%26my_query2=var2")

= 1.1.7 =
New shortcode options 
- setup_fee (for subscriptions), 
- display_amount (="false" to make the modal form button not display the amount) , 
- capture (="false" to register the payment without capturing the charge and charge the payment from stripe's admin panel)
- description of product setup with description's value of shortcode is now recorded in logs

1.1.6 Fixed error email sent to users bug (Thanks Tina!) - Added "setup_fee" option for subscriptions (under test)

1.1.5 Added allowed html to emails content
 
1.1.4 Bypassed Chrome on iOS bug ( customized button would'nt open modal form ), disabled custom styles for that particular case ( Still need a real fix)

1.1.3 IMPORTANT Bug Fix for success / error landing/redirection pages

1.1.1 Bug Fix for existing users that don't have a Stripe ID and rewrote validation

1.1.0 Add a checkbox option to allow billing details collection before payment

1.0.1 Important fixes for subscriptions not using coupons

1.0 Released functional button for payment/donation and subscriptions.
Logs users and transactions in WordPress admin. 
Set custom styles and automated emails.