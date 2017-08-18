// @flow

import { combineReducers } from 'redux';
import TripReducer from './Trip/reducer';

let appReducer = combineReducers({
    trip: TripReducer,
});

if (IS_CLIENT) {
    const storage = require('redux-persist/es/storage').default;
    const { persistReducer } = require('redux-persist');
    appReducer = persistReducer({ key: 'app', storage }, appReducer);
}

export default {
    app: appReducer,
};
