/* @flow */

import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Motion, spring } from 'react-motion';

import { goToNextStep } from './actions';
import s from './style.css';
import Map from './Map';
import CurrentPost from './Posts';
import FrameLayout from '../shared/ui-element/FrameLayout';
import Details from './Details';

function goFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen;

    if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
    ) {
        requestFullScreen.call(docEl);
    }
}

type PropType = {
    goToNextStep: () => {},
};
// eslint-disable-next-line no-shadow
class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMapCurrentlyAnimated: false,
            isPostDisplayed: false,
        };
    }
    props: PropType;
    handleKeyDown = (e) => {
        if (e.key === ' ') {
            goFullScreen();
            this.props.goToNextStep();
        }
    };
    handleAnimationEnd = () => {
        setTimeout(() => this.setState({ isMapCurrentlyAnimated: false }), 500);
    };
    handleAnimationStart = () => {
        this.setState({ isMapCurrentlyAnimated: true });
    };
    handlePostEnter = () => {
        this.setState({ isPostDisplayed: true });
    };
    handlePostLeave = () => {
        this.setState({ isPostDisplayed: false });
    };
    isCurrentPostVisible = () => this.state.isPostDisplayed && !this.state.isMapCurrentlyAnimated;
    render() {
        return (
            <FrameLayout
                top="vagalam"
                bottom={<Details />}
                onKeyDown={this.handleKeyDown}
                role="presentation"
            >
                <Motion
                    style={{
                        mapTransformScale: spring(this.isCurrentPostVisible() ? 2 : 1),
                        postTransformScale: spring(this.isCurrentPostVisible() ? 1 : 0),
                        postOpacity: spring(this.isCurrentPostVisible() ? 1 : 0),
                    }}
                >
                    {({ mapTransformScale, postOpacity, postTransformScale }) =>
                        (<div style={{ height: '100%', overflow: 'hidden' }}>
                            <Map
                                style={{
                                    transform: `scale(${mapTransformScale})`,
                                }}
                                onAnimationEnd={this.handleAnimationEnd}
                                onAnimationStart={this.handleAnimationStart}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    transform: `scale(${postTransformScale})`,
                                    opacity: postOpacity,
                                }}
                            >
                                <CurrentPost
                                    onEnter={this.handlePostEnter}
                                    onLeave={this.handlePostLeave}
                                />
                            </div>
                        </div>)}
                </Motion>
            </FrameLayout>
        );
    }
}

export default compose(connect(null, { goToNextStep }), withStyles(s))(Trip);
