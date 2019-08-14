/**
 * Internal dependencies
 */
import BlockEditWithBlockMetadata from './BlockEditWithBlockMetadata';

// eslint-disable-next-line no-undef
const { createHigherOrderComponent } = wp.compose;
// eslint-disable-next-line no-undef
const { Fragment } = wp.element;

const BlockEditWithParagraphNumbers = ( BlockEdit ) => {
	return ( props ) => {
		const { blockNumber, blocks } = props.blockMeta;
		const paragraphs = blocks.filter( ( block ) => block.name === 'core/paragraph' );
		const paragraphIndex = paragraphs.findIndex( ( block ) => block.clientId === props.clientId );
		const paragraphNumber = ( paragraphIndex >= 0 ) ? paragraphIndex + 1 : null;
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
	return BlockEditWithBlockMetadata( BlockEditWithParagraphNumbers( BlockEdit ) );
}, 'NumberedParagraph' );

export default numberRootParagraphs;
