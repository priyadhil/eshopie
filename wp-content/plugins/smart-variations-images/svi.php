<?php

/**
 * Smart Variations Images for WooCommerce
 *
 * By default WooCommerce will only swap the main variation image when you select a product variation, not the gallery images below it.
 *
 * This extension allows visitors to your online store to be able to swap different gallery images when they select a product variation.
 * Adding this feature will let visitors see different images of a product variation all in the same color and style.
 *
 * This extension will allow the use of multiple images per variation, and simplifies it! How?
 * Instead of upload one image per variation, upload all the variation images to the product gallery and for each image choose the corresponding slug of the variation on the dropdown.
 * As quick and simple as that!
 *
 * @link              https://www.rosendo.pt
 * @since             1.0.0
 * @package           svi
 *
 * @wordpress-plugin
 * Plugin Name:       Smart Variations Images for WooCommerce
 * Plugin URI:        https://www.rosendo.pt
 * Description:       This is a WooCommerce extension plugin, that allows the user to add any number of images to the product images gallery and be used as variable product variations images in a very simple and quick way, without having to insert images p/variation.
 * Version:           4.0.24
 * WC requires at least: 3.0
 * WC tested up to: 3.6.1
 * Author:            David Rosendo
 * Author URI:        https://www.rosendo.pt
 * Text Domain:       svi
 * Domain Path:       /languages
 */
// don't call the file directly
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

if ( function_exists( 'svi_fs' ) ) {
    svi_fs()->set_basename( false, __FILE__ );
    return;
}


if ( !function_exists( 'svi_fs' ) ) {
    // Create a helper function for easy SDK access.
    function svi_fs()
    {
        global  $svi_fs ;
        
        if ( !isset( $svi_fs ) ) {
            // Include Freemius SDK.
            require_once dirname( __FILE__ ) . '/freemius/start.php';
            $svi_fs = fs_dynamic_init( array(
                'id'             => '2228',
                'slug'           => 'smart-variations-images',
                'type'           => 'plugin',
                'public_key'     => 'pk_6a5f1fc0c8ab537a0b07683099ada',
                'is_premium'     => false,
                'premium_suffix' => 'SVI PRO',
                'has_addons'     => false,
                'has_paid_plans' => true,
                'trial'          => array(
                'days'               => 7,
                'is_require_payment' => true,
            ),
                'menu'           => array(
                'slug'    => 'woocommerce_svi',
                'contact' => false,
                'parent'  => array(
                'slug' => 'woocommerce',
            ),
            ),
                'is_live'        => true,
            ) );
        }
        
        return $svi_fs;
    }
    
    // Init Freemius.
    svi_fs();
    // Signal that SDK was initiated.
    do_action( 'svi_fs_loaded' );
}

if ( !function_exists( 'svi_fs_custom_icon' ) ) {
    function svi_fs_custom_icon()
    {
        return dirname( __FILE__ ) . '/assets/img/svi.png';
    }

}
svi_fs()->add_filter( 'plugin_icon', 'svi_fs_custom_icon' );
if ( !function_exists( 'svi_fs_suport' ) ) {
    function svi_fs_suport()
    {
        return 'https://www.smart-variations.com';
    }

}
if ( !function_exists( 'svi_fs_is_submenu_visible' ) ) {
    function svi_fs_is_submenu_visible( $is_visible, $submenu_id )
    {
        
        if ( $submenu_id == 'support' ) {
            
            if ( svi_fs()->is_plan( 'svi_expert', true ) ) {
                return false;
            } else {
                return $is_visible;
            }
        
        } else {
            return $is_visible;
        }
    
    }

}
svi_fs()->add_filter(
    'is_submenu_visible',
    'svi_fs_is_submenu_visible',
    10,
    2
);
/**
 * VUE_SVI class
 *
 * @class VUE_SVI The class that holds the entire VUE_SVI plugin
 */
final class VUE_SVI
{
    /**
     * Plugin version
     *
     * @var string
     */
    public  $version = '4.0.24' ;
    /**
     * Holds various class instances
     *
     * @var array
     */
    private  $container = array() ;
    /**
     * Constructor for the VUE_SVI class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     */
    public function __construct()
    {
        $this->define_constants();
        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
        $this->loadRedux();
        $this->init_plugin();
        add_action( 'admin_init', array( $this, 'deactivate_svipro' ) );
    }
    
    /**
     * Initializes the VUE_SVI() class
     *
     * Checks for an existing VUE_SVI() instance
     * and if it doesn't find one, creates it.
     */
    public static function init()
    {
        static  $instance = false ;
        if ( !$instance ) {
            $instance = new VUE_SVI();
        }
        return $instance;
    }
    
    /**
     * Magic getter to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop )
    {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[$prop];
        }
        return $this->{$prop};
    }
    
    /**
     * Magic isset to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset( $prop )
    {
        return isset( $this->{$prop} ) || isset( $this->container[$prop] );
    }
    
    /**
     * Define the constants
     *
     * @return void
     */
    public function define_constants()
    {
        define( 'SVI_VERSION', $this->version );
        define( 'SVI_FILE', __FILE__ );
        define( 'SVI_PATH', dirname( SVI_FILE ) );
        define( 'SVI_INCLUDES', SVI_PATH . '/includes' );
        define( 'SVI_URL', plugins_url( '', SVI_FILE ) );
        define( 'SVI_ASSETS', SVI_URL . '/assets' );
    }
    
    /**
     * Load the plugin after all plugis are loaded
     *
     * @return void
     */
    public function init_plugin()
    {
        $this->includes();
        $this->init_hooks();
    }
    
    /**
     * Loads the ReduxFramework Options Panel
     *
     *
     * @since 1.0.0
     * @return
     */
    public function loadRedux()
    {
        
        if ( !class_exists( 'ReduxFramework' ) && is_admin() ) {
            add_action( 'admin_menu', array( $this, 'svi_menu' ) );
            include_once SVI_INCLUDES . '/admin/admin-init.php';
        } elseif ( $this->is_request( 'admin' ) ) {
            include_once SVI_INCLUDES . '/admin/admin-init.php';
        }
    
    }
    
    /**
     * Add menu items.
     */
    public function svi_menu()
    {
        $name = ( svi_fs()->can_use_premium_code__premium_only() ? 'SVI PRO' : 'SVI' );
        $icon = ' <span class="genericon genericon-warning"></span>';
        add_submenu_page(
            'woocommerce',
            $name . $icon,
            $name . $icon,
            'manage_woocommerce',
            'woocommerce_svi',
            array( $this, 'options_page' )
        );
    }
    
    public function options_page()
    {
        ?>
<div class="wrap">

    <div id="icon-options-general" class="icon32"></div>
    <h1>
        <?php 
        esc_attr_e( 'Smart Variations Images', 'wc_svi' );
        ?>
    </h1>

    <div id="poststuff">

        <div id="post-body" class="metabox-holder columns-1">

            <!-- main content -->
            <div id="post-body-content">

                <div class="meta-box-sortables ui-sortable">

                    <div class="postbox">
                        <!-- Toggle -->

                        <h2 class="hndle"><span>
                                <?php 
        esc_attr_e( 'Ups! One last thing before you can start working with SVI', 'WpAdminStyle' );
        ?></span>
                        </h2>

                        <div class="inside">
                            <p>
                                <h4>SVI Requires the following plugin:</h4>
                                <ul>
                                    <li>
                                        Redux Framework <a href="<?php 
        echo  get_admin_url() ;
        ?>plugins.php?page=install-required-plugins&amp;plugin_status=install">Begin
                                            installing plugin</a>
                                    </li>
                                    <li>
                                        <h3>What is Redux Framework?</h3>
                                        Redux is a simple, truly extensible and fully responsive options framework for
                                        WordPress themes and plugins. Built on the WordPress Settings API, Redux
                                        supports a multitude of field types as well as: custom error handling, custom
                                        fields & validation types, and import/export functionality.<br>
                                        <b>SVI</b> uses this framework to be able to store and manage it's options.
                                    </li>
                                </ul>
                                <h4>You must ensure that your environment meets the following minimum conditions:</h4>
                                <ul class="list">
                                    <li>PHP 5.6.30 or later (current system version: <b>
                                            <?php 
        echo  phpversion() ;
        ?></b>) - Recomended PHP 7+</li>
                                    <li>WordPress 4.0 or later</li>
                                    <li>WooCommerce 3.0 or later</li>
                                </ul>
                                <h3>How to setup SVI:</h3>
                                <ul>
                                <li>1. Create a product and build it's attributes & variations</li>
                                <li>2. Go to "SVI Variations Gallery" tab and setup the galleries according to the variations you want displayed</li>
                                <li>3. Save the product</li>
                                <li>4. Go to WooCommerce > SVI > Global TAB and "Enable SVI" so that is works on the Front-End</li>
                                <li>5. Good luck with sales :)</li>
                                <li>6. What the video if have doubts:</li>
                                </ul>
                                <center><iframe width="560" height="315" src="https://www.youtube.com/embed/QMV8XBeub_o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center>
                            </p>
                        </div>
                        <!-- .inside -->

                    </div>
                    <!-- .postbox -->

                </div>
                <!-- .meta-box-sortables .ui-sortable -->

            </div>
            <!-- post-body-content -->

            <!-- #postbox-container-1 .postbox-container -->

        </div>
        <!-- #post-body .metabox-holder .columns-2 -->

        <br class="clear">
    </div>
    <!-- #poststuff -->

</div> <!-- .wrap -->

<?php 
    }
    
    /**
     * Placeholder for activation function
     *
     * Nothing being called here yet.
     */
    public function activate()
    {
        $installed = get_option( 'svi_installed' );
        if ( !$installed ) {
            update_option( 'svi_installed', time() );
        }
        update_option( 'svi_version', SVI_VERSION );
    }
    
    /**
     * Placeholder for activation function
     *
     * Nothing being called here yet.
     */
    public function deactivate_svipro()
    {
        // Check fro PRO SVI v3 and Deactivate it.
        if ( is_plugin_active( 'smart-variations-images-pro/svipro.php' ) ) {
            deactivate_plugins( 'smart-variations-images-pro/svipro.php' );
        }
    }
    
    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate()
    {
    }
    
    /**
     * Include the required files
     *
     * @return void
     */
    public function includes()
    {
        require_once SVI_INCLUDES . '/class-assets.php';
        
        if ( $this->is_request( 'admin' ) ) {
            require_once SVI_INCLUDES . '/persist-admin-notices-dismissal/persist-admin-notices-dismissal.php';
            require_once SVI_INCLUDES . '/class-mobile.php';
            require_once SVI_INCLUDES . '/class-frontend.php';
            require_once SVI_INCLUDES . '/class-admin.php';
        }
        
        
        if ( $this->is_request( 'frontend' ) ) {
            require_once SVI_INCLUDES . '/class-mobile.php';
            require_once SVI_INCLUDES . '/class-frontend.php';
        }
        
        if ( $this->is_request( 'rest' ) ) {
            require_once SVI_INCLUDES . '/class-rest-api.php';
        }
    }
    
    /**
     * Initialize the hooks
     *
     * @return void
     */
    public function init_hooks()
    {
        add_action( 'init', array( $this, 'init_classes' ) );
        // Localize our plugin
        add_action( 'init', array( $this, 'localization_setup' ) );
    }
    
    /**
     * Instantiate the required classes
     *
     * @return void
     */
    public function init_classes()
    {
        
        if ( $this->is_request( 'admin' ) ) {
            $this->container['frontend'] = new SVIApp\Frontend();
            $this->container['admin'] = new SVIApp\Admin();
        }
        
        
        if ( $this->is_request( 'frontend' ) ) {
            $this->container['mobile'] = new SVIApp\Mobile_Detect();
            $this->container['frontend'] = new SVIApp\Frontend();
        }
        
        if ( $this->is_request( 'rest' ) ) {
            $this->container['rest'] = new SVIApp\REST_API();
        }
        $this->container['assets'] = new SVIApp\Assets();
    }
    
    /**
     * Initialize plugin for localization
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup()
    {
        load_plugin_textdomain( 'svi', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }
    
    /**
     * What type of request is this?
     *
     * @param  string $type admin, ajax, cron or frontend.
     *
     * @return bool
     */
    private function is_request( $type )
    {
        switch ( $type ) {
            case 'admin':
                return is_admin();
            case 'ajax':
                return defined( 'DOING_AJAX' );
            case 'rest':
                return defined( 'REST_REQUEST' );
            case 'cron':
                return defined( 'DOING_CRON' );
            case 'frontend':
                return (!is_admin() || defined( 'DOING_AJAX' )) && !defined( 'DOING_CRON' );
        }
    }

}
// VUE_SVI
/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_svi()
{
    $svi = VUE_SVI::init();
}

add_action( 'plugins_loaded', 'run_svi', 20 );