// @flow
import { prop, nth, last, defaultTo, ascend } from 'ramda';
import { combineReducers } from 'redux';
import pipeReducers from '../shared/pipeReducers';
import type {
    Action,
    FetchingStatusState,
    MapPoint,
    PointOfInterestId,
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
    default:
        return state;
    }
}

export default pipeReducers(
    combineReducers({
        path: pathReducer,
        fetchingStatus: combineReducers({
            sleepLocations: sleepLocationsFetchStatusReducer,
            pointsOfInterest: pointsOfInterestFetchStatusReducer,
        }),
        currentMapPointId: defaultTo(null),
        posts: defaultTo({}),
    }),
    currentMapPointIdReducer,
);
