/* @flow */

import { connect } from 'react-redux';
import { Component } from 'react';
import type { Observable } from 'rxjs';
import { CSSTransitionGroup } from 'react-transition-group';
import { currentPostSelector } from './selectors';
import Post from './Post';
import Modale from '../../shared/ui-element/Modale';
type Animation<Type, Value> = {
    type: Type,
    value: Value,
    status: 'starting' | 'ending',
}
type PostAnimation = Animation<'post', ?Post >;
type PropType = {
    currentPost: ?Post,
    animations$: Observable<Animation>,
    onNewAnimation: (Observable<Animation>) => (),
};

class PostOverlay extends Component {
    componentDidMount() {
        if (this.props.currentPost) {
            this.props.onEnter();
        }
    }
    componentWillReceiveProps(nextProps) {
        this.props.onNewValue(nextProps.currentPost);
    }
    props: PropType;
    render() {
        const { currentPost } = this.props;
        return;
        <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                {currentPost
                ? <Modale key={currentPost.id}>
                    <Post {...currentPost} />
                </Modale>
                : null}
            </CSSTransitionGroup>;
    }
}
export default connect(state => ({
    currentPost: currentPostSelector(state),
}))(PostOverlay);
