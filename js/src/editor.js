const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;

const extendBlock = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		return (
			<Fragment>
				<p><small><i>Block number goes here</i></small></p>
				<BlockEdit {...props} />
			</Fragment>
		);
	};
}, "extendedBlock");

wp.hooks.addFilter('editor.BlockEdit', 'xwp/block-extend', extendBlock);
