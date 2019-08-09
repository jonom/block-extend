const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;

const numberedParagraphs = createHigherOrderComponent( ( BlockEdit ) => {
	return wp.data.withSelect( ( select, props ) => {
		// Add block index prop to every block (not ideal?)
		const paragraphs = select( 'core/editor' ).getBlocks().filter( ( block ) => block.name === 'core/paragraph' );
		const paragraphIndex = paragraphs.findIndex( ( block ) => block.clientId === props.clientId );
		const paragraphNumber = ( paragraphIndex >= 0 ) ? paragraphIndex + 1 : null;
		return {
			...props,
			blockNumber: select( 'core/editor' ).getBlockIndex( props.clientId ) + 1,
			paragraphNumber,
		};
	} )( ( props ) => {
		// Display index on paragraphs only
		if ( props.name === 'core/paragraph' ) {
			return (
				<Fragment>
					<p style={ { color: 'grey', margin: 0 } }><small><i>↓ This is block number <b>{ props.blockNumber }</b> and paragraph number <b>{ props.paragraphNumber }</b></i></small></p>
					<BlockEdit { ...props } />
				</Fragment>
			);
		}
		return <BlockEdit { ...props } />;
	} );
}, 'NumberedParagraph' );

wp.hooks.addFilter( 'editor.BlockEdit', 'xwp/numbered-paragraphs', numberedParagraphs );
