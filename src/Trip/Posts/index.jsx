/* @flow */

import { connect } from 'react-redux';
import { compose } from 'ramda';
import { withStyles } from 'vitaminjs';
import { CSSTransitionGroup } from 'react-transition-group';
import s from './style.css';
import { currentPostSelector } from './selectors';
import Post from './Post';
import Modale from '../../shared/ui-element/Modale';

type PropType = {
    currentPost: ?Post,
};

const PostOverlay = ({ currentPost }: PropType) =>
    (<CSSTransitionGroup
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionName={{
            enter: s.enter,
            enterActive: s['enter-active'],
            leave: s.leave,
            leaveActive: s['leave-active'],
        }}
    >
        {currentPost
            ? <Modale key={currentPost.id}>
                <Post {...currentPost} />
            </Modale>
            : null}
    </CSSTransitionGroup>);

export default compose(
    connect(state => ({
        currentPost: currentPostSelector(state),
    })),
    withStyles(s),
)(PostOverlay);
