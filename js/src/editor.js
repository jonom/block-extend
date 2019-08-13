const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;

const BlockEditWithMetadata = ( BlockEdit ) => {
	const thing = ( select, props ) => {
		const paragraphs = select( 'core/editor' ).getBlocks().filter( ( block ) => block.name === 'core/paragraph' );
		const paragraphIndex = paragraphs.findIndex( ( block ) => block.clientId === props.clientId );
		const paragraphNumber = ( paragraphIndex >= 0 ) ? paragraphIndex + 1 : null;
		const blockIndex = select( 'core/editor' ).getBlockIndex( props.clientId );
		return {
			blockMeta: {
				blockNumber: blockIndex >= 0 ? blockIndex + 1 : null,
				paragraphNumber,
			},
		};
	};

	return wp.data.withSelect( thing )( BlockEdit );
};

const BlockEditWithParagraphNumbers = ( BlockEdit ) => {
	return ( props ) => {
		const { blockNumber, paragraphNumber } = props.blockMeta;
		const originalBlock = <BlockEdit { ...props } />;
		// Display index only on root paragraphs
		if ( props.name === 'core/paragraph' && blockNumber && paragraphNumber ) {
			return (
				<Fragment>
					<p style={ { color: 'grey', margin: 0, fontSize: '.75em' } }>
						↓ This is block number <b>{ blockNumber } </b>
						and paragraph number <b>{ paragraphNumber }</b>
					</p>
					{ originalBlock }
				</Fragment>
			);
		}
		return originalBlock;
	};
};

const numberRootParagraphs = createHigherOrderComponent( ( BlockEdit ) => {
	return BlockEditWithMetadata( BlockEditWithParagraphNumbers( BlockEdit ) );
}, 'NumberedParagraph' );

wp.hooks.addFilter( 'editor.BlockEdit', 'xwp/numbered-paragraphs', numberRootParagraphs );
