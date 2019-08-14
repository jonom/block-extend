export default function BlockEditWithBlockMetadata( BlockEdit ) {
	const mapSelectToProps = ( select, props ) => {
		const blockIndex = select( 'core/editor' ).getBlockIndex( props.clientId );
		return {
			blockMeta: {
				blockNumber: blockIndex >= 0 ? blockIndex + 1 : null,
				blocks: select( 'core/editor' ).getBlocks(),
			},
		};
	};
	// eslint-disable-next-line no-undef
	return wp.data.withSelect( mapSelectToProps )( BlockEdit );
}
