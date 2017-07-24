// @flow

type Coordinates = [number, number];
export type SleepLocation = {
    +date: Date,
    +dayNumber: number,
    +coordinates: Coordinates,
};

export type State = {
    +sleepLocations: Array<SleepLocation>,
    +currentSleepLocationIndex: number,
};

export type AddSleepLocationsAction = {
    type: 'app/trip/ADD_SLEEP_LOCATIONS',
    sleepLocations: Array<SleepLocation>,
};

export type GoToNextSleepLocationAction = {
    type: 'app/trip/GO_TO_NEXT_SLEEP_LOCATION',
};

export type Action = AddSleepLocationsAction | GoToNextSleepLocationAction;
