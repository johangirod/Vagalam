// @flow

import { combineReducers } from 'redux';
import TripReducer from './Trip/reducer';
import VisitorReducer from './shared/Visitor/reducer';

export default {
    app: combineReducers({
        trip: TripReducer,
        visitor: VisitorReducer,
    }),
};
