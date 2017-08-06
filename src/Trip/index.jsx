/* @flow */

import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Component } from 'react';

import { goToNextStep } from './actions';
import { hasFullScreenPostSelector } from './Posts/selectors';
import s from './style.css';
import Map from './Map';
import CurrentPost from './Posts';
import FrameLayout from '../shared/ui-element/FrameLayout';
import FullScreenModale from '../shared/FullScreenModale';
import Details from './Details';

type PropType = {
    goToNextStep: () => {},
    hasFullScreenPost: boolean,
};
// eslint-disable-next-line no-shadow
class Trip extends Component {
    props: PropType;
    handleKeyDown = (e) => {
        if (e.key === ' ') {
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
                <FullScreenModale />
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
