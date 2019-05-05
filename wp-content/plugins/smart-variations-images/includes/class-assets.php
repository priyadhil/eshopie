<?php

namespace SVIApp;

/**
 * Scripts and Styles Class
 */
class Assets
{
    public function __construct()
    {
        
        if ( is_admin() ) {
            add_action( 'admin_enqueue_scripts', [ $this, 'register' ], 5 );
        } else {
            add_action( 'wp_enqueue_scripts', [ $this, 'register' ], 5 );
        }
    
    }
    
    /**
     * Register our app scripts and styles
     *
     * @return void
     */
    public function register()
    {
        $this->register_scripts( $this->get_scripts() );
        $this->register_styles( $this->get_styles() );
    }
    
    /**
     * Register scripts
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts( $scripts )
    {
        foreach ( $scripts as $handle => $script ) {
            $deps = ( isset( $script['deps'] ) ? $script['deps'] : false );
            $in_footer = ( isset( $script['in_footer'] ) ? $script['in_footer'] : false );
            $version = ( isset( $script['version'] ) ? $script['version'] : SVI_VERSION );
            wp_register_script(
                $handle,
                $script['src'],
                $deps,
                $version,
                $in_footer
            );
        }
    }
    
    /**
     * Register styles
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles( $styles )
    {
        foreach ( $styles as $handle => $style ) {
            $deps = ( isset( $style['deps'] ) ? $style['deps'] : false );
            wp_register_style(
                $handle,
                $style['src'],
                $deps,
                SVI_VERSION
            );
        }
    }
    
    /**
     * Get all registered scripts
     *
     * @return array
     */
    public function get_scripts()
    {
        global  $woocommerce ;
        $prefix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min' );
        $admin = 'admin';
        $scripts = [
            'svi-photoswipe'            => array(
            'src'     => '//cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/photoswipe.min.js',
            'deps'    => array(),
            'version' => '4.1.3',
        ),
            'svi-photoswipe-ui-default' => array(
            'src'     => '//cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/photoswipe-ui-default.min.js',
            'deps'    => array( 'svi-photoswipe' ),
            'version' => '4.1.3',
        ),
            'svi-ez-plus'               => [
            'src'       => SVI_ASSETS . '/js/jquery.ez-plus' . $prefix . '.js',
            'version'   => filemtime( SVI_PATH . '/assets/js/jquery.ez-plus' . $prefix . '.js' ),
            'in_footer' => true,
        ],
            'svi-vendor'                => [
            'src'       => SVI_ASSETS . '/js/vendor' . $prefix . '.js',
            'version'   => filemtime( SVI_PATH . '/assets/js/vendor' . $prefix . '.js' ),
            'in_footer' => true,
        ],
            'svi-frontend'              => [
            'src'       => SVI_ASSETS . '/js/frontend' . $prefix . '.js',
            'deps'      => [ 'jquery', 'svi-vendor' ],
            'version'   => filemtime( SVI_PATH . '/assets/js/frontend' . $prefix . '.js' ),
            'in_footer' => true,
        ],
            'svi-admin'                 => [
            'src'       => SVI_ASSETS . '/js/' . $admin . '.js',
            'deps'      => [ 'jquery' ],
            'version'   => filemtime( SVI_PATH . '/assets/js/' . $admin . '.js' ),
            'in_footer' => true,
        ],
        ];
        return $scripts;
    }
    
    /**
     * Get registered styles
     *
     * @return array
     */
    public function get_styles()
    {
        $styles = [
            'svi-photoswipe'              => [
            'src'  => '//cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/photoswipe.min.css',
            'deps' => array(),
        ],
            'svi-photoswipe-default-skin' => [
            'src'  => '//cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/default-skin/default-skin.min.css',
            'deps' => array( 'svi-photoswipe' ),
        ],
            'svi-style'                   => [
            'src' => SVI_ASSETS . '/css/style.css',
        ],
            'svi-frontend'                => [
            'src' => SVI_ASSETS . '/css/frontend.css',
        ],
            'svi-admin'                   => [
            'src' => SVI_ASSETS . '/css/admin.css',
        ],
        ];
        return $styles;
    }

}