const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;

const numberedParagraphs = createHigherOrderComponent( ( BlockEdit ) => {
	return wp.data.withSelect( ( select, props ) => {
		// Add block index prop to every block (not ideal?)
		const paragraphs = select( 'core/editor' ).getBlocks().filter( ( block ) => block.name === 'core/paragraph' );
		const paragraphIndex = paragraphs.findIndex( ( block ) => block.clientId === props.clientId );
		const paragraphNumber = ( paragraphIndex >= 0 ) ? paragraphIndex + 1 : null;
		const blockIndex = select( 'core/editor' ).getBlockIndex( props.clientId );
		return {
			...props,
			blockNumber: blockIndex >= 0 ? blockIndex + 1 : null,
			paragraphNumber,
		};
	} )( ( props ) => {
		const { blockNumber, paragraphNumber } = props;
		const originalBlock = <BlockEdit { ...props } />;
		// Display index only on root paragraphs
		if ( props.name === 'core/paragraph' && blockNumber && paragraphNumber ) {
			return (
				<Fragment>
					<p style={ { color: 'grey', margin: 0 } }><small><i>↓ This is block number <b>{ blockNumber }</b> and paragraph number <b>{ paragraphNumber }</b></i></small></p>
					{ originalBlock }
				</Fragment>
			);
		}
		return originalBlock;
	} );
}, 'NumberedParagraph' );

wp.hooks.addFilter( 'editor.BlockEdit', 'xwp/numbered-paragraphs', numberedParagraphs );
