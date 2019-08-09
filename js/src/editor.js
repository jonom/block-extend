const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { select } = wp.data;

const getBlockNumber = (clientId) => {
	// Got the block number for a given block ID, starting at 1
	return select( 'core/editor' ).getBlockIndex(clientId) + 1;
}

const extendBlock = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		return (
			<Fragment>
				<p><small><i>Block number {getBlockNumber(props.clientId)}</i></small></p>
				<BlockEdit {...props} />
			</Fragment>
		);
	};
}, "ExtendedBlock");

wp.hooks.addFilter('editor.BlockEdit', 'xwp/block-extend', extendBlock);
