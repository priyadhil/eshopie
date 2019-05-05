=== Smart Variations Images for WooCommerce ===
Contributors: drosendo, freemius
Tags: variations image,woocommerce variation image gallery, additional variation image gallery, product variation image gallery, product variation image, variation images gallery, additional image, additional variation image, additional variations, WooCommerce variation product thumbnail gallery
Requires at least: 4.0.0
Tested up to: 5.1.1
Stable tag: 4.0.24

This is a WooCommerce extension plugin, that allows the user to setup UNLIMITED images to serve as additional variation images of the product.
Smart Variations Images is currently the best and most rated Variations Images plugin on WordPress.
This additional variation images plugin works by re-using the images gallery as the variable product variations images in a very simple and quick way, without having to insert images in the variable product variations tab.

== Description ==

=== How To SVI works and Setup ===

[youtube https://youtu.be/QMV8XBeub_o]

By default WooCommerce will only swap the main variation image when you select a product variation, not the gallery images below it.

This extension allows visitors to your online store to be able to swap different gallery images when they select a product variation.
Adding this feature will let visitors see different images of a product variation all in the same color and style.

This extension will allow the use of multiple images per variation and supports well coded and WooCommerce compatible Swatches Plugins.
SVI has been intelligently engineered with performance in mind, coupled with the best display options. The result is a simple plugin that makes adding Additional Variation Images a breeze!


<h4>Requirements</h4>
<ul>
<li>PHP 5.6.30 or later</li>
<li>ReduxFramework Plugin to manage the options</li>
<li>WordPress 4.0 or later</li>
</ul>

<strong>WooCommerce 3.0+ Ready</strong>

<strong>Please give your review!</strong> Good or bad all is welcomed!

= PREMIUM FEATURES OF SMART VARIATIONS IMAGES =
[Live Demo](http://svi.rosendo.pt/pro) | [Upgrade to PRO](https://www.rosendo.pt/smart-variations-images-pro) | [Support](https://www.smart-variations.com/)

<ul>
<li>Main Image/thumbnails swap on choose variation</li>
<li>Multiple Images for Variation</li>
<li>Ability to assign images to a <b>Multiple Variations</b>.</li>
<li>Ability to use same image across multiple variations.</li>
<li>Allow same image to be shared across different products with diferent variations</li>
<li>Show Variation as Cart Image</li>
<li>Show Variation in admin order</li>
<li>Show Variation in email order</li>
<li>Ligthbox</li>
<li>Stacked Image display - Fully Responsive</li>
<li>Advanced Slider (Navigation Arrows & Color + Thumbnail Positions and more) - Fully Responsive</li>
<li>Advanced Magnifier Lens (Lens Style & Size + Lens Border Color + Zoom Type & Effects and more)</li>
<li>Extra Thumbnail Options (Disabled Thumbnails + Select Swap + Thumbnail Click Swap + Keep Thumbnails Visible)</li>
<li>Extra Layout Fixes (Add Custom CSS Classes + Remove Image Class)</li>
<li>WPML Compatible</li>
<li>Responsive</li>
<li>Priority Support</li>
</ul>


Visit [SMART VARIATIONS](https://www.rosendo.pt/smart-variations-images-pro/) for more information 

== Installation ==

1. Upload the entire `smart-variations-images` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Install required plugin called ReduxFramework, this is a options framework for WordPress that allow the user to choose what options wants activated for SVI
4. Go to WooCommerce > SVI and enable SVI to work in the front-end
5. On your product go to SVI Variations Gallery and setup the galleries according to the variations you want
6. Save the product
7. Good luck with sales :)

== Frequently Asked Questions ==

= Is it compatible with any Theme? =

Yes! Themes that follow the default WooCommerce implementation will usually work with this plugin. However, some themes use an unorthodox method to add their own lightbox/slider, which breaks the hooks this plugin needs.
SVI was tested with the mos popular themes like OceanWP / Astra / Flatsome / Avada / Storefront / WR Nitro / Divi / BeTheme / Zerif Lite / Hestia / Shopisle and more.

= Does it support page builders?  =

SVI is not compatible with custom product pages built with Builders (ex: Visual Composer, UX, Builder, Unyson, etc.), these Builders completely take over the design and hooks of the pages running them, so if a builder is applied to a product page SVI will not be accessible.

Although if you need it, I can probably figure something out!

= How do I configure it to work? =

1. Create a product and build it's attributes & variations
2. Go to "SVI Variations Gallery" tab and setup the galleries according to the variations you want displayed
3. Save the product
4. Go to WooCommerce > SVI > Global TAB and "Enable SVI" so that is works on the Front-End
5. Good luck with sales :)
6. What the video if have doubts (https://youtu.be/QMV8XBeub_o)

= What Browsers does SVI support =

SVI doesn’t support IE since is no longer maintained by Microsoft since at least 2015. and it doesn’t support ecmascript. [READ MORE](microsoft.com/en-us/windowsforbusiness/end-of-ie-support)

SVI is tested to run on:
– Microsoft EDGE
– Safari
– Chrome
– Firefox

= What happens to my theme default gallery display =

SVI replaces your default theme settings/options for the image & thumbnails area so don’t expect to use any of your theme features for this area. 
Otherwise SVI wouldn’t be able to do the magic. Each theme has is own structure and wouldn't be feasible to create all the available layouts combinations on the same plugin so SVI just had to build is own layout.

== Screenshots ==

1. Display Images according to variation
2. Ligthbox
3. Setup the combinations
4. ReduxFramework to manage the options

== Changelog ==

= 4.0.24 =
* Added ability to filter images before display, apply_filters('svi_gallery_images')
* Prevent Fatal errors with free version if installed
* Support for other product types besides the default ones
* Fix access for shortcode handling
* [PRO] Improved quickview support

= 4.0.23 =
* Fix PhotoSwipe element from showing when not called
* Improved PhotoSwipe Load
* PRO slider hide navigation arrows if not needed

= 4.0.22 =
* Fix Disable SVI option on product from not showing any image

= 4.0.21 =
* Further improvement for vendor.js faster load times

= 4.0.20 =
* Fix incorrect install message

= 4.0.19 =
* Optimized vendor file
* Improvement to detect proper attributes_form

= 4.0.18 =
* Fix Prevent jQuery conflict with some themes
* PRO added Stacked Images layout

= 4.0.17 =
* PRO fix Slider time display
* Fix Multisite license control

= 4.0.16 =
* PRO fix Fallback for Default Gallery if no matching found and Default gallery exists
* Fix Lens RTL/LTR window position

= 4.0.15 =
* PRO fix Slider autoHeigth
* PRO fix Fallback for Default Gallery if no matching found and Default gallery exists

= 4.0.14 =
* Fix Admin Warning
* Fix Dismiss alert not hide after dismissal

= 4.0.13 =
* Thumbnails css Fix
* Readme update

= 4.0.12 =
* Security Fix
* Fix possible WPML mismatch
* PRO improved variation matching
* PRO Fix Keep Thumbnails

= 4.0.11 =
* Fix bad ajax request causing 500

= 4.0.10 =
* Correct image link assets/img/svi-notice.png

= 4.0.9 =
* Fixed missing files on previous version causing Fatal Error

= 4.0.8 =
* Fixed caption encoding chars
* Added option to use Featured Image as pre-loader
* Fixed possible fatal error on render
* Removed srcset to improve load speed
* Added help
* PRO improved quick view

= 4.0.7 =
* Fixed thumbnails hidden
* Fixed error 500 on WooCommerce Status

= 4.0.6 =
* Fixed Columns not showing properly

= 4.0.5 =
* Fixed Ligthbox not showing up with lens
* Fixed Ligthbox arrows no showing

= 4.0.4 =
* Fixed vertical thumbnails
* Fixed color lens missing
* Added Lens Window costum width/height 

= 4.0.3 =
* Improved install procedure
* Updated effects

= 4.0.2 =
* Fix DIVI compatibility
* Updated Readme

= 4.0.1 =
* Fix incorrect migration from v3 to v4 for special chars

= 4.0.0 =
* Complete code re-inveted
* VUE support
* Freemius Integration
