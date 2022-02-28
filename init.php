<?php

function register_guttenberg_blocks() {

    // Check if Gutenberg is active.
    if ( ! function_exists( 'register_block_type' ) ) {
        return;
    }

    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    // Add block script.
    wp_register_script(
        'koji/koji-embed-button',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    // Add block style.
    wp_register_style(
        'koji-embed-button',
        plugins_url( 'build/style-index.css', __FILE__ ),
        [],
        filemtime( plugin_dir_path( __FILE__ ) . 'build/style-index.css' )
    );

    register_block_type( 'koji/koji-embed-button', [
        'editor_script' => 'koji/koji-embed-button', // Loads only on editor.
        'style' => 'koji-embed-button', // Loads both on editor and frontend.
    ] );
}

function register_front_end_script() {
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build-frontend/index.asset.php');

    wp_enqueue_script(
        'front_end_script',
        plugins_url('build-frontend/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );
}

add_action( 'init', 'register_guttenberg_blocks' );
add_action( 'wp_enqueue_scripts', 'register_front_end_script' ); // loads only on frontend