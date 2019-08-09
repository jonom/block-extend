<?php
/**
 * Plugin Name: Numbered Paragraphs
 * Description: Extend Gutenberg editor blocks to show indexes on paragraphs.
 * Version: 0.1.0
 * Author: XWP
 * Author URI: https://xwp.co
 * Text Domain: numbered-paragraphs
 */

namespace XWP\BlockExtend;

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

$numbered_paragraphs_plugin = new BlockExtendPlugin( new Plugin( __FILE__ ) );

add_action( 'plugins_loaded', [ $numbered_paragraphs_plugin, 'init' ] );
