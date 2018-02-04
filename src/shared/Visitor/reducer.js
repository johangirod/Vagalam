// @flow

import type { Action, State } from './types';

let visitorReducer = function visitorReducer(state: State = {}, action: Action) {
    switch (action.type) {
        case 'app/visitor/SUBSCRIBE':
            return {
                email: action.email,
                emailPreference: 'SOMETIMES',
            };
        case 'app/visitor/UPDATE_EMAIL_PREFERENCE':
            if (!state) {
                return state;
            }
            return {
                ...state,
                emailPreference: action.emailPreference,
            };
        default:
            return state;
    }
};

if (IS_CLIENT) {
    const storage = require('redux-persist/es/storage').default;
    const { persistReducer } = require('redux-persist');
    const persistedVisitorReducer = persistReducer(
        {
            key: 'app::visitor',
            storage,
        },
        visitorReducer,
    );

    // @TODO workaround because redux-persist@v5 returns undefined if the config keys do not match
    visitorReducer = (state: State, action: Action) => {
        const newTripState = persistedVisitorReducer(state, action);
        return typeof newTripState === 'undefined' ? state : newTripState;
    };
}

const immutableVisitorReducer = visitorReducer;
export default immutableVisitorReducer;
