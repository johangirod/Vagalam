/* @flow */

import { connect } from 'react-redux';
import { compose } from 'ramda';
import { currentPostSelector } from './selectors';
import Post from './Post';
import Modale from '../../shared/ui-element/Modale';

type PropType = {
    currentPost: ?Post,
    onClose?: () => void,
};
const defaultProps = {
    onClose: () => {},
};

const PostOverlay = ({ currentPost, onClose }: PropType) => (
    <Modale
        isOpened={!!currentPost}
        fullScreen={currentPost && !!currentPost.pictures.length}
        onClose={onClose}
    >
        <Post {...currentPost} />
    </Modale>
);

PostOverlay.defaultProps = defaultProps;

export default compose(
    connect(state => ({
        currentPost: currentPostSelector(state),
    })),
)(PostOverlay);
