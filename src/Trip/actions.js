/* @flow */
import type {
    GoToNextStepAction,
    GoToPreviousStepAction,
    AddFetchedSleepLocationsAction,
    AddFetchedPointsOfInterestAction,
    AddFetchedTransportsAction,
    NotifyAnimationEndAction,
    SleepLocation,
    PointOfInterest,
    Transport,
} from './types';

export function goToNextStep(): GoToNextStepAction {
    return {
        type: 'app/trip/GO_TO_NEXT_STEP',
    };
}

export function goToPreviousStep(): GoToPreviousStepAction {
    return {
        type: 'app/trip/GO_TO_PREVIOUS_STEP',
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

export function addFetchedTransports(transports: Array<Transport>): AddFetchedTransportsAction {
    return {
        type: 'app/trip/ADD_FETCHED_TRANSPORTS',
        transports,
    };
}

export function notifyAnimationEnd(): NotifyAnimationEndAction {
    return {
        type: 'app/trip/CURRENT_ANIMATION_ENDED',
    };
}
