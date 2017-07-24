// @flow
import type { GoToNextSleepLocationAction, AddSleepLocationsAction, SleepLocation } from './types';

export function goToNextSleepLocation(): GoToNextSleepLocationAction {
    return {
        type: 'app/trip/GO_TO_NEXT_SLEEP_LOCATION',
    };
}

export function addSleepLocations(sleepLocations: Array<SleepLocation>): AddSleepLocationsAction {
    return {
        type: 'app/trip/ADD_SLEEP_LOCATIONS',
        sleepLocations,
    };
}
