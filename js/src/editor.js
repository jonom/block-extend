/**
 * Internal dependencies
 */
import numberRootParagraphs from './numberRootParagraphs';

// eslint-disable-next-line no-undef
wp.hooks.addFilter( 'editor.BlockEdit', 'xwp/numbered-paragraphs', numberRootParagraphs );
