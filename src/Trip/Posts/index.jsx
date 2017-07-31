/* @flow */

import { connect } from 'react-redux';
import type { StatelessComponent } from 'react-redux';
import { currentPostSelector } from './selectors';
import { goToNextStep } from '../actions';
import Post from './Post';
import Modale from '../../shared/ui-element/Modale';

type PropType = {
    currentPost: ?Post,
    goToNextStep: () => void,
};
// eslint-disable-next-line no-shadow
const PostOverlay = ({ currentPost, goToNextStep }: PropType) =>
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
)((PostOverlay: StatelessComponent<PropType>));
