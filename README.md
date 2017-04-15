# Direct-Stripe
Stripe payment button for WordPress

=== Direct Stripe ===

Contributors: Nicolas Figueira

Donate link: https://newo.me/direct-stripe-payment-button-for-wordpress/

Tags: payment button, stripe button , stripe, custom stripe button, stripe modal form, stripe checkout, direct checkout, easy payments, receive payments, accept credit cards, accept payments

Requires at least: 4.2

Tested up to: 4.7.3

Stable tag: 1.2.2.1

License: GPLv2 or later 

License URI: http://www.gnu.org/licenses/gpl-2.0.html


Stripe payment buttons for WordPress, Stripe modal form, custom styles, automated emails

Stripe buttons. High conversion checkout without leaving your site! Payments, donations, subscriptions! Styling, T&C and automated emails options!


== Description ==
**Payments, donations and subscriptions!**

**High conversion Stripe checkout buttons, easily start charging without leaving your website.**

Add Stripe buttons to your website with a simple shortcode.

**The shortcode is automatically generated and inserted in editor areas with a simple options form!!!**

Automatically recognize email address of logged-in users

Customize the button looks.

Terms and conditions checkbox option.

Setup automated emails sent after a successful or error action on modal form submission.

**Set up landing pages after payments or errors.**

**Logs users and transactions in WordPress admin.**

**Option to ask for the billing details**

Ready for translations (Français déjà traduit) 

###Display the Stripe button on your site with a simple shortcode (Generated and inserted automatically since 1.2.0!!!) [direct-stripe] and set your options :

* **type** : payment / subscription /donation
* **name** : Name displayed in Stripe modal form (shop name). Set by fefault to the sitename
* **description** : Product description displayed on modal form. Set by default to the site description.
* **amount** : Amount to charge if payment type (Stripe format : 100 is 1,00) or plan-id for subscription type, not required for donations
* **label** : Text displayed on button to display modal form
* **button_id** : give your button the id you want ex: button_id="first_button"
* **panellabel** : Text for modal form button
* **custom_role** : Add the role of your choice to the user (Useful to restrict content)
* **coupon** : coupon id set in stripe admin (only for subscriptions)
* **setup_fee** : Only for subscriptions, charge a one time fee on subscription activation
* **capture** : set it to false ( capture="false" ) in the shortcode to manually charge the transaction from your stripe'a admin panel later
* **display_amount** : set it to false ( display_amount="false" ) in the shortcode to make the modal form button not display the amount
* **currency** : use a currency argument to use per shortcode currencies => currency="EUR"
* **success_query** : pass query_vars into success redirection url => success_query="query1:var1,query2:var2" 
* **error_query** : pass query_vars into error redirection url => error_query="query1:var1,query2:var2"
* **success_url** : Success redirection option per button => success_url="http://wordpress.org/"
* **error_url** : Error redirection option per button => error_url="http://wordpress.org/"

###Three shortcode examples to simply add to pages / posts content or template

    -> Payment button for the amount of 50,00 (the currency set up in global settings) :
        - [direct-stripe type="payment" amount="5000" name="My Shop" description="The great product you dream of" label="Proceed to checkout" panellabel="Pay now"]

    -> Subscription button for the plan monthly-plan (created in stripe admin) with coupon first-month-50 (created in Stripe admin) :
        - [direct-stripe type="subscription" amount="monthly-plan" coupon="first-month-50" description="The great monthly plan" label="Subscribe" panellabel="That's it"]

    -> Donation button :
        - [direct-stripe type="donation" name="My plugin" description="Help me improve the plugin" label="Buy me coffee" panellabel="This will add one more setting option!"]


###Global Setup

Log in to your stripe's account or create one at https://dashboard.stripe.com/register

=>Configure settings in admin panel :

**-> Direct Stripe -> Settings**


**->General settings :**

    - Enter your Stripe API keys ( find them at https://dashboard.stripe.com/account/apikeys )
    - Option for test mode / keys
    - Set your stripe's account currency 
    - Choose a success and error pages
    - Choose a logo for your Stripes modal forms
	- Choose whether you want to collect extra billing information in Stripes modal forms
	

**-> Styles Settings :**

    - Choose to use custom buton
    - Set custom button main colors
    - Set custom button borders radius
    - Choose to use a T&C checkbox 
    - Set texts and link to T&C pages


**-> Emails Settings :**
   
	- Choose to use automated emails for successful payments to admin
    - Set Email subject and content
    - Choose to use automated emails for successful payments to Stripe's user
    - Set Email subject and content
    - Choose to use automated emails for unsuccessful payments to admin
    - Set Email subject and content
    - Choose to use automated emails for unsuccessful payments to Stripe's user

== Installation ==

1.0 Upload the plugin files to the /wp-content/plugins/direct-stripe directory, or install the plugin through the WordPress plugins screen directly. 

1.1 Activate the plugin through the 'Plugins' screen in WordPress

Log in to your stripe's account or create one at https://dashboard.stripe.com/register

=>Configure settings in admin panel :


== Changelog == 

=1.2.2.1=
* $admin_email restored

=1.2.2=
* Filters for emails subject
    direct_stripe_success_user_email_subject
    direct_stripe_success_admin_email_subject
    direct_stripe_error_user_email_subject
    direct_stripe_error_admin_email_subject

* Filters for emails content
    direct_stripe_success_user_email_content
    direct_stripe_success_admin_email_content
    direct_stripe_error_user_email_content
    direct_stripe_error_admin_email_content

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