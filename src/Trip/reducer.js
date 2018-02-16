/* @flow */

// $FlowFixMe: ramda flow typed API not up to date (ascend not present)
import { prop, defaultTo, equals, ascend } from 'ramda';
import { combineReducers } from 'redux';

import pipeReducers from '../shared/pipeReducers';
import postsReducer from './Posts/reducer';

import type {
    Action,
    FetchingStatusState,
    MapPoint,
    PointOfInterestId,
    TransportId,
    CurrentAnimationType,
    State,
    SleepLocationId,
} from './types';

function pathReducer(
    state: $ReadOnlyArray<MapPoint> = [],
    action: Action,
): $ReadOnlyArray<MapPoint> {
    let newMapPoints;
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST':
            newMapPoints = action.pointsOfInterest;
            break;
        case 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS':
            newMapPoints = action.sleepLocations;
            break;
        case 'app/trip/ADD_FETCHED_TRANSPORTS':
            newMapPoints = action.transports;
            break;
        default:
            return state;
    }
    return state.concat(newMapPoints).sort(ascend(prop('date')));
}

function currentMapPointReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
            const nextMapPoint =
                state.path[state.path.findIndex(equals(state.currentMapPoint)) + 1];
            if (!nextMapPoint) {
                return state;
            }
            return {
                ...state,
                currentMapPoint: nextMapPoint,
            };
        case 'app/trip/GO_TO_PREVIOUS_STEP':
            const previousMapPoint =
                state.path[state.path.findIndex(equals(state.currentMapPoint)) - 1];
            if (!previousMapPoint) {
                return state;
            }
            return {
                ...state,
                currentMapPoint: previousMapPoint,
            };
        default:
            return state;
    }
}

function userArrivedToLastPointReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
            const lastMapPoint = state.path[state.path.length - 1];
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

type MapPointEntity<I> = {
    +id: I,
};
function newFetchStatusState<I>(
    mapPoints: $ReadOnlyArray<MapPointEntity<I>>,
): FetchingStatusState<I> {
    const lastMapPoint = mapPoints[mapPoints.length - 1];
    const fetchTriggerPoint = mapPoints[mapPoints.length - 3];
    return {
        lastFetchedId: lastMapPoint ? lastMapPoint.id : null,
        nextFetchTrigger: fetchTriggerPoint ? fetchTriggerPoint.id : null,
    };
}
function pointsOfInterestFetchStatusReducer(
    state: FetchingStatusState<PointOfInterestId> = { nextFetchTrigger: null, lastFetchedId: null },
    action: Action,
): FetchingStatusState<PointOfInterestId> {
    if (action.type !== 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST') {
        return state;
    }
    return newFetchStatusState(action.pointsOfInterest);
}

function sleepLocationsFetchStatusReducer(
    state: FetchingStatusState<SleepLocationId> = { nextFetchTrigger: null, lastFetchedId: null },
    action: Action,
): FetchingStatusState<SleepLocationId> {
    if (action.type !== 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS') {
        return state;
    }
    return newFetchStatusState(action.sleepLocations);
}

function transportsFetchStatusReducer(
    state: FetchingStatusState<TransportId> = { nextFetchTrigger: null, lastFetchedId: null },
    action: Action,
): FetchingStatusState<TransportId> {
    if (action.type !== 'app/trip/ADD_FETCHED_TRANSPORTS') {
        return state;
    }
    return newFetchStatusState(action.transports);
}

const fetchingStatusReducer = combineReducers({
    sleepLocations: sleepLocationsFetchStatusReducer,
    pointsOfInterest: pointsOfInterestFetchStatusReducer,
    transports: transportsFetchStatusReducer,
});

const rootReducer: (State, Action) => State = combineReducers({
    posts: postsReducer,
    path: pathReducer,
    currentMapPoint: defaultTo(null),
    fetchingStatus: fetchingStatusReducer,
    currentAnimation: currentAnimationReducer,
    userArrivedToLastPoint: defaultTo(false),
});

let tripReducer = pipeReducers(rootReducer, userArrivedToLastPointReducer, currentMapPointReducer);

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
