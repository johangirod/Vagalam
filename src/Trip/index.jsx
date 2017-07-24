// @flow

import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import { goToNextSleepLocation } from './actions';
import s from './style.css';
import Map from './Map';
import Details from './Details';

// eslint-disable-next-line no-shadow
const Trip = ({ goToNextSleepLocation }) => {
    const handleKeyDown = e => e.key === ' ' && goToNextSleepLocation();
    return (
        <div className={s.layout} role="presentation" onKeyDown={handleKeyDown}>
            <Map />
            <Details />
        </div>
    );
};

export default compose(connect(null, { goToNextSleepLocation }), withStyles(s))(Trip);
