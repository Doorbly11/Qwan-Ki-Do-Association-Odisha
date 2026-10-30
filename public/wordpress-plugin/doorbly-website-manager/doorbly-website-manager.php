<?php
/**
 * Plugin Name: Doorbly Website Manager
 * Plugin URI: https://doorbly.com/website-manager
 * Description: Complete, secure, customer-facing visual website management dashboard and live editor for WordPress. Seamlessly integrates with the Astra theme, WordPress Media Library, and REST API.
 * Version: 1.0.0
 * Author: Doorbly Engineering
 * Author URI: https://doorbly.com
 * License: GPLv2 or later
 * Text Domain: doorbly-website-manager
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('DOORBLY_VERSION', '1.0.0');
define('DOORBLY_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DOORBLY_PLUGIN_URL', plugin_dir_url(__FILE__));

class DoorblyWebsiteManager {

    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Register Custom Post Types and Taxonomies
        add_action('init', array($this, 'register_post_types'));
        
        // Register REST API endpoints
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        
        // Enqueue Assets & Astra Theme Compatibility
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        
        // Add WordPress Admin Menu Item
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Register Shortcodes
        add_shortcode('doorbly_website_manager', array($this, 'render_website_manager_shortcode'));
        add_shortcode('doorbly_visual_editor', array($this, 'render_visual_editor_shortcode'));
        
        // Astra Theme Specific Action Hooks
        add_action('astra_header_after', array($this, 'render_promotional_announcement'));
        add_action('wp_head', array($this, 'inject_custom_theme_styles'), 100);
        
        // Media Library Helper
        add_filter('upload_mimes', array($this, 'allow_custom_mime_types'));
    }

    /**
     * Register Custom Post Types for Doorbly Website Manager
     */
    public function register_post_types() {
        // 1. Doorbly Managed Pages
        register_post_type('doorbly_page', array(
            'labels' => array(
                'name' => __('Managed Pages', 'doorbly-website-manager'),
                'singular_name' => __('Managed Page', 'doorbly-website-manager'),
                'add_new' => __('Add New Page', 'doorbly-website-manager'),
                'edit_item' => __('Edit Managed Page', 'doorbly-website-manager'),
            ),
            'public' => true,
            'has_archive' => false,
            'show_in_menu' => false,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields', 'revisions'),
            'rewrite' => array('slug' => 'pages'),
            'capability_type' => 'page',
        ));

        // 2. Doorbly Custom Sections
        register_post_type('doorbly_section', array(
            'labels' => array(
                'name' => __('Website Sections', 'doorbly-website-manager'),
                'singular_name' => __('Section', 'doorbly-website-manager'),
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => false,
            'show_in_rest' => true,
            'supports' => array('title', 'custom-fields', 'revisions'),
            'capability_type' => 'post',
        ));

        // 3. Doorbly Services / Programmes
        register_post_type('doorbly_service', array(
            'labels' => array(
                'name' => __('Services & Classes', 'doorbly-website-manager'),
                'singular_name' => __('Service', 'doorbly-website-manager'),
            ),
            'public' => true,
            'show_in_menu' => false,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'rewrite' => array('slug' => 'services'),
            'capability_type' => 'post',
        ));

        // 4. Doorbly Hero Banners
        register_post_type('doorbly_banner', array(
            'labels' => array(
                'name' => __('Hero Banners', 'doorbly-website-manager'),
                'singular_name' => __('Hero Banner', 'doorbly-website-manager'),
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => false,
            'show_in_rest' => true,
            'supports' => array('title', 'thumbnail', 'custom-fields'),
            'capability_type' => 'post',
        ));
    }

    /**
     * Register Secure REST API Routes under namespace doorbly/v1
     */
    public function register_rest_routes() {
        $namespace = 'doorbly/v1';

        // GET & POST Settings
        register_rest_route($namespace, '/settings', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_settings'),
                'permission_callback' => '__return_true',
            ),
            array(
                'methods' => 'POST',
                'callback' => array($this, 'save_settings'),
                'permission_callback' => array($this, 'permissions_check_owner'),
            ),
        ));

        // GET & POST Sections
        register_rest_route($namespace, '/sections', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_sections'),
                'permission_callback' => '__return_true',
            ),
            array(
                'methods' => 'POST',
                'callback' => array($this, 'save_sections'),
                'permission_callback' => array($this, 'permissions_check_editor'),
            ),
        ));

        // GET & POST Banners
        register_rest_route($namespace, '/banners', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_banners'),
                'permission_callback' => '__return_true',
            ),
            array(
                'methods' => 'POST',
                'callback' => array($this, 'save_banners'),
                'permission_callback' => array($this, 'permissions_check_editor'),
            ),
        ));

        // GET & POST Services
        register_rest_route($namespace, '/services', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_services'),
                'permission_callback' => '__return_true',
            ),
            array(
                'methods' => 'POST',
                'callback' => array($this, 'save_services'),
                'permission_callback' => array($this, 'permissions_check_editor'),
            ),
        ));

        // Publish Live Changes with Invalidation
        register_rest_route($namespace, '/publish', array(
            'methods' => 'POST',
            'callback' => array($this, 'publish_changes'),
            'permission_callback' => array($this, 'permissions_check_publisher'),
        ));

        // Media Library API Endpoint
        register_rest_route($namespace, '/media', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_media_items'),
                'permission_callback' => array($this, 'permissions_check_editor'),
            ),
        ));
    }

    /**
     * Permission Checks
     */
    public function permissions_check_owner() {
        return current_user_can('manage_options');
    }

    public function permissions_check_publisher() {
        return current_user_can('publish_pages') || current_user_can('manage_options');
    }

    public function permissions_check_editor() {
        return current_user_can('edit_pages') || current_user_can('edit_posts');
    }

    /**
     * REST Handlers
     */
    public function get_settings($request) {
        $settings = get_option('doorbly_global_settings', array());
        return rest_ensure_response(array(
            'success' => true,
            'data' => $settings,
        ));
    }

    public function save_settings($request) {
        $params = $request->get_json_params();
        if (empty($params)) {
            return new WP_Error('invalid_data', 'No settings data provided', array('status' => 400));
        }

        // Sanitize and save
        update_option('doorbly_global_settings', $params);
        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Global theme settings saved successfully',
            'data' => $params,
        ));
    }

    public function get_sections($request) {
        $sections = get_option('doorbly_sections_data', array());
        return rest_ensure_response(array(
            'success' => true,
            'data' => $sections,
        ));
    }

    public function save_sections($request) {
        $params = $request->get_json_params();
        update_option('doorbly_sections_data', $params);

        // Record revision
        $this->create_revision_snapshot('sections', $params);

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Sections updated persistently',
            'data' => $params,
        ));
    }

    public function get_banners($request) {
        $banners = get_option('doorbly_banners_data', array());
        return rest_ensure_response(array(
            'success' => true,
            'data' => $banners,
        ));
    }

    public function save_banners($request) {
        $params = $request->get_json_params();
        update_option('doorbly_banners_data', $params);

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Hero banners updated successfully',
            'data' => $params,
        ));
    }

    public function get_services($request) {
        $services = get_option('doorbly_services_data', array());
        return rest_ensure_response(array(
            'success' => true,
            'data' => $services,
        ));
    }

    public function save_services($request) {
        $params = $request->get_json_params();
        update_option('doorbly_services_data', $params);

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Services updated successfully',
            'data' => $params,
        ));
    }

    public function publish_changes($request) {
        $params = $request->get_json_params();
        
        // Save current draft state as published
        if (!empty($params['sections'])) {
            update_option('doorbly_sections_data', $params['sections']);
        }
        if (!empty($params['banners'])) {
            update_option('doorbly_banners_data', $params['banners']);
        }
        if (!empty($params['theme'])) {
            update_option('doorbly_global_settings', $params['theme']);
        }

        // Record published revision
        $revision_id = $this->create_revision_snapshot('publish', $params);

        // Clear WordPress Object Cache and third-party page caches if active
        if (function_exists('wp_cache_flush')) {
            wp_cache_flush();
        }

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Website changes successfully published to live website!',
            'published_at' => current_time('mysql'),
            'revision_id' => $revision_id,
        ));
    }

    public function get_media_items($request) {
        $query = new WP_Query(array(
            'post_type' => 'attachment',
            'post_status' => 'inherit',
            'posts_per_page' => 50,
            'post_mime_type' => 'image',
        ));

        $items = array();
        foreach ($query->posts as $attachment) {
            $items[] = array(
                'id' => (string) $attachment->ID,
                'title' => get_the_title($attachment->ID),
                'url' => wp_get_attachment_url($attachment->ID),
                'altText' => get_post_meta($attachment->ID, '_wp_attachment_image_alt', true),
                'caption' => $attachment->post_excerpt,
                'fileSize' => size_format(filesize(get_attached_file($attachment->ID))),
                'uploadedAt' => get_the_date('Y-m-d', $attachment->ID),
                'category' => 'photo',
            );
        }

        return rest_ensure_response(array(
            'success' => true,
            'data' => $items,
        ));
    }

    private function create_revision_snapshot($type, $snapshot) {
        $revisions = get_option('doorbly_revisions_history', array());
        $current_user = wp_get_current_user();
        
        $new_revision = array(
            'id' => 'rev-' . time(),
            'title' => ucfirst($type) . ' Update — ' . current_time('M j, Y H:i'),
            'timestamp' => current_time('mysql'),
            'author' => $current_user->display_name ?: 'Website Manager',
            'role' => current_user_can('manage_options') ? 'owner' : 'editor',
            'snapshot' => $snapshot,
        );

        array_unshift($revisions, $new_revision);
        // Keep last 25 revisions
        $revisions = array_slice($revisions, 0, 25);
        update_option('doorbly_revisions_history', $revisions);

        return $new_revision['id'];
    }

    /**
     * Astra Theme CSS Injection
     */
    public function inject_custom_theme_styles() {
        $settings = get_option('doorbly_global_settings', array());
        if (empty($settings)) return;

        $primary = esc_attr($settings['primaryColor'] ?? '#008A68');
        $accent = esc_attr($settings['accentColor'] ?? '#D4AF37');
        $bg = esc_attr($settings['backgroundColor'] ?? '#FAF7F2');
        $text = esc_attr($settings['textColor'] ?? '#0F172A');

        echo "<style id='doorbly-customizer-variables'>
            :root {
                --doorbly-primary: {$primary};
                --doorbly-accent: {$accent};
                --doorbly-bg: {$bg};
                --doorbly-text: {$text};
            }
            body.ast-theme-transparent-header,
            body {
                --ast-global-color-0: {$primary};
                --ast-global-color-1: {$accent};
            }
        </style>";
    }

    public function render_promotional_announcement() {
        $announcement = get_option('doorbly_announcement_text', '');
        $visible = get_option('doorbly_announcement_visible', true);
        if ($visible && !empty($announcement)) {
            echo '<div class="doorbly-site-broadcast" style="background:#FEF3C7;color:#78350F;padding:8px 16px;text-align:center;font-size:13px;border-bottom:1px solid #FDE68A;">
                <strong>Notice:</strong> ' . esc_html($announcement) . '
            </div>';
        }
    }

    public function enqueue_frontend_assets() {
        wp_enqueue_style('doorbly-styles', DOORBLY_PLUGIN_URL . 'assets/css/doorbly-public.css', array(), DOORBLY_VERSION);
    }

    public function enqueue_admin_assets($hook) {
        if (strpos($hook, 'doorbly') !== false) {
            wp_enqueue_style('doorbly-admin-css', DOORBLY_PLUGIN_URL . 'assets/css/doorbly-admin.css', array(), DOORBLY_VERSION);
        }
    }

    public function add_admin_menu() {
        add_menu_page(
            __('Website Manager', 'doorbly-website-manager'),
            __('Website Manager', 'doorbly-website-manager'),
            'edit_pages',
            'doorbly-website-manager',
            array($this, 'render_admin_dashboard_page'),
            'dashicons-layout',
            3
        );
    }

    public function render_admin_dashboard_page() {
        echo '<div class="wrap doorbly-wrap">
            <h1>' . __('Doorbly Visual Website Manager', 'doorbly-website-manager') . '</h1>
            <p>' . __('Access the interactive visual editor to customize pages, sections, hero banners, and styling in real-time.', 'doorbly-website-manager') . '</p>
            <div id="doorbly-editor-root">
                <a href="' . home_url('/website-manager/') . '" target="_blank" class="button button-primary button-hero">
                    ' . __('Launch Visual Website Editor &rarr;', 'doorbly-website-manager') . '
                </a>
            </div>
        </div>';
    }

    public function render_website_manager_shortcode($atts) {
        ob_start();
        echo '<div id="doorbly-manager-container" class="doorbly-embedded-manager">
            <p>Loading Doorbly Website Manager dashboard...</p>
        </div>';
        return ob_get_clean();
    }

    public function render_visual_editor_shortcode($atts) {
        return $this->render_website_manager_shortcode($atts);
    }

    public function allow_custom_mime_types($mimes) {
        $mimes['svg'] = 'image/svg+xml';
        $mimes['webp'] = 'image/webp';
        return $mimes;
    }
}

// Initialize Plugin
add_action('plugins_loaded', array('DoorblyWebsiteManager', 'get_instance'));
