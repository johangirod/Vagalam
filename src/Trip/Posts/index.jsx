// @flow

import { connect } from 'react-redux';
import { currentPostSelector } from './selectors';
import { goToNextStep } from '../actions';
import Post from './Post';
import Modale from '../../shared/ui-element/Modale';

const PostOverlay = ({
    currentPost,
    // eslint-disable-next-line no-shadow
    goToNextStep,
}: {
    currentPost: ?Post,
    goToNextStep: () => void,
}) =>
    currentPost
        ? <Modale onClose={goToNextStep}>
            <Post {...currentPost} />
        </Modale>
        : null;

export default connect(
    state => ({
        currentPost: currentPostSelector(state),
    }),
    { goToNextStep },
)(PostOverlay);
