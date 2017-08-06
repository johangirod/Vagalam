/* @flow */

import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Component } from 'react';
import classnames from 'classnames';

import { goToNextStep } from './actions';
import { hasFullScreenPostSelector } from './Posts/selectors';
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
    hasFullScreenPost: boolean,
};
// eslint-disable-next-line no-shadow
class Trip extends Component {
    props: PropType;
    handleKeyDown = (e) => {
        if (e.key === ' ') {
            goFullScreen();
            this.props.goToNextStep();
        }
    };
    render() {
        return (
            <FrameLayout
                top="vagalam"
                bottom={<Details />}
                onKeyDown={this.handleKeyDown}
                frameBackgroundColor={this.props.hasFullScreenPost ? 'black' : 'white'}
                role="presentation"
            >
                <Map />
                <CurrentPost />
            </FrameLayout>
        );
    }
}

export default compose(
    connect(state => ({ hasFullScreenPost: hasFullScreenPostSelector(state) }), { goToNextStep }),
    withStyles(s),
)(Trip);
