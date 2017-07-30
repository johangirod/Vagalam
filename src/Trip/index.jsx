// @flow

import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import { goToNextStep } from './actions';
import s from './style.css';
import Map from './Map';
import Posts from './Posts';
import FrameLayout from '../shared/ui-element/FrameLayout';
import Details from './Details';

// eslint-disable-next-line no-shadow
const Trip = ({ goToNextStep }) => {
    const handleKeyDown = e => e.key === ' ' && goToNextStep();
    return (
        <FrameLayout
            top="vagalam"
            bottom={<Details />}
            onKeyDown={handleKeyDown}
            role="presentation"
        >
            <Map />
            <Posts />
        </FrameLayout>
    );
};

export default compose(connect(null, { goToNextStep }), withStyles(s))(Trip);
