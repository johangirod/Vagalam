/* @flow */

import { connect } from 'react-redux';
import { compose } from 'ramda';
import { currentPostSelector } from './selectors';
import Post from './Post';
import Modale from '../../shared/ui-element/Modale';

type PropType = {
    currentPost: ?Post,
};

const PostOverlay = ({ currentPost }: PropType) =>
    (<Modale isOpened={!!currentPost}>
        <Post {...currentPost} />
    </Modale>);

export default compose(
    connect(state => ({
        currentPost: currentPostSelector(state),
    })),
)(PostOverlay);
