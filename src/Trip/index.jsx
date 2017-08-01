/* @flow */

import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Component } from 'react';

import { goToNextStep } from './actions';
import s from './style.css';
import Map from './Map';
import Posts from './Posts';
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
        this.setState({ isMapCurrentlyAnimated: false });
    };
    handleAnimationStart = () => {
        this.setState({ isMapCurrentlyAnimated: true });
    };
    render() {
        return (
            <FrameLayout
                top="vagalam"
                bottom={<Details />}
                onKeyDown={this.handleKeyDown}
                role="presentation"
            >
                <Map
                    onAnimationEnd={this.handleAnimationEnd}
                    onAnimationStart={this.handleAnimationStart}
                />
                {this.state.isMapCurrentlyAnimated ? null : <Posts />}
            </FrameLayout>
        );
    }
}

export default compose(connect(null, { goToNextStep }), withStyles(s))(Trip);
