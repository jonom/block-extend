const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;

const numberedParagraphs = createHigherOrderComponent( ( BlockEdit ) => {
	return wp.data.withSelect( ( select, props ) => {
		// Add block index prop to every block (not ideal?)
		return {
			...props,
			blockNumber: select( 'core/editor' ).getBlockIndex( props.clientId ) + 1,
		};
	} )( ( props ) => {
		// Display index on paragraphs only
		if ( props.name === 'core/paragraph' ) {
			return (
				<Fragment>
					<p style={ { color: 'grey' } }><small><i>This is block number <b>{ props.blockNumber }</b> and it is a paragraph</i></small></p>
					<BlockEdit { ...props } />
				</Fragment>
			);
		}
		return <BlockEdit { ...props } />;
	} );
}, 'NumberedParagraph' );

wp.hooks.addFilter( 'editor.BlockEdit', 'xwp/numbered-paragraphs', numberedParagraphs );
