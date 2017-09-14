// @flow

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
            ...(lastPlaceOfInterest ? { lastFetchedId: lastPlaceOfInterest.id } : {}),
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
            ...(lastSleepLocation ? { lastFetchedId: lastSleepLocation.id } : {}),
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

function currentAnimationReducer(state: CurrentAnimationType = null, action: Action) {
    switch (action.type) {
    case 'app/trip/GO_TO_NEXT_STEP':
    case 'app/trip/GO_TO_PREVIOUS_STEP':
        return 'Map';
    case 'app/trip/CURRENT_ANIMATION_ENDED':
        return null;
    default:
        return state;
    }
}

let tripReducer = pipeReducers(
    combineReducers({
        path: pathReducer,
        fetchingStatus: combineReducers({
            sleepLocations: sleepLocationsFetchStatusReducer,
            pointsOfInterest: pointsOfInterestFetchStatusReducer,
        }),
        currentMapPointId: defaultTo(null),
        posts: postsReducer,
        currentAnimation: currentAnimationReducer,
        userArrivedToLastPoint: defaultTo(false),
    }),
    userArrivedToLastPointReducer,
    currentMapPointIdReducer,
);

if (IS_CLIENT) {
    const storage = require('redux-persist/es/storage').default;
    const { persistReducer } = require('redux-persist');
    const persistedTripReducer = persistReducer(
        {
            key: 'app::trip',
            transforms: [
                {
                    out: (outboundState, key) =>
                        key === 'userArrivedToLastPoint' ? false : outboundState,
                    in: inboundState => inboundState,
                },
            ],
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
