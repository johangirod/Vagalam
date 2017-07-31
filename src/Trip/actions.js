/* @flow */
import type {
    GoToNextStepAction,
    AddFetchedSleepLocationsAction,
    AddFetchedPointsOfInterestAction,
    SleepLocation,
    PointOfInterest,
} from './types';

export function goToNextStep(): GoToNextStepAction {
    return {
        type: 'app/trip/GO_TO_NEXT_STEP',
    };
}

export function addFetchedSleepLocations(
    sleepLocations: Array<SleepLocation>,
): AddFetchedSleepLocationsAction {
    return {
        type: 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS',
        sleepLocations,
    };
}

export function addFetchedPointsOfInterest(
    pointsOfInterest: Array<PointOfInterest>,
): AddFetchedPointsOfInterestAction {
    return {
        type: 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST',
        pointsOfInterest,
    };
}
