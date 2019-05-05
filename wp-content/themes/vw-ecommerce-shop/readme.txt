=== VW Ecommerce Shop ===
Contributors: VWthemes
Tags: left-sidebar, right-sidebar, one-column, two-columns, three-columns, four-columns, grid-layout, custom-background, custom-logo, custom-menu, custom-header, custom-colors, editor-style, featured-images, footer-widgets, full-width-template, sticky-post, post-formats, flexible-header, featured-image-header, front-page-post-form, theme-options, translation-ready, threaded-comments, rtl-language-support, blog, e-commerce, portfolio
Requires at least: 4.7
Tested up to: 5.1.1
Requires PHP: 7.2.14
Stable tag: 0.3.6
License: GNU General Public License v3.0
License URI: http://www.gnu.org/licenses/gpl.html

 VW E-commerce Shop theme is the one that can check all the boxes relating to every need of your store. Our multipurpose E-commerce WordPress theme is social media integrated & highly responsive. It is built on bootstrap 4 with using clean coding standards.

== Description ==

 VW E-commerce Shop theme is the one that can check all the boxes relating to every need of your store. Our multipurpose E-commerce WordPress theme is social media integrated & highly responsive. It is built on bootstrap 4 with using clean coding standards. It is cross-browser & woo commerce compatible, has Call to action button, its SEO & user-friendly and works at its optimal best across all platforms.  You may be a business owner, informative firm, travel agency, designing firm, artist, restaurant owner, construction agency, healthcare firm, digital marketing agency, blogger, corporate business, freelancers, online bookstore, mobile & tablet store, apparel store, fashion store, sport store, handbags store, cosmetics shop, jewellery store and etc. You can set all kinds of stores up with much ease using our theme, as it is made for people like you.  You could be a freelancer or a corporate entity or a sole proprietor. Our theme will boost your business and improve your revenue with the aid of seamless features and exclusive functionalities. Running an online E-commerce store along with your physical store is a hectic task. Your trouble is doubled, when you are not only supposed to take care of the physical presence of the store but you are also required to bring the online store up to speed. That is much like running two branches of a single business. You cannot possibly put your faith into sub-standard things and expect results. E-commerce store should have a theme that is both impressive and lucrative. This medium attracts customers from so many platforms that it becomes important for the theme and the webpage to perform at its 100% at all times.

== Changelog ==

= 0.1 =
    -- Intial version Release

= 0.2 =
  -- Console Error Removed
  -- Screenshot Change
  -- Styling done

= 0.2.1 =
  --  Improper use of esc_url function, url parameter should not be empty
    echo '<a href="';
      echo esc_url();
    echo '">';
  --  No need to escape url when using on if conditionLicense Missing for header image( headphone ) of screenshot
  --  License Missing for header image( headphone ) of screenshot
  --  Use esc_url to escape url instead of esc_html
  --  Could you please tell me the reason to add this css on all admin pages. Add on specific admin pages only.
  --  use wp_reset_postdata() to reset global $post variable. custom-home-page.php
  --  post id will never be negative integer, so please use absint to esape postID.
    $mod = intval( get_theme_mod( 'vw_ecommerce_shop_page' . $count ));
  --  There is no use of wp_reset_postdata() here
    $vw_ecommerce_shop_k = 0;
  --  always follow late escaping. here you are escaping twice, just escpae in the point where you want to display the data
  --  get_posts() does not modify query post, so no need to use wp_reset_postdata()

= 0.2.2  =
  -- Removed the default data represent content creation.
  -- Changed the content creation to dynamic product category.

= 0.2.3 =
  -- Added the woocommerce theme support.
  -- Remove the unwanted code.
  -- Did some customization.

= 0.2.4 =
  -- Did the css changes in shop page.

= 0.2.5 =
  -- Set the logo title and description properly.
  -- Removed the email code.
  -- Removed the template_part called to does not exist i.e. get_template_part( 'no-results', 'archive' );

= 0.2.6 =
  -- Update font url code in function.php file.
  -- Update fontawesome file.
  -- Done the customization in footer.
  -- Change "text" to "url" in customizer.php file.

= 0.3.0 =
  -- Added Typography.
  -- Updated Woocommerce.
  -- Added post formats tag.
  -- Fixed theme bugs.
  -- Done responsive media styling.

= 0.3.1 =
  -- Update: Bootstrap version 4.0.0
  -- Update: language folder pot file.
  -- Update: rtl file.
  -- Added:  Post format, custom header, featured image header tags.
  -- Fixed:  Theme Minor issues.

= 0.3.2 =
  -- Update: Ecommerce in theme.
  -- Update: language folder pot file.
  -- Fixed:  Theme Error.

= 0.3.3 =
  -- Changed the woocommerce checkout page css.

= 0.3.4 =
  -- Removed: Translation from fonts.
  -- Fixed: Theme Error

= 0.3.5 =
  -- Updated: Woocommerce.
  -- Added:   function for product columns.
  -- Fixed:   Theme Error.

= 0.3.6 =
  -- Readme file is changed.
  -- Updated Language Folder.
  -- Fixed: Theme Error.
  -- Changed Slider.

== Resources ==

VW Ecommerce Shop WordPress Theme, Copyright 2017 VW Themes
VW Ecommerce Shop is distributed under the terms of the GNU GPL.

VW Ecommerce Shop WordPress Theme bundles the following third-party resources:

*   CSS bootstrap.css
    -- Copyright 2011-2018 The Bootstrap Authors
    -- https://github.com/twbs/bootstrap/blob/master/LICENSE
    
*   JS bootstrap.js
    -- Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    -- https://github.com/twbs/bootstrap/blob/master/LICENSE

*   Customizer Pro, Copyright 2016 © Justin Tadlock.
    License: All code, unless otherwise noted, is licensed under the GNU GPL, version 2 or later.
    Source: https://github.com/justintadlock/trt-customizer-pro

*   Typogarphy
    Source: https://github.com/justintadlock/customizer-typography

*   Free to use and abuse under the MIT license.
    -- http://www.opensource.org/licenses/mit-license.php
    -- font-awesome.css and fonts folder
    Font Awesome 5.0.0 by @davegandy - http://fontawesome.io - @fontawesome
    -- License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)

*   Open Sans font - https://www.google.com/fonts/specimen/Open+Sans
    PT Sans font - https://fonts.google.com/specimen/PT+Sans
    Roboto font - https://fonts.google.com/specimen/Roboto
    License: Distributed under the terms of the Apache License, version 2.0 http://www.apache.org/licenses/LICENSE-2.0.html

* Stocksnap Images
  License: CC0 1.0 Universal (CC0 1.0) 
  Source: https://stocksnap.io/license
  
  Slider image, Copyright Burst
  License: CC0 1.0 Universal (CC0 1.0)
  Source: https://stocksnap.io/photo/EXCBJA3FFQ

  Product image, Copyright Nordwood Themes
  License: CC0 1.0 Universal (CC0 1.0)
  Source: https://stocksnap.io/photo/Y6SDOYW0KA

  Product image, Copyright Freestocks.org
  License: CC0 1.0 Universal (CC0 1.0)
  Source: https://stocksnap.io/photo/EC1PNPT1N1

  Product image, Copyright Ylanite Koppens
  License: CC0 1.0 Universal (CC0 1.0)
  Source: https://stocksnap.io/photo/JMGEUCEUJY

  Product image, Copyright Matthew Henry
  License: CC0 1.0 Universal (CC0 1.0)
  Source: https://stocksnap.io/photo/674UH7HXHE

== Theme Documentation ==
Documentation : https://www.vwthemesdemo.com/docs/free-vw-ecommerce-lite/