/* @flow */
import type { State as PostsState, Action as PostsAction } from './Posts/types';

export type Coordinates = [number, number];

export type PostId = string;
export opaque type SleepLocationId = string;
export opaque type PointOfInterestId = string;

export type SleepLocation = {
    +id: SleepLocationId,
    +date: string,
    +coordinates: Coordinates,
    +dayNumber: number,
    +postId: ?PostId,
    +type: 'sleep_location',
};

export type PointOfInterest = {
    +id: PointOfInterestId,
    +date: string,
    +coordinates: Coordinates,
    +postId: ?PostId,
    +type: 'point_of_interest',
};

export type MapPoint = PointOfInterest | SleepLocation;
export type MapPointId = PointOfInterestId | SleepLocationId;
export type FetchingStatusState<TypeId> = {
    +nextFetchTrigger: ?MapPointId,
    +lastFetchedId: ?TypeId,
};

export type CurrentAnimationType = 'Map' | 'Post' | 'None';

export type State = {
    +posts: PostsState,
    +path: Array<MapPoint>,
    // $FlowFixMe incomprehensible error, it doesn't work if the field is nullable...
    +currentMapPointId: ?MapPointId,
    +fetchingStatus: {
        +sleepLocations: FetchingStatusState<SleepLocationId>,
        +pointsOfInterest: FetchingStatusState<PointOfInterestId>,
    },
    // $FlowFixMe: couldn't figure out what the problem was
    +currentAnimation: CurrentAnimationType,
    +userArrivedToLastPoint: boolean,
};

export type AddFetchedSleepLocationsAction = {
    type: 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS',
    sleepLocations: Array<SleepLocation>,
};

export type AddFetchedPointsOfInterestAction = {
    type: 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST',
    pointsOfInterest: Array<PointOfInterest>,
};

export type GoToNextStepAction = {
    type: 'app/trip/GO_TO_NEXT_STEP',
};

export type GoToPreviousStepAction = {
    type: 'app/trip/GO_TO_PREVIOUS_STEP',
};

export type NotifyAnimationEndAction = {
    type: 'app/trip/CURRENT_ANIMATION_ENDED',
};

export type Action =
    | AddFetchedSleepLocationsAction
    | AddFetchedPointsOfInterestAction
    | GoToNextStepAction
    | GoToPreviousStepAction
    | PostsAction
    | NotifyAnimationEndAction;
