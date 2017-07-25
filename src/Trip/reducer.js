// @flow
import type { State, Action } from './types';

const initialState = {
    sleepLocations: [],
    currentSleepLocationIndex: -1,
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
    case 'app/trip/ADD_SLEEP_LOCATIONS':
        return {
            ...state,
            sleepLocations: state.sleepLocations.concat(action.sleepLocations),
        };

    case 'app/trip/GO_TO_NEXT_SLEEP_LOCATION':
        return {
            ...state,
            currentSleepLocationIndex: state.currentSleepLocationIndex + 1,
        };

    default:
        return state;
    }
}
