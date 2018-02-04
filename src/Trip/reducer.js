// $FlowFixMe: couldn't figure out what the problem was
/* @flow */

// $FlowFixMe: ramda flow typed API not up to date (ascend not present)
import { prop, nth, last, defaultTo, ascend } from 'ramda';
import { combineReducers } from 'redux';

import pipeReducers from '../shared/pipeReducers';
import postsReducer from './Posts/reducer';

import type {
    Action,
    FetchingStatusState,
    MapPoint,
    PointOfInterestId,
    CurrentAnimationType,
    State,
    SleepLocationId,
} from './types';

function pointsOfInterestFetchStatusReducer(
    state: FetchingStatusState<PointOfInterestId> = { nextFetchTrigger: null, lastFetchedId: null },
    action: Action,
) {
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST':
            const lastPlaceOfInterest = last(action.pointsOfInterest);
            const penultimatePlaceOfInterest = nth(-2, action.pointsOfInterest);
            return {
                lastFetchedId: lastPlaceOfInterest && lastPlaceOfInterest.id,
                nextFetchTrigger: penultimatePlaceOfInterest && penultimatePlaceOfInterest.id,
            };
        default:
            return state;
    }
}

function sleepLocationsFetchStatusReducer(
    state: FetchingStatusState<SleepLocationId> = { nextFetchTrigger: null, lastFetchedId: null },
    action: Action,
) {
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS':
            const lastSleepLocation = last(action.sleepLocations);
            const penultimateSleepLocation = nth(-2, action.sleepLocations);
            return {
                lastFetchedId: lastSleepLocation && lastSleepLocation.id,
                nextFetchTrigger: penultimateSleepLocation && penultimateSleepLocation.id,
            };
        default:
            return state;
    }
}

function pathReducer(state: Array<MapPoint> = [], action: Action): Array<MapPoint> {
    let newMapPoints;
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST':
            newMapPoints = action.pointsOfInterest;
            break;
        case 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS':
            newMapPoints = action.sleepLocations;
            break;
        default:
            return state;
    }
    return state.concat(newMapPoints).sort(ascend(prop('date')));
}

function currentMapPointIdReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
            const nextMapPoint =
                state.path[state.path.findIndex(({ id }) => id === state.currentMapPointId) + 1];
            if (!nextMapPoint) {
                return state;
            }
            return {
                ...state,
                currentMapPointId: nextMapPoint.id,
            };
        case 'app/trip/GO_TO_PREVIOUS_STEP':
            const previousMapPoint =
                state.path[state.path.findIndex(({ id }) => id === state.currentMapPointId) - 1];
            if (!previousMapPoint) {
                return state;
            }
            return {
                ...state,
                currentMapPointId: previousMapPoint.id,
            };
        default:
            return state;
    }
}

function userArrivedToLastPointReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
            const lastMapPoint = last(state.path);
            return {
                ...state,
                userArrivedToLastPoint:
                    !!lastMapPoint &&
                    state.currentMapPointId === lastMapPoint.id &&
                    !state.fetchingStatus.sleepLocations.nextFetchTrigger &&
                    !state.fetchingStatus.pointsOfInterest.nextFetchTrigger,
            };
        case 'app/trip/GO_TO_PREVIOUS_STEP':
            return {
                ...state,
                userArrivedToLastPoint: false,
            };
        default:
            return state;
    }
}

function currentAnimationReducer(state: CurrentAnimationType = 'None', action: Action) {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
        case 'app/trip/GO_TO_PREVIOUS_STEP':
            return 'Map';
        case 'app/trip/CURRENT_ANIMATION_ENDED':
            return 'None';
        default:
            return state;
    }
}

const fetchingStatusReducer = combineReducers({
    sleepLocations: sleepLocationsFetchStatusReducer,
    pointsOfInterest: pointsOfInterestFetchStatusReducer,
});

const rootReducer = combineReducers({
    posts: postsReducer,
    path: pathReducer,
    currentMapPointId: defaultTo(null),
    fetchingStatus: fetchingStatusReducer,
    currentAnimation: currentAnimationReducer,
    userArrivedToLastPoint: defaultTo(false),
});

let tripReducer: (State, Action) => State = pipeReducers(
    userArrivedToLastPointReducer,
    currentMapPointIdReducer,
    rootReducer,
);

if (IS_CLIENT) {
    const storage = require('redux-persist/es/storage').default;
    const { persistReducer } = require('redux-persist');
    const persistedTripReducer = persistReducer(
        {
            key: 'app::trip',
            blacklist: ['userArrivedToLastPoint'],
            storage,
        },
        tripReducer,
    );
    // @TODO workaround because redux-persist@v5 returns undefined if the config keys do not match
    tripReducer = (state: State, action: Action) => {
        const newTripState = persistedTripReducer(state, action);
        return typeof newTripState === 'undefined' ? state : newTripState;
    };
}

const immutableTripReducer = tripReducer;
export default immutableTripReducer;
