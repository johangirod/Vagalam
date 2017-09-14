/* @flow */

import { connect } from 'react-redux';
import { compose } from 'ramda';
import { currentPostSelector } from './selectors';
import Post from './Post';
import PrefetchPictures from './PrefetchPictures';
import Modale from '../../shared/ui-element/Modale';

type PropType = {
    currentPost: ?Post,
    onClose?: () => void,
};
const defaultProps = {
    onClose: () => {},
};

const PostOverlay = ({ currentPost, onClose }: PropType) => (
    <div>
        <PrefetchPictures />
        <Modale
            isOpened={!!currentPost}
            fullScreen={currentPost && !!currentPost.pictures.length}
            onClose={onClose}
        >
            <Post {...currentPost} />
        </Modale>
    </div>
);

PostOverlay.defaultProps = defaultProps;

export default compose(
    connect(state => ({
        currentPost: currentPostSelector(state),
    })),
)((PostOverlay: React$StatelessFunctionalComponent<PropType>));
