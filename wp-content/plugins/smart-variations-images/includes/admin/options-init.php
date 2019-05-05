<?php

if ( !class_exists( 'Redux' ) ) {
    return;
}
/**
 * Get size information for all currently-registered image sizes.
 *
 * @global $_wp_additional_image_sizes
 * @uses   get_intermediate_image_sizes()
 * @return array $sizes Data for all currently-registered image sizes.
 */
function get_image_sizes()
{
    global  $_wp_additional_image_sizes ;
    $sizes = array(
        'woocommerce_thumbnail',
        'woocommerce_single',
        'woocommerce_gallery_thumbnail',
        'shop_catalog',
        'shop_single',
        'shop_thumbnail',
        'full'
    );
    foreach ( get_intermediate_image_sizes() as $_size ) {
        
        if ( in_array( $_size, array(
            'thumbnail',
            'medium',
            'medium_large',
            'large'
        ) ) ) {
            array_push( $sizes, $_size );
        } elseif ( isset( $_wp_additional_image_sizes[$_size] ) ) {
            array_push( $sizes, $_size );
        }
    
    }
    $available_sizes = array();
    foreach ( $sizes as $size ) {
        $available_sizes[$size] = $size;
    }
    return $available_sizes;
}

function removeDemoModeLink_svipro()
{
    // Be sure to rename this function to something more unique
    if ( class_exists( 'ReduxFrameworkPlugin' ) ) {
        remove_filter(
            'plugin_row_meta',
            array( ReduxFrameworkPlugin::get_instance(), 'plugin_metalinks' ),
            null,
            2
        );
    }
    if ( class_exists( 'ReduxFrameworkPlugin' ) ) {
        remove_action( 'admin_notices', array( ReduxFrameworkPlugin::get_instance(), 'admin_notices' ) );
    }
}

add_action( 'init', 'removeDemoModeLink_svipro' );
// This is your option name where all the Redux data is stored.
$opt_name = "woosvi_options";
$args = array(
    'opt_name'            => 'woosvi_options',
    'use_cdn'             => true,
    'dev_mode'            => false,
    'forced_dev_mode_off' => false,
    'display_name'        => ( svi_fs()->can_use_premium_code__premium_only() ? 'SMART VARIATIONS IMAGES PRO' : 'SMART VARIATIONS IMAGES' ),
    'display_version'     => SVI_VERSION,
    'page_slug'           => 'woocommerce_svi',
    'page_title'          => ( svi_fs()->can_use_premium_code__premium_only() ? 'SMART VARIATIONS IMAGES PRO for WooCommerce' : 'SMART VARIATIONS IMAGES for WooCommerce' ),
    'update_notice'       => true,
    'admin_bar'           => true,
    'menu_type'           => 'submenu',
    'allow_sub_menu'      => true,
    'menu_title'          => ( svi_fs()->can_use_premium_code__premium_only() ? 'SVI PRO' : 'SVI' ),
    'page_parent'         => 'woocommerce',
    'customizer'          => false,
    'default_mark'        => '*',
    'hints'               => array(
    'icon'          => 'el el-adjust-alt',
    'icon_position' => 'right',
    'icon_color'    => 'lightgray',
    'icon_size'     => 'normal',
    'tip_style'     => array(
    'color' => 'light',
),
    'tip_position'  => array(
    'my' => 'top left',
    'at' => 'bottom right',
),
    'tip_effect'    => array(
    'show' => array(
    'duration' => '500',
    'event'    => 'mouseover',
),
    'hide' => array(
    'duration' => '500',
    'event'    => 'mouseleave unfocus',
),
),
),
    'output_tag'          => true,
    'cdn_check_time'      => '1440',
    'page_permissions'    => 'manage_woocommerce',
    'save_defaults'       => true,
    'database'            => 'options',
    'transient_time'      => '3600',
    'network_sites'       => true,
);
Redux::setArgs( $opt_name, $args );
Redux::setSection( $opt_name, array(
    'title'  => __( 'Global', 'wc_svi' ),
    'id'     => 'general-section',
    'icon'   => 'el el-home',
    'fields' => array( array(
    'id'      => 'default',
    'type'    => 'switch',
    'title'   => __( 'Enable SVI', 'wc_svi' ),
    'desc'    => __( 'Activate or Deactivate SVI from running on your site.', 'wc_svi' ),
    'on'      => __( 'Enable', 'wc_svi' ),
    'off'     => __( 'Deactivate', 'wc_svi' ),
    'default' => false,
) ),
) );
Redux::setSection( $opt_name, array(
    'title'      => __( 'Variation Form', 'wc_svi' ),
    'id'         => 'general-subsection-variations',
    'subsection' => true,
    'fields'     => array( array(
    'id'    => 'svivariationform_info',
    'type'  => 'info',
    'style' => 'success',
    'icon'  => 'el-icon-info-sign',
    'title' => __( 'Upgrade to PRO', 'wc_svi' ),
    'desc'  => __( 'Unlock all these features <a href="/wp-admin/admin.php?page=woocommerce_svi-pricing" target="_blank">here</a>.', 'wc_svi' ),
), array(
    'id'       => 'triger_match',
    'type'     => 'info',
    'style'    => 'warning',
    'title'    => __( 'Trigger Match', 'wc_svi' ),
    'subtitle' => __( 'Only activate if you understand the effect', 'wc_svi' ),
    'desc'     => __( 'When user selects an attribute the swapping images will be showed according to that exact selection made, SVI will display the exact gallery that corresponds to that combination. If combination doesnt exist it will fallback to default images. No grouping(combination/matching of all of atributes) will occur.', 'wc_svi' ),
) ),
) );
Redux::setSection( $opt_name, array(
    'title'      => __( 'Checkout', 'wc_svi' ),
    'id'         => 'general-subsection-checkout',
    'subsection' => true,
    'fields'     => array( array(
    'id'    => 'svicheckout_info',
    'type'  => 'info',
    'style' => 'success',
    'icon'  => 'el-icon-info-sign',
    'title' => __( 'Upgrade to PRO', 'wc_svi' ),
    'desc'  => __( 'Unlock all these features <a href="/wp-admin/admin.php?page=woocommerce_svi-pricing" target="_blank">here</a>.', 'wc_svi' ),
), array(
    'id'    => 'svicart',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Cart Image', 'wc_svi' ),
    'desc'  => __( 'Display choosen variation image in cart/checkout instead of default Product image.', 'wc_svi' ),
) ),
) );
Redux::setSection( $opt_name, array(
    'title'      => __( 'Image', 'wc_svi' ),
    'id'         => 'general-subsection-sizes',
    'subsection' => true,
    'fields'     => array(
    array(
    'id'    => 'sviimage_info',
    'type'  => 'info',
    'style' => 'success',
    'icon'  => 'el-icon-info-sign',
    'title' => __( 'Upgrade to PRO', 'wc_svi' ),
    'desc'  => __( 'Unlock all these features <a href="/wp-admin/admin.php?page=woocommerce_svi-pricing" target="_blank">here</a>.', 'wc_svi' ),
),
    array(
    'id'    => 'imagecaption',
    'type'  => 'info',
    'title' => __( 'Image Caption', 'wc_svi' ),
    'style' => 'warning',
    'desc'  => __( 'Show Image Title or Caption under main image.', 'wc_svi' ),
),
    array(
    'id'    => 'sviemail',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Show Image in Email', 'wc_svi' ),
    'desc'  => __( 'Display choosen variation image in order email.', 'wc_svi' ),
),
    array(
    'id'    => 'sviemail',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Show Image in Email', 'wc_svi' ),
    'desc'  => __( 'Display choosen variation image in order email.', 'wc_svi' ),
),
    array(
    'id'       => 'sviemailadmin',
    'type'     => 'info',
    'style'    => 'warning',
    'required' => array( 'default', '=', '1' ),
    'title'    => __( 'Show Image in Admin Edit Order', 'wc_svi' ),
    'desc'     => __( 'Display choosen variation image in the admin edit order page.', 'wc_svi' ),
),
    array(
    'title'   => __( 'Main Image Size', 'wc_svi' ),
    'desc'    => __( 'Select your main image size from the registred sizes', 'wc_svi' ),
    'id'      => 'main_imagesize',
    'default' => 'shop_single',
    'type'    => 'select',
    'options' => get_image_sizes(),
),
    array(
    'id'       => 'quick_view',
    'type'     => 'info',
    'style'    => 'warning',
    'required' => array( 'default', '=', '1' ),
    'title'    => __( 'Enable Quick View append', 'wc_svi' ),
    'desc'     => __( 'If theme has Quick View, SVI <b><u>will try</u></b> to append to it, SVI does not guarantee 100% compatibility.<br>This is a "HACK".<br><b>NOTE</b>: Activating this option does not enable Quick View on your site.', 'wc_svi' ),
),
    array(
    'title'   => __( 'Thumbnail Image Size', 'wc_svi' ),
    'desc'    => __( 'Select your Thumbnail size from the registred sizes', 'wc_svi' ),
    'id'      => 'thumb_imagesize',
    'default' => 'shop_thumbnail',
    'type'    => 'select',
    'options' => get_image_sizes(),
)
),
) );
/** Stacked */
Redux::setSection( $opt_name, array(
    'title'  => __( 'Stacked layout', 'wc_svi' ),
    'id'     => 'stacked-svi',
    'fields' => array(
    array(
    'id'    => 'svistacked_info',
    'type'  => 'info',
    'style' => 'success',
    'icon'  => 'el-icon-info-sign',
    'title' => __( 'Upgrade to PRO', 'wc_svi' ),
    'desc'  => __( 'Unlock all these features <a href="/wp-admin/admin.php?page=woocommerce_svi-pricing" target="_blank">here</a>.', 'wc_svi' ),
),
    array(
    'id'    => 'stacked',
    'type'  => 'info',
    'title' => __( 'Activate stacked images', 'wc_svi' ),
    'desc'  => __( 'All images will be showed in a single column, stacked. Only in desktop mode, mobile will fallback to default settings.', 'wc_svi' ),
),
    array(
    'id'    => 'sticky',
    'type'  => 'info',
    'title' => __( 'Sticky Product Summary', 'wc_svi' ),
    'desc'  => __( 'Product Summary will slide side by side with the images until it reaches last image', 'wc_svi' ),
),
    array(
    'id'    => 'sticky_margin',
    'type'  => 'info',
    'title' => __( 'Margin top', 'wc_svi' ),
    'desc'  => __( 'Adjust margin top of sticky element (in px) if needed due to sticky menu elements.', 'wc_svi' ),
    'class' => 'svisubfield',
)
),
) );
/** Lightbox */
Redux::setSection( $opt_name, array(
    'title'  => __( 'Lightbox', 'wc_svi' ),
    'id'     => 'lightbox-svi',
    'fields' => array(
    array(
    'id'    => 'svilightbox_info',
    'type'  => 'info',
    'style' => 'success',
    'icon'  => 'el-icon-info-sign',
    'title' => __( 'Upgrade to PRO', 'wc_svi' ),
    'desc'  => __( 'Unlock all these features <a href="/wp-admin/admin.php?page=woocommerce_svi-pricing" target="_blank">here</a>.', 'wc_svi' ),
),
    array(
    'id'       => 'lightbox',
    'type'     => 'switch',
    'required' => array( array( 'default', '=', '1' ) ),
    'title'    => __( 'Activate Lightbox', 'wc_svi' ),
    'default'  => false,
),
    array(
    'id'       => 'lightbox_icon',
    'type'     => 'switch',
    'required' => array( array( 'default', '=', '1' ), array( 'lightbox', '=', '1' ) ),
    'title'    => __( 'Show Icon', 'wc_svi' ),
    'desc'     => __( 'Enable click icon on image for ligthbox.', 'wc_svi' ),
    'default'  => false,
),
    array(
    'id'    => 'lightbox_iconclick',
    'type'  => 'info',
    'style' => 'warning',
    'class' => 'svisubfield',
    'title' => __( 'Enable Icon Click', 'wc_svi' ),
    'desc'  => __( 'Ligthbox only available on icon click, disables ligthbox on image click.', 'wc_svi' ),
),
    array(
    'id'    => 'lightbox_iconcolor',
    'type'  => 'info',
    'style' => 'warning',
    'class' => 'svisubfield',
    'title' => __( 'Icon Color', 'wc_svi' ),
    'desc'  => __( 'Pick a color for the icon.', 'wc_svi' ),
),
    array(
    'id'    => 'lightbox_thumbnails',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Show Thumbnails', 'wc_svi' ),
    'desc'  => __( 'Display thumbnails inside Ligthbox with collapse/expand feature.', 'wc_svi' ),
),
    array(
    'id'       => 'lightbox_close',
    'type'     => 'switch',
    'required' => array( array( 'lightbox', '=', '1' ) ),
    'title'    => __( 'Show Close Button', 'wc_svi' ),
    'default'  => true,
),
    array(
    'id'    => 'lightbox_title',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Show Image Titles', 'wc_svi' ),
),
    array(
    'id'       => 'lightbox_fullScreen',
    'type'     => 'switch',
    'required' => array( array( 'lightbox', '=', '1' ) ),
    'title'    => __( 'Show FullScreen Option', 'wc_svi' ),
    'default'  => false,
),
    array(
    'id'       => 'lightbox_zoom',
    'type'     => 'switch',
    'required' => array( array( 'lightbox', '=', '1' ) ),
    'title'    => __( 'Show Zoom Option', 'wc_svi' ),
    'default'  => false,
),
    array(
    'id'       => 'lightbox_share',
    'type'     => 'switch',
    'required' => array( array( 'lightbox', '=', '1' ) ),
    'title'    => __( 'Show Share Option', 'wc_svi' ),
    'default'  => false,
),
    array(
    'id'       => 'lightbox_counter',
    'type'     => 'switch',
    'required' => array( array( 'lightbox', '=', '1' ) ),
    'title'    => __( 'Show Counter Option', 'wc_svi' ),
    'default'  => false,
),
    array(
    'id'       => 'lightbox_controls',
    'type'     => 'switch',
    'required' => array( array( 'lightbox', '=', '1' ) ),
    'title'    => __( 'Show Arrows Option', 'wc_svi' ),
    'default'  => true,
)
),
) );
/** SLIDER SECTION */
Redux::setSection( $opt_name, array(
    'title'  => __( 'Slider', 'wc_svi' ),
    'id'     => 'slider-subsection',
    'fields' => array(
    array(
    'id'    => 'svislider_info',
    'type'  => 'info',
    'style' => 'success',
    'icon'  => 'el-icon-info-sign',
    'title' => __( 'Upgrade to PRO', 'wc_svi' ),
    'desc'  => __( 'Unlock all these features <a href="/wp-admin/admin.php?page=woocommerce_svi-pricing" target="_blank">here</a>.', 'wc_svi' ),
),
    array(
    'id'    => 'slider',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Activate Slider', 'wc_svi' ),
),
    array(
    'id'      => 'slider_center',
    'type'    => 'info',
    'style'   => 'warning',
    'title'   => __( 'Deactivate Centered thumbnails', 'wc_svi' ),
    'desc'    => __( 'Thumbnails will be forced to start in begining of element.', 'wc_svi' ),
    'default' => false,
),
    array(
    'id'      => 'slider_effect',
    'type'    => 'info',
    'style'   => 'warning',
    'title'   => __( 'Tranisition effect', 'wc_svi' ),
    'desc'    => __( 'Could be "slide", "fade", "cube", "coverflow" or "flip".<br><b>Note:</b> "Cube & Flip" will not work for Vertical thumbnails.', 'wc_svi' ),
    'default' => 'slide',
),
    array(
    'id'    => 'slider_pagination',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Pagination', 'wc_svi' ),
    'desc'  => __( 'Activates pagination options.', 'wc_svi' ),
),
    array(
    'id'    => 'slider_paginationType',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Pagination Type', 'wc_svi' ),
    'desc'  => __( 'String with type of pagination. Can be "bullets", "fraction", "progressbar" or "custom".', 'wc_svi' ),
),
    array(
    'id'    => 'slider_paginationclickable',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Clickable Bullets', 'wc_svi' ),
    'desc'  => __( 'If true then clicking on pagination button will cause transition to appropriate slide. Only for bullets pagination type.', 'wc_svi' ),
),
    array(
    'id'    => 'slider_paginationDynamicBullets',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Dynamic Bullets', 'wc_svi' ),
    'desc'  => __( 'Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time.', 'wc_svi' ),
),
    array(
    'id'       => 'slider_navigation',
    'type'     => 'info',
    'style'    => 'warning',
    'title'    => __( 'Main Navigation', 'wc_svi' ),
    'subtitle' => __( 'Add arrow navigation to main image.', 'wc_svi' ),
),
    array(
    'id'       => 'slider_navigation_thumb',
    'type'     => 'info',
    'style'    => 'warning',
    'title'    => __( 'Thumb Navigation', 'wc_svi' ),
    'subtitle' => __( 'Add arrow navigation to thumbnails.', 'wc_svi' ),
),
    array(
    'id'    => 'slider_spaceBetween',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Space Between Thumbnail', 'wc_svi' ),
    'desc'  => __( 'Distance between thumbnail slides in px. Default: 15', 'wc_svi' ),
),
    array(
    'id'    => 'slider_navcolor',
    'title' => __( 'Nav Color', 'wc_svi' ),
    'desc'  => __( 'Select your navigation color. Requires Main Navigation or Thumb navigation On.', 'wc_svi' ),
    'type'  => 'info',
    'style' => 'warning',
),
    array(
    'id'       => 'slider_autoslide',
    'type'     => 'info',
    'style'    => 'warning',
    'title'    => __( 'Auto Slide', 'wc_svi' ),
    'subtitle' => __( 'Add auto sliding.', 'wc_svi' ),
),
    array(
    'id'    => 'slider_autoslide_ms',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Auto Slide time (ms)', 'wc_svi' ),
    'desc'  => __( 'Delay between transitions (in ms). If this parameter is not specified or is 0(zero), auto play will be 2500 (2, 5s)', 'wc_svi' ),
)
),
) );
/** LENS */
Redux::setSection( $opt_name, array(
    'title'  => __( 'Magnifier Lens', 'wc_svi' ),
    'id'     => 'lens-section',
    'fields' => array(
    array(
    'id'    => 'svi_infolens',
    'type'  => 'info',
    'style' => 'success',
    'icon'  => 'el-icon-info-sign',
    'title' => __( 'Upgrade to PRO', 'wc_svi' ),
    'desc'  => __( 'Unlock all these features <a href="/wp-admin/admin.php?page=woocommerce_svi-pricing" target="_blank">here</a>.', 'wc_svi' ),
),
    array(
    'id'       => 'lens',
    'type'     => 'switch',
    'required' => array( 'default', '=', '1' ),
    'title'    => __( 'Activate Magnifier Lens', 'wc_svi' ),
),
    array(
    'title' => __( 'Mobile Enabled', 'wc_svi' ),
    'id'    => 'lens_mobiledisabled',
    'type'  => 'info',
    'style' => 'warning',
    'desc'  => __( 'NOTE: I recommend this option be off, doesnt make sense in mobile since the finger will be over the lens execpt for inner. Lens is Unvailable for "Window" Zoom type.', 'wc_svi' ),
),
    array(
    'title' => __( 'Zoom Type', 'wc_svi' ),
    'id'    => 'lens_zoomtype',
    'desc'  => __( 'Choose from Lens, Inner or Window to let your client explore the product further', 'wc_svi' ),
    'type'  => 'info',
    'style' => 'warning',
),
    array(
    'title' => __( 'Disable Lens Zoom Contain', 'wc_svi' ),
    'id'    => 'containlenszoom',
    'type'  => 'info',
    'style' => 'warning',
    'desc'  => __( 'NOTE: If active in some themes this option may not work properly.', 'wc_svi' ),
),
    array(
    'title' => __( 'Lens Format', 'wc_svi' ),
    'id'    => 'lens_type',
    'type'  => 'info',
    'style' => 'warning',
    'desc'  => __( 'Choose from between Round or Square, according to the available Zoom type.', 'wc_svi' ),
),
    array(
    'id'    => 'lens_lensFadeIn',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Fade In Effect', 'wc_svi' ),
),
    array(
    'id'    => 'lens_lensFadeInms',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Lens FadeIn ms', 'wc_svi' ),
    'desc'  => __( 'Set as a number e.g 200 for speed of Lens fadeIn', 'wc_svi' ),
),
    array(
    'id'    => 'lens_zoomWindowFadeIn',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Window Fade In Effect', 'wc_svi' ),
),
    array(
    'id'    => 'lens_zoomWindowFadeInms',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Window FadeIn ms', 'wc_svi' ),
    'desc'  => __( 'Set as a number e.g 200 for speed of Window fadeIn', 'wc_svi' ),
),
    array(
    'id'    => 'lens_size',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Lens Size', 'wc_svi' ),
    'desc'  => __( 'Lens size to be displayed, min:100 | max: 300.', 'wc_svi' ),
),
    array(
    'id'    => 'lens_easing',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Lens Easing', 'wc_svi' ),
    'desc'  => __( 'Allows smooth scrool of image to Zoom Type Window & Inner', 'wc_svi' ),
),
    array(
    'id'    => 'lens_border',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Magnifier Border Color', 'wc_svi' ),
    'desc'  => __( 'Pick a border color for the lens.', 'wc_svi' ),
),
    array(
    'id'    => 'lens_lensBorder',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Lens Border Width', 'wc_svi' ),
    'desc'  => __( 'Width in pixels of the lens border. min: 1 | max: 15. Acoording to Zoom Type selected.', 'wc_svi' ),
),
    array(
    'id'    => 'lens_scrollzoom',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Zoom Effect', 'wc_svi' ),
    'desc'  => __( 'Allows Zoom with mouse scroll.', 'wc_svi' ),
),
    array(
    'id'    => 'lens_zIndex',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Custom zIndex for Magnifier, for better adjustment on themes.', 'wc_svi' ),
)
),
) );
/** THUMBNAILS SECTION */
Redux::setSection( $opt_name, array(
    'title'  => __( 'Thumbails', 'wc_svi' ),
    'id'     => 'thumbnails-section',
    'fields' => array(
    array(
    'id'    => 'svi_infothumbs',
    'type'  => 'info',
    'style' => 'success',
    'icon'  => 'el-icon-info-sign',
    'title' => __( 'Upgrade to PRO', 'wc_svi' ),
    'desc'  => __( 'Unlock all these features <a href="/wp-admin/admin.php?page=woocommerce_svi-pricing" target="_blank">here</a>.', 'wc_svi' ),
),
    array(
    'id'      => 'disable_thumb',
    'type'    => 'info',
    'style'   => 'warning',
    'title'   => __( 'Disable Thumbnails', 'wc_svi' ),
    'desc'    => __( 'Disable thumbnails on product page', 'wc_svi' ),
    'on'      => __( 'Yes', 'wc_svi' ),
    'off'     => __( 'No', 'wc_svi' ),
    'default' => false,
),
    array(
    'title'    => __( 'Thumbnail Position', 'wc_svi' ),
    'subtitle' => __( 'Select thumnails position. Bottom, Left or right.', 'wc_svi' ),
    'desc'     => __( 'Bottom, Left and Right positions, for thumbnails.', 'wc_svi' ),
    'id'       => 'slider_position',
    'type'     => 'info',
    'style'    => 'warning',
),
    array(
    'id'                => 'columns',
    'type'              => 'text',
    'required'          => array( array( 'disable_thumb', '!=', '1' ) ),
    'title'             => __( 'Thumbnail Items', 'wc_svi' ),
    'desc'              => __( 'Number of thumbnails to be displayed by row, min:1 | max: 10.', 'wc_svi' ),
    'default'           => '4',
    'validate_callback' => 'svipro_numbervalid_thumbnails',
),
    array(
    'id'       => 'hide_thumbs',
    'type'     => 'switch',
    'required' => array( array( 'disable_thumb', '!=', '1' ) ),
    'title'    => __( 'Hidden Thumbnails', 'wc_svi' ),
    'desc'     => __( 'Thumbnails will be hidden until a variation as been selected.', 'wc_svi' ),
    'default'  => false,
),
    array(
    'id'      => 'swselect',
    'type'    => 'info',
    'style'   => 'warning',
    'title'   => __( 'Select Swap', 'wc_svi' ),
    'desc'    => __( 'All selects will trigger the thumbnail swaps. Don\'t have to wait for select combination.', 'wc_svi' ),
    'default' => false,
),
    array(
    'id'      => 'variation_swap',
    'type'    => 'info',
    'style'   => 'warning',
    'title'   => __( 'Thumbnail Click Swap', 'wc_svi' ),
    'desc'    => __( 'Swap select box(es) to match variation on thumbnail click.<br><b>NOTE:</b> To make <u>images swap</u> it requires Select Swap active if more than 1 select option (dropdowns/swacthes) exists, otherwise will only populate the options.', 'wc_svi' ),
    'default' => false,
),
    array(
    'id'      => 'keep_thumbnails',
    'type'    => 'info',
    'style'   => 'warning',
    'title'   => __( 'Keep Thumbnails visible', 'wc_svi' ),
    'desc'    => __( 'This option will keep thumbnails visible all the time. No changes will be made to the images.', 'wc_svi' ),
    'default' => false,
),
    array(
    'id'      => 'keep_thumbnails_option',
    'type'    => 'info',
    'style'   => 'warning',
    'title'   => __( 'Display', 'wc_svi' ),
    'default' => 'svidefault',
    'desc'    => __( '<b><Note:/b> If choosen "SVI Default Gallery" and on the product the gallery doesnt exist it will fallback to "WooCommerce Product Gallery".', 'wc_svi' ),
    'options' => array(
    'svidefault' => __( 'SVI Default Gallery', 'wc_svi' ),
    'product'    => __( 'WooCommerce Product Gallery', 'wc_svi' ),
),
),
    array(
    'id'      => 'thumbnails_showactive',
    'type'    => 'info',
    'style'   => 'warning',
    'title'   => __( 'Thumbnail Opacity', 'wc_svi' ),
    'desc'    => __( 'If active, current tumbnail will be faded.', 'wc_svi' ),
    'default' => false,
)
),
) );
/** LAYOUT FIXES */
Redux::setSection( $opt_name, array(
    'title'  => __( 'Layout Fixes', 'wc_svi' ),
    'id'     => 'fixes-subsection',
    'fields' => array( array(
    'id'    => 'svi_infofixes',
    'type'  => 'info',
    'style' => 'success',
    'icon'  => 'el-icon-info-sign',
    'title' => __( 'Upgrade to PRO', 'wc_svi' ),
    'desc'  => __( 'Unlock all these features <a href="/wp-admin/admin.php?page=woocommerce_svi-pricing" target="_blank">here</a>.', 'wc_svi' ),
), array(
    'id'    => 'custom_class',
    'type'  => 'info',
    'style' => 'warning',
    'title' => __( 'Custom Class', 'wc_svi' ),
    'desc'  => __( 'Insert custom css class(es) to fit your theme needs.', 'wc_svi' ),
), array(
    'id'      => 'sviforce_image',
    'type'    => 'info',
    'style'   => 'warning',
    'title'   => __( 'Remove Image class', 'wc_svi' ),
    'desc'    => __( 'Some theme force styling on image class that may break the layout.', 'wc_svi' ),
    'default' => false,
) ),
) );
Redux::setSection( $opt_name, array(
    'title'  => __( 'Support', 'wc_svi' ),
    'id'     => 'info-svi',
    'fields' => array( array(
    'id'   => 'info_support_svi',
    'type' => 'info',
    'desc' => 'All support for my plugins are provided as a free service at <a href="https://www.smart-variations.com/" target="_blank">www.smart-variations.com</a>.<br>
Purchasing an addon from this site does not gain you priority over response times on the support system.<br>
<br>
<b>Please note that WordPress has a big history of conflicts between plugins.</b><br>
<br>
The support works, <b>Lisbon, Portugal time zone</b> form <b>9am to 6pm</b>.<br>
I\'m not here full-time so please be patient, I will try my best to help you out as much as I can.<br>
<h2>Steps:</h2>
<ul>
<li>- Go to <a href="https://www.smart-variations.com/" target="_blank">www.rosendo.pt</a> and login</li>
<li>- On the right sidebar you will see an option saying <b><a href="https://www.smart-variations.com/" target="_blank">Submit Ticket</a></b></li>
<li>- Please supply me with information such <b>credentials</b> to your <b>wp-admin</b> and optionally <b>direct FTP access to my plugin</b>.</li>
</ul>
<br>
<a href="https://www.smart-variations.com//terms-conditions/">Terms & Conditions</a>
<br>
<h2>Setup instructions</h2>
Please visit the free version of this plugin for instructions (view screenshoots), click <a href="https://wordpress.org/plugins/smart-variations-images/screenshots/">here</a>.
',
) ),
) );
/*
 * <--- END SECTIONS
 */
if ( !function_exists( 'svipro_numbervalid_lensBorder' ) ) {
    function svipro_numbervalid_lensBorder( $field, $value, $existing_value )
    {
        $return['value'] = $existing_value;
        
        if ( is_numeric( $value ) ) {
            if ( $value !== $existing_value || intval( $value ) > 15 ) {
                
                if ( intval( $value ) < 1 || intval( $value ) > 15 ) {
                    $return['value'] = 1;
                    $field['msg'] = 'Min: 1 | max: 15';
                    $return['error'] = $field;
                } else {
                    $return['value'] = $value;
                }
            
            }
        } else {
            $return['value'] = 1;
            $field['msg'] = 'Please insert a number between Min: 1 | max: 15';
            $return['error'] = $field;
        }
        
        return $return;
    }

}
if ( !function_exists( 'svipro_numbervalid_thumbnails' ) ) {
    function svipro_numbervalid_thumbnails( $field, $value, $existing_value )
    {
        $return['value'] = $existing_value;
        
        if ( is_numeric( $value ) ) {
            if ( $value !== $existing_value || intval( $value ) > 10 ) {
                
                if ( intval( $value ) < 1 || intval( $value ) > 10 ) {
                    $return['value'] = 4;
                    $field['msg'] = 'Minimum 1 thumbnail per row, Max 10 Thumbnails per row.';
                    $return['error'] = $field;
                } else {
                    $return['value'] = $value;
                }
            
            }
        } else {
            $return['value'] = 4;
            $field['msg'] = 'Please insert a number between 1 and 10.';
            $return['error'] = $field;
        }
        
        return $return;
    }

}
if ( !function_exists( 'svipro_numbervalid_lensize' ) ) {
    function svipro_numbervalid_lensize( $field, $value, $existing_value )
    {
        $return['value'] = $existing_value;
        
        if ( is_numeric( $value ) ) {
            if ( $value !== $existing_value || intval( $value ) > 300 ) {
                
                if ( intval( $value ) < 100 || intval( $value ) > 300 ) {
                    $return['value'] = 150;
                    $field['msg'] = 'Min:100 | max: 300';
                    $return['error'] = $field;
                } else {
                    $return['value'] = $value;
                }
            
            }
        } else {
            $return['value'] = 150;
            $field['msg'] = 'Please insert a number between Min:100 | max: 300';
            $return['error'] = $field;
        }
        
        return $return;
    }

}