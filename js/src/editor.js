const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;

const getBlockNumber = ( clientId ) => {
	// Got the block number for a given block ID, starting at 1
	return wp.data.select( 'core/editor' ).getBlockIndex( clientId ) + 1;
};

const extendBlock = createHigherOrderComponent( ( BlockEdit ) => {
	return wp.data.withSelect( ( select, props ) => {
		return {
			...props,
			blockNumber: getBlockNumber( props.clientId ),
		};
	} )( ( props ) => {
		return (
			<Fragment>
				<p><small><i>Block number { props.blockNumber }</i></small></p>
				<BlockEdit { ...props } />
			</Fragment>
		);
	} );
}, 'ExtendedBlock' );

wp.hooks.addFilter( 'editor.BlockEdit', 'xwp/block-extend', extendBlock );
