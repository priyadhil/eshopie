<?php

/**
 * TGM Init Class
 */
include_once 'class-tgm-plugin-activation.php';

function woosvi_options_register_required_plugins()
{

    $plugins = array(
        array(
            'name' => 'Redux Framework',
            'slug' => 'redux-framework',
            'required' => true,
        ),
    );

    $theme_text_domain = "svi";

    $config = array(
        'domain' => 'redux-framework', // Text domain - likely want to be the same as your theme.
        'default_path' => '', // Default absolute path to pre-packaged plugins
        //'parent_menu_slug'     => 'plugins.php',                 // Default parent menu slug
        //'parent_url_slug'     => 'plugins.php',                 // Default parent URL slug
        'parent_slug' => 'plugins.php',
        'capability' => 'manage_options',
        'menu' => 'install-required-plugins', // Menu slug
        'has_notices' => true, // Show admin notices or not
        'is_automatic' => true, // Automatically activate plugins after installation or not
        'message' => __('Smart Variations Images requires Redux Framework to function. Click install below to begin the process.', $theme_text_domain),
        'strings' => array(
            'page_title' => __('Install Redux Framework', $theme_text_domain),
            'menu_title' => __('Install Plugins', $theme_text_domain),
            'installing' => __('Installing %s', $theme_text_domain),
            // %1$s = plugin name
            'oops' => __('Something went wrong with the plugin API.', $theme_text_domain),
            'notice_can_install_required' => _n_noop('%1$s is required to use Smart Variations Images.', '%1$s  is required to use Smart Variations Images.'),
            // %1$s = plugin name(s)
            'notice_cannot_install' => _n_noop('Sorry, but you do not have the correct permissions to install %s. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.'),
            // %1$s = plugin name(s)
            'notice_can_activate_required' => _n_noop('Smart Varitions Images requires the following inactive plugin to be active: %1$s.', 'The following required plugins are currently inactive: %1$s.'),
            // %1$s = plugin name(s)
            'notice_can_activate_recommended' => _n_noop('The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.'),
            // %1$s = plugin name(s)
            'notice_cannot_activate' => _n_noop('Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.'),
            // %1$s = plugin name(s)
            'notice_ask_to_update' => _n_noop('The following plugin needs to be updated to its latest version to ensure maximum compatibility with this plugin: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this plugin: %1$s.'),
            // %1$s = plugin name(s)
            'notice_cannot_update' => _n_noop('Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.'),
            // %1$s = plugin name(s)
            'install_link' => _n_noop('Begin installing plugin', 'Begin installing plugins'),
            'activate_link' => _n_noop('Activate installed plugin', 'Activate installed plugins'),
            'return' => __('Return to the Redux Framework Installer', $theme_text_domain),
            'plugin_activated' => __('Redux Framework activated successfully.', $theme_text_domain),
            'complete' => __('Redux Framework was installed and activated successfully. %s', $theme_text_domain),
            // %1$s = dashboard link
            'nag_type' => 'updated',
            // Determines admin notice type - can only be 'updated' or 'error'
        ),
    );

    tgmpa($plugins, $config);

}
add_action('tgmpa_register', 'woosvi_options_register_required_plugins');
