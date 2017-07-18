=== Direct Stripe ===
Contributors: nahuelmahe
Donate link: https://newo.me/direct-stripe-payment-button-for-wordpress/
Tags: stripe, stripe button ,custom stripe button, stripe modal form, stripe checkout, direct checkout, payments, donations, subscriptions, payments button, credit card, checkout button
Requires at least: 4.2
Tested up to: 4.8.0
Stable tag: 2.O.7
License: GPLv2 or later 
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Stripe buttons. High conversion checkout without leaving your site! Payments, donations, subscriptions! Styling, T&C and automated emails options!


== Description ==
**Payments, donations and subscriptions!**

**High conversion Stripe checkout buttons, easily start charging without leaving your website.**

**The shortcode is automatically generated and inserted in editor areas with a simple options form!!!**

Automatically recognize email address of logged-in users

**Add custom user roles**

Customize the button looks.

Terms and conditions checkbox option.

Setup automated emails sent after a successful or error action on modal form submission.

**Option for redirecting to landing pages after payments or errors.**

**Logs users and transactions in WordPress admin.**

**Option to ask for the billing and or shipping details**

List of actions and filters hooks at <https://newo.me/direct-stripe-actions-and-filters-hooks/>

Ready for translations (Français déjà traduit) 

###Display the Stripe button on your site with a simple shortcode (Generated and inserted automatically since 1.2.0!!!) [direct-stripe] and set your options :

* **type** : payment / subscription /donation
* **amount** : Amount to charge if payment type (Stripe format : 100 is 1,00) or plan-id for subscription type, not required for donations
* **button_id** : give your button the id you want ex: button_id="first_button"
* **name** : Name displayed in Stripe modal form (shop name). Set by default to the sitename
* **label** : Text displayed on button to display modal form
* **panellabel** : Text for modal form button
* **description** : Product description displayed on modal form. Set by default to the site description.
* **currency** : use a currency argument to use per shortcode currencies => currency="EUR"
* **tc** : Ask for terms and conditions validation
* **billing** : Ask billing details
* **shipping** : Ask shipping details
* **rememberme** : Ask shipping details
* **coupon** : coupon id set in stripe admin (only for subscriptions)
* **setup_fee** : Only for subscriptions, charge a one time fee on subscription activation
* **capture** : set it to false ( capture="false" ) in the shortcode to manually charge the transaction from your stripe'a admin panel later
* **display_amount** : set it to false ( display_amount="false" ) in the shortcode to make the modal form button not display the amount
* **custom_role** : Add the role of your choice to the user (Useful to restrict content)
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

**-> Direct Stripe -> Settings**


**->General settings :**

    - Enter your Stripe API keys ( find them at https://dashboard.stripe.com/account/apikeys )
    - Option for test mode / keys
    - Set your stripe's account currency (can be overriden per button)
    - Set the success and error messages displayed after transactions
    - Or Choose a success and error pages (can be overriden per button)
    - Choose a logo for your Stripes modal forms
	- Choose to collect billing details in Stripes modal forms (can be overriden per button)
	- Choose to collect shipping details (can be overriden per button)
	

**-> Styles Settings :**

    - Choose to use custom button
    - Set custom button main colors
    - Set custom button borders radius
    - Choose to use a T&C checkbox (can be overriden per button)
    - Set texts and link to T&C pages


**-> Emails Settings :**
   
	*Choose to send automated emails to :*
	  - admin for successful payments
	  - Stripe's user for successful payments
	  - admin for unsuccessful payments
	  - Stripe's user for unsuccessful payments
    *Set Email subject and content for each*

== Frequently Asked Questions ==

In progress, in the meanwhile asking yours may help to fill this section.

== Screenshots ==

1. Admin pages general options
2. Admin page styles options
3. Admin page emails options
4. Logs details
5. Add Direct Stripe shortcode button
6. Form to generate and insert shortcode

== Changelog ==

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