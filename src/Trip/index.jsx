/* @flow */

import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Component } from 'react';

import { goToNextStep } from './actions';
import { isFullscreenPostDisplayedSelector } from './Posts/selectors';
import s from './style.css';
import Map from './Map';
import CurrentPost from './Posts';
import FrameLayout from '../shared/ui-element/FrameLayout';
import FullScreenModale from '../shared/FullScreenModale/index';
import LastPointModale from './LastPointModale/index';
import Details from './Details';

type PropType = {
    goToNextStep: () => {},
    isFullscreenPostDisplayed: boolean,
};
// eslint-disable-next-line no-shadow
class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreenPostDisplayed: props.isFullscreenPostDisplayed,
        };
    }
    state: {
        isFullscreenPostDisplayed: boolean,
    };
    componentWillReceiveProps({ isFullscreenPostDisplayed }) {
        this.setState({ isFullscreenPostDisplayed });
    }
    props: PropType;

    handlePostModaleClose = () => {
        this.setState({ isFullscreenPostDisplayed: false });
    };
    handleKeyDown = (e) => {
        if (e.key === ' ') {
            this.props.goToNextStep();
        }
    };

    render() {
        return (
            <FrameLayout
                top={
                    <a href={'/'} className={s.brand}>
                        Vagalam
                    </a>
                }
                bottom={<Details />}
                onKeyDown={this.handleKeyDown}
                frameBackgroundColor={this.state.isFullscreenPostDisplayed ? 'black' : 'white'}
                role="presentation"
            >
                <Map />
                <CurrentPost onClose={this.handlePostModaleClose} />
                <LastPointModale />
                <FullScreenModale />
            </FrameLayout>
        );
    }
}

export default compose(
    connect(
        state => ({
            isFullscreenPostDisplayed: isFullscreenPostDisplayedSelector(state),
        }),
        { goToNextStep },
    ),
    withStyles(s),
)(Trip);
