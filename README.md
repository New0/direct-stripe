# Direct-Stripe
Stripe payment button for WordPress
Stripe is a payment getway
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

You can also insert direct stripe buttons using a shortcode [direct-stripe value="ds-154185704588"] (useful for widgets and templates) (  ds-1541857045880 being the unique ID of the button created at Direct Stripe settings under the Buttons Settings tab )

