// @flow

import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import { goToNextStep } from './actions';
import s from './style.css';
import Map from './Map';
import Posts from './Posts';
import Details from './Details';

// eslint-disable-next-line no-shadow
const Trip = ({ goToNextStep }) => {
    const handleKeyDown = e => e.key === ' ' && goToNextStep();
    return (
        <div className={s.layout} role="presentation" onKeyDown={handleKeyDown}>
            <Map />
            <Details />
            <Posts />
        </div>
    );
};

export default compose(connect(null, { goToNextStep }), withStyles(s))(Trip);
