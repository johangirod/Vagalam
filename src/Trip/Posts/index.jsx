/* @flow */

import { connect } from 'react-redux';
import { compose } from 'ramda';
import { currentPostSelector } from './selectors';
import Post from './Post';
import type { State } from '../../rootTypes';
import type { Connector } from 'react-redux';
import PrefetchPictures from './PrefetchPictures';
import Modale from '../../shared/ui-element/Modale';

type OwnProps = {
    +onClose?: () => void,
};

type PropType = {
    +currentPost: ?Post,
} & OwnProps;

const defaultProps = {
    onClose: () => {},
};
// : React$StatelessFunctionalComponent<PropType>
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

export default (connect((state: State): * => ({
    currentPost: currentPostSelector(state),
})): Connector<OwnProps, PropType>)(PostOverlay);
