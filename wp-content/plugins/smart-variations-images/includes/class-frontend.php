<?php

namespace SVIApp;

/**
 * Frontend Pages Handler
 */
class Frontend
{
    public function __construct()
    {
        $this->options = $this->parseOptions( get_option( 'woosvi_options', [] ) );
        $this->activated = ( array_key_exists( 'default', $this->options ) ? $this->options['default'] : false );
        if ( !$this->activated ) {
            //Check if SVI is enabled
            return;
        }
        $this->suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' );
        $this->theme = wp_get_theme();
        
        if ( !is_admin() ) {
            add_action( 'woocommerce_before_single_product', [ $this, 'remove_hooks' ], 20 );
            add_action(
                'wp_enqueue_scripts',
                array( $this, 'load_scripts' ),
                20,
                1
            );
            add_action( 'woocommerce_before_single_product_summary', [ $this, 'render_frontend' ], 20 );
            add_filter(
                'wc_get_template',
                [ $this, 'filter_wc_get_template' ],
                1,
                5
            );
        }
    
    }
    
    public function filter_wc_get_template(
        $located,
        $template_name,
        $args,
        $template_path,
        $default_path
    )
    {
        // make filter magic happen here...
        global  $post ;
        $run = get_post_meta( $post->ID, '_checkbox_svipro_enabled', true );
        
        if ( $template_name == 'single-product/product-image.php' && $run != 'yes' ) {
            return $this->render_frontend();
        } else {
            return $located;
        }
    
    }
    
    public function parseOptions( $args )
    {
        $defaults = array(
            'main_imagesize'      => 'shop_single',
            'thumb_imagesize'     => 'shop_thumbnail',
            'lens'                => false,
            'containlenszoom'     => true,
            'lens_zoomtype'       => 'lens',
            'lens_mobiledisabled' => false,
            'lens_zIndex'         => 999,
            'lightbox'            => false,
            'lightbox_enabled'    => 'main',
            'lightbox_icon'       => false,
            'lightbox_close'      => false,
            'lightbox_fullScreen' => false,
            'lightbox_zoom'       => false,
            'lightbox_share'      => false,
            'lightbox_counter'    => false,
            'lightbox_controls'   => true,
            'columns'             => 4,
            'hide_thumbs'         => false,
        );
        return wp_parse_args( $args, $defaults );
    }
    
    public function parseGlobalData( $pid = false )
    {
        global  $post ;
        $detect = new Mobile_Detect();
        if ( $detect->isMobile() ) {
            $this->options['lens'] = false;
        }
        return array(
            'version'              => SVI_VERSION,
            'rtl'                  => is_rtl(),
            'template'             => $this->theme->template,
            'flatsome'             => ( $this->theme->template == 'flatsome' ? 'has-hover' : false ),
            'lens'                 => ( $this->options['lens'] ? true : false ),
            'lens_containlenszoom' => true,
            'lens_mobiledisabled'  => $this->options['lens_mobiledisabled'],
            'lightbox'             => ( $this->options['lightbox'] ? true : false ),
            'lightbox_enabled'     => 'main',
            'lightbox_icon'        => ( $this->options['lightbox_icon'] ? true : false ),
            'lightbox_share'       => ( $this->options['lightbox_share'] ? true : false ),
            'lightbox_close'       => ( $this->options['lightbox_close'] ? true : false ),
            'lightbox_controls'    => ( $this->options['lightbox_controls'] ? true : false ),
            'lightbox_zoom'        => ( $this->options['lightbox_zoom'] ? true : false ),
            'lightbox_counter'     => ( $this->options['lightbox_counter'] ? true : false ),
            'lightbox_fullScreen'  => ( $this->options['lightbox_fullScreen'] ? true : false ),
            'columns'              => $this->options['columns'],
            'hidden_thumb'         => ( $this->options['hide_thumbs'] ? true : false ),
        );
    }
    
    public function parseData( $pid = false )
    {
        global  $post ;
        
        if ( $pid ) {
            $product = wc_get_product( $pid );
        } else {
            $pid = $post->ID;
            $product = wc_get_product( $post->ID );
        }
        
        if ( !$product ) {
            return array();
        }
        return array(
            'type'       => ( !$product->is_type( 'variable' ) ? true : false ),
            'images'     => (object) apply_filters( 'svi_gallery_images', $this->getImages( $product, $pid ) ),
            'woosvislug' => $this->prepInformation( $product ),
        );
    }
    
    public function load_scripts()
    {
        $wp_scripts = wp_scripts();
        //echo "<pre>".print_r($wp_scripts->registered,true)."</pre>";
        if ( !current_theme_supports( 'wc-product-gallery-lightbox' ) ) {
            
            if ( $this->options['lightbox'] ) {
                $handle = 'photoswipe' . $this->suffix . '.js';
                $list = 'enqueued';
                
                if ( !wp_script_is( $handle, $list ) ) {
                    wp_enqueue_script( 'svi-photoswipe' );
                    wp_enqueue_script( 'svi-photoswipe-ui-default' );
                    wp_enqueue_style( 'svi-photoswipe' );
                    wp_enqueue_style( 'svi-photoswipe-default-skin' );
                }
            
            }
        
        }
        $data = $this->parseGlobalData();
        //ENQUEUE STYLES
        wp_enqueue_style( 'dashicons' );
        wp_enqueue_style( 'svi-frontend' );
        //ENQUEUE SCRIPTS
        if ( $this->options['lens'] ) {
            wp_enqueue_script( 'svi-ez-plus' );
        }
        wp_enqueue_script( 'svi-frontend' );
        //wp_localize_script('svi-frontend', 'wcsviajax', array('call' => WC()->ajax_url()));
        wp_localize_script( 'svi-frontend', 'wcsvi', (object) array(
            'data' => $data,
        ) );
    }
    
    /**
     * Render frontend app
     *
     *
     * @return string
     */
    public function render_frontend()
    {
        global  $post ;
        if ( !isset( $post->ID ) ) {
            return;
        }
        $run = get_post_meta( $post->ID, '_checkbox_svipro_enabled', true );
        if ( $run == 'yes' ) {
            return;
        }
        $data = $this->parseGlobalData();
        $columns = $this->options['columns'];
        $attr = array(
            'svi-woocommerce-product-gallery',
            'woocommerce-product-gallery--' . (( has_post_thumbnail() ? 'with-images' : 'without-images' )),
            'woocommerce-product-gallery--columns-' . absint( $columns ),
            'images'
        );
        $wrapper_classes = apply_filters( 'svi_single_product_image_gallery_classes', $attr );
        ?>
            <?php 
        
        if ( $this->theme->template == 'flatsome' ) {
            ?>
              <?php 
            do_action( 'flatsome_sale_flash' );
            ?>

                <div class="image-tools absolute top show-on-hover right z-3">
                    <?php 
            do_action( 'flatsome_product_image_tools_top' );
            ?>
                </div>
            <?php 
        }
        
        ?>

            <div class="whitespacesvi">&nbsp;</div>
            <div data-svi="<?php 
        echo  htmlspecialchars( json_encode( $this->parseData( $post->ID ) ), ENT_QUOTES, 'UTF-8' ) ;
        ?>" class="<?php 
        echo  esc_attr( implode( ' ', array_map( 'sanitize_html_class', $wrapper_classes ) ) ) ;
        ?>">

            <div class="svi-vue-frontend-app">
                    <div class="sivmainloader">
                        <div class="signal"></div>
                    </div>
                    <?php 
        ?>

                </div>
            </div>
        <?php 
    }
    
    /**
     * Render frontend sub thumbs
     *
     * @since 1.1.1
     * @return instance object
     */
    public function show_thumb_images()
    {
        $data = $this->parseGlobalData();
    }
    
    /**
     * Runs the fallback
     *
     *
     * @since 1.0.0
     * @return HTML
     */
    public function fallback( $pid )
    {
        $return = '';
        
        if ( metadata_exists( 'post', $pid, '_product_image_gallery' ) ) {
            $product_image_gallery = explode( ',', get_post_meta( $pid, '_product_image_gallery', true ) );
        } else {
            // Backwards compat
            $attachment_ids = get_posts( 'post_parent=' . $pid . '&numberposts=-1&post_type=attachment&orderby=menu_order&order=ASC&post_mime_type=image&fields=ids&meta_key=_woocommerce_exclude_image&meta_value=0' );
            $attachment_ids = array_diff( $attachment_ids, array( get_post_thumbnail_id() ) );
            if ( $attachment_ids ) {
                $product_image_gallery = explode( ',', $attachment_ids );
            }
        }
        
        if ( count( $product_image_gallery ) < 1 ) {
            return;
        }
        $product_image_gallery = array_filter( $product_image_gallery );
        $order = array();
        foreach ( $product_image_gallery as $key => $value ) {
            $woosvi_slug = get_post_meta( $value, 'woosvi_slug_' . $pid, true );
            
            if ( is_array( $woosvi_slug ) ) {
                $data = array();
                foreach ( $woosvi_slug as $k => $v ) {
                    
                    if ( count( $v ) > 1 ) {
                        $data[] = implode( '_svipro_', $v );
                    } else {
                        $data[] = $v;
                    }
                
                }
                $woosvi_slug = $data;
            }
            
            if ( !$woosvi_slug ) {
                $woosvi_slug = get_post_meta( $value, 'woosvi_slug', true );
            }
            if ( !$woosvi_slug ) {
                $woosvi_slug = 'nullsvi';
            }
            
            if ( is_array( $woosvi_slug ) ) {
                foreach ( $woosvi_slug as $k => $v ) {
                    
                    if ( is_array( $v ) ) {
                        $order[$v[0]][] = $value;
                    } else {
                        $order[$v][] = $value;
                    }
                
                }
            } else {
                $order[$woosvi_slug][] = $value;
            }
        
        }
        unset( $order['nullsvi'] );
        $ordered = array();
        foreach ( $order as $k => $v ) {
            $arr = array(
                'slugs' => explode( '_svipro_', $k ),
                'imgs'  => $v,
            );
            array_push( $ordered, $arr );
        }
        update_post_meta( $pid, 'woosvi_slug', $ordered );
    }
    
    public function prepInformation( $product, $idonly = false, $check_pid = null )
    {
        global  $post ;
        $wpml_slugs = false;
        $post_id = $post->ID;
        if ( $check_pid ) {
            $post_id = $check_pid;
        }
        $pid = $this->wpml_original( $post_id );
        if ( class_exists( 'SitePress' ) ) {
            $wpml_slugs = $this->wpml( $post_id, $product, $pid );
        }
        $return = array();
        $woosvi_slug = get_post_meta( $pid, 'woosvi_slug', true );
        
        if ( empty($woosvi_slug) ) {
            $this->fallback( $pid );
            $woosvi_slug = get_post_meta( $pid, 'woosvi_slug', true );
        }
        
        foreach ( $woosvi_slug as $k => $v ) {
            if ( $wpml_slugs ) {
                $v['slugs'] = $this->wpml_translate_slug( $wpml_slugs, $v['slugs'] );
            }
            $v['slugs'] = array_map( 'trim', $v['slugs'] );
            $return[strtolower( implode( '_svipro_', $v['slugs'] ) )] = array();
            
            if ( $idonly ) {
                $return[strtolower( implode( '_svipro_', $v['slugs'] ) )] = $v['imgs'];
            } else {
                foreach ( $v['imgs'] as $id ) {
                    $return[strtolower( implode( '_svipro_', $v['slugs'] ) )]['x' . $id] = array();
                }
            }
        
        }
        
        if ( array_key_exists( 'svidefault', $return ) ) {
            $default_product = get_post_thumbnail_id( $pid );
            $return['svidefault'] = array(
                'x' . $default_product => array(),
            ) + $return['svidefault'];
        }
        
        return $return;
    }
    
    public function getImages( $product, $o_pid )
    {
        $pid = $this->wpml_original( $o_pid );
        if ( $pid != $o_pid ) {
            $product = wc_get_product( $pid );
        }
        $default_img = get_post_thumbnail_id( $pid );
        $attachment_ids = array( $default_img );
        // $attachment_ids = array_merge($attachment_ids, $product->get_gallery_image_ids());
        $attachment_ids = array_merge( $attachment_ids, explode( ',', get_post_meta( $pid, '_product_image_gallery', true ) ) );
        $attachment_ids = array_unique( $attachment_ids );
        $attachment_ids = array_values( array_filter( $attachment_ids ) );
        $images = array();
        
        if ( $attachment_ids ) {
            $x = 0;
            foreach ( $attachment_ids as $attachment_id ) {
                $img_arr = array(
                    'id'          => intval( $attachment_id ),
                    'product_img' => ( $default_img == $attachment_id ? true : false ),
                    'single'      => $this->getMainImage( $attachment_id, $this->options['main_imagesize'] ),
                    'thumb'       => $this->getMainImage( $attachment_id, $this->options['thumb_imagesize'] ),
                    'key'         => $x,
                );
                array_push( $images, $img_arr );
                $x++;
            }
        }
        
        return $images;
    }
    
    public function getMainImage( $attachment_id = false, $main_image = false )
    {
        global  $post ;
        if ( !$attachment_id ) {
            $attachment_id = get_post_thumbnail_id( $post->ID );
        }
        $gallery_thumbnail = wc_get_image_size( $this->options['thumb_imagesize'] );
        $full_size = apply_filters( 'woocommerce_gallery_full_size', apply_filters( 'woocommerce_product_thumbnails_large_size', 'full' ) );
        $thumbnail_size = apply_filters( 'woocommerce_gallery_thumbnail_size', array( $gallery_thumbnail['width'], $gallery_thumbnail['height'] ) );
        $image_size = apply_filters( 'woocommerce_gallery_image_size', ( $this->options['main_imagesize'] ? $this->options['main_imagesize'] : $full_size ) );
        $thumbnail_src = wp_get_attachment_image_src( $attachment_id, $this->options['thumb_imagesize'] );
        $large_image = wp_get_attachment_image_src( $attachment_id, $image_size );
        $image_src = wp_get_attachment_image_src( $attachment_id, ( $main_image ? $main_image : $full_size ) );
        $image_full = wp_get_attachment_image_src( $attachment_id, $full_size );
        $img = $this->imgtagger( wp_get_attachment_image(
            $attachment_id,
            $image_size,
            false,
            array(
            'title'                   => get_the_title( $attachment_id ),
            'data-caption'            => wp_get_attachment_caption( $attachment_id ),
            'data-src'                => $image_src[0],
            'data-large_image'        => $large_image[0],
            'data-large_image_width'  => $large_image[1],
            'data-large_image_height' => $large_image[2],
            'data-thumb_image'        => $thumbnail_src[0],
            'data-thumb_image_width'  => $thumbnail_src[1],
            'data-thumb_image_height' => $thumbnail_src[2],
            'class'                   => ( $main_image ? 'wp-post-image' : '' ),
        )
        ) );
        $full_img_sizes = array(
            'full_image'        => $image_full[0],
            'full_image_width'  => $image_full[1],
            'full_image_height' => $image_full[2],
        );
        $img = array_merge( $img, $full_img_sizes );
        return $img;
    }
    
    /**
     * Break images tags to array to be used
     *
     * @since 1.0.0
     * @return array
     */
    public function imgtagger( $fullimg_tag )
    {
        preg_match_all( '/(alt|title|src|caption|woosvislug|svizoom-image|srcset|sizes|width|height|class|thumb_image|thumb_image_width|thumb_image_height|large_image|large_image_width|large_image_height)=("[^"]*")/i', $fullimg_tag, $fullimg_split );
        foreach ( $fullimg_split[2] as $key => $value ) {
            
            if ( $value == '""' ) {
                $fullimg_split[2][$key] = "";
            } else {
                $fullimg_split[2][$key] = str_replace( '"', "", $value );
            }
        
        }
        return array_combine( $fullimg_split[1], $fullimg_split[2] );
    }
    
    /**
     * Get translated Slugs
     *
     * @since 1.0.0
     * @return array
     */
    public function wpml( $pid, $product, $original )
    {
        global  $sitepress ;
        if ( !$product->is_type( 'variable' ) ) {
            return false;
        }
        $slugs = array();
        $attributes = get_post_meta( $pid, '_product_attributes' );
        if ( !empty($attributes) ) {
            foreach ( $attributes[0] as $att => $attribute ) {
                
                if ( $attribute['is_taxonomy'] && $attribute['is_variation'] ) {
                    $terms = wp_get_post_terms( $pid, esc_attr( $att ), 'all' );
                    foreach ( $terms as $tr => $term ) {
                        remove_filter(
                            'get_term',
                            array( $sitepress, 'get_term_adjust_id' ),
                            1,
                            1
                        );
                        $gtb = get_term( icl_object_id(
                            $term->term_id,
                            esc_attr( $att ),
                            true,
                            $sitepress->get_default_language()
                        ) );
                        $slugs[strtolower( esc_attr( $gtb->slug ) )] = esc_attr( $term->slug );
                        add_filter(
                            'get_term',
                            array( $sitepress, 'get_term_adjust_id' ),
                            1,
                            1
                        );
                    }
                }
            
            }
        }
        $attributes_original = get_post_meta( $original, '_product_attributes' );
        if ( !empty($attributes_original) ) {
            foreach ( $attributes_original[0] as $att => $attribute ) {
                if ( !$attribute['is_taxonomy'] && $attribute['is_variation'] ) {
                    
                    if ( array_key_exists( $att, $attributes[0] ) ) {
                        $values = str_replace( " ", "", $attributes[0][$att]['value'] );
                        
                        if ( !empty($values) ) {
                            $terms = explode( '|', $values );
                            $values_original = str_replace( " ", "", $attribute['value'] );
                            $terms_original = explode( '|', $values_original );
                            foreach ( $terms_original as $tr => $term ) {
                                $slugs[strtolower( esc_attr( $term ) )] = esc_attr( strtolower( $terms[$tr] ) );
                            }
                        }
                    
                    }
                
                }
            }
        }
        return $slugs;
    }
    
    public function wpml_original( $id )
    {
        global  $wpdb ;
        
        if ( class_exists( 'SitePress' ) ) {
            $orig_lang_id = $wpdb->get_var( "SELECT trans2.element_id FROM {$wpdb->prefix}icl_translations AS trans1 INNER JOIN {$wpdb->prefix}icl_translations AS trans2 ON trans2.trid = trans1.trid WHERE trans1.element_id = " . $id . " AND trans2.source_language_code IS NULL" );
            
            if ( is_null( $orig_lang_id ) ) {
                return $id;
            } else {
                return $orig_lang_id;
            }
        
        } else {
            return $id;
        }
    
    }
    
    public function wpml_translate_slug( $wpml_slugs, $slugs )
    {
        $return = array();
        foreach ( $slugs as $slug ) {
            $return[] = ( array_key_exists( $slug, $wpml_slugs ) ? $wpml_slugs[$slug] : $slug );
        }
        return $return;
    }
    
    /**
     * Remove hooks for plugin to work properly
     *
     * @since 1.1.1
     * @return instance object
     */
    public function remove_hooks()
    {
        global  $post ;
        $run = get_post_meta( $post->ID, '_checkbox_svipro_enabled', true );
        if ( $run == 'yes' ) {
            return;
        }
        //if ($this->runsvi) {
        remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 10 );
        remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
        // Mr. Tailor
        remove_action( 'woocommerce_before_single_product_summary_product_images', 'woocommerce_show_product_images', 20 );
        remove_action( 'woocommerce_product_summary_thumbnails', 'woocommerce_show_product_thumbnails', 20 );
        //WOWMALL
        //remove_action('woocommerce_before_single_product_summary', 'wowmall_woocommerce_show_product_images', 20);
        //wp_deregister_script('wowmall-wc-single-product-gallery');
        //wp_deregister_script('single-product-lightbox');
        //Electro support
        remove_action( 'woocommerce_before_single_product_summary', 'electro_show_product_images', 20 );
        //AURUM support
        remove_action( 'woocommerce_before_single_product_summary', 'aurum_woocommerce_show_product_images', 25 );
        // Remove images from Bazar theme
        
        if ( class_exists( 'YITH_WCMG' ) ) {
            $this->remove_filters_for_anonymous_class(
                'woocommerce_before_single_product_summary',
                'YITH_WCMG_Frontend',
                'show_product_images',
                20
            );
            $this->remove_filters_for_anonymous_class(
                'woocommerce_product_thumbnails',
                'YITH_WCMG_Frontend',
                'show_product_thumbnails',
                20
            );
        }
        
        //}
    }
    
    /*
     *
     * Helper: Allow to remove method for a hook when it's a class method used
     *
     * @param str $hook_name Name of the wordpress hook
     * @param str $class_name Name of the class where the add_action resides
     * @param str $method_name Name of the method to unhook
     * @param str $priority The priority of which the above method has in the add_action
     *
     */
    public function remove_filters_for_anonymous_class(
        $hook_name = '',
        $class_name = '',
        $method_name = '',
        $priority = 0
    )
    {
        global  $option ;
        if ( !isset( $option[$hook_name][$priority] ) || !is_array( $option[$hook_name][$priority] ) ) {
            return false;
        }
        foreach ( (array) $option[$hook_name][$priority] as $unique_id => $filter_array ) {
            if ( isset( $filter_array['function'] ) && is_array( $filter_array['function'] ) ) {
                if ( is_object( $filter_array['function'][0] ) && get_class( $filter_array['function'][0] ) && get_class( $filter_array['function'][0] ) == $class_name && $filter_array['function'][1] == $method_name ) {
                    unset( $option[$hook_name][$priority][$unique_id] );
                }
            }
        }
        return false;
    }

}