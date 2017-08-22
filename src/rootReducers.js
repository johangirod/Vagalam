// @flow

import { combineReducers } from 'redux';
import TripReducer from './Trip/reducer';

export default {
    app: combineReducers({
        trip: TripReducer,
    }),
};

