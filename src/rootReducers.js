// @flow

import { combineReducers } from 'redux';
import TripReducer, { reduxPersistTransforms as reduxPersistTripTransforms } from './Trip/reducer';

export default {
    app: combineReducers({
        trip: TripReducer,
    }),
};

export const reduxPersistTransforms = [...reduxPersistTripTransforms];
