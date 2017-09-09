// @flow

import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Component } from 'react';

import { goToNextStep, goToPreviousStep } from './actions';
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
    goToPreviousStep: () => {},
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
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillReceiveProps({ isFullscreenPostDisplayed }) {
        this.setState({ isFullscreenPostDisplayed });
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    props: PropType;
    handlePostModaleClose = () => {
        this.setState({ isFullscreenPostDisplayed: false });
    };
    handleKeyDown = (e) => {
        if (e.key === ' ' || e.key === 'ArrowRight') {
            this.props.goToNextStep();
        }
        if (e.key === 'ArrowLeft') {
            this.props.goToPreviousStep();
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
                bottom={!this.state.isFullscreenPostDisplayed ? <Details /> : null}
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
        { goToNextStep, goToPreviousStep },
    ),
    withStyles(s),
)(Trip);
