/* @flow */
import type { State as PostsState, Action as PostsAction } from './Posts/types';

export type Coordinates = [number, number];

export type PostId = string;
export opaque type SleepLocationId = string;
export opaque type PointOfInterestId = string;
export opaque type TransportId = string;

export type MapPointId = PointOfInterestId | SleepLocationId | TransportId;
export type SleepLocation = {
    +id: SleepLocationId,
    +date: string,
    +coordinates: Coordinates,
    +postId: ?PostId,
    +dayNumber: number,
    +type: 'sleep_location',
};
export type PointOfInterest = {
    +id: PointOfInterestId,
    +date: string,
    +coordinates: Coordinates,
    +postId: ?PostId,
    +type: 'point_of_interest',
};

export type TransportTypes = 'BOAT' | 'TRAIN' | 'PLANE' | 'BUS' | 'CAR';
export type Transport = {
    +id: TransportId,
    +date: string,
    +coordinates: Coordinates,
    +postId: null,
    +type: 'transport',
    +transportType: TransportTypes,
    +status: 'start' | 'end',
    +postId: null,
};

export type MapPoint = PointOfInterest | SleepLocation | Transport;

export type FetchingStatusState<IdType> = {
    +nextFetchTrigger: ?IdType,
    +lastFetchedId: ?IdType,
};

export type CurrentAnimationType = 'Map' | 'Post' | 'None';

export type State = {
    +posts: PostsState,
    +path: $ReadOnlyArray<MapPoint>,
    // $FlowFixMe incomprehensible error, it doesn't work if the field is nullable...
    +currentMapPoint: ?MapPoint,
    +fetchingStatus: {
        sleepLocations: FetchingStatusState<SleepLocationId>,
        pointsOfInterest: FetchingStatusState<PointOfInterestId>,
        transports: FetchingStatusState<TransportId>,
    },
    +currentAnimation: CurrentAnimationType,
    +userArrivedToLastPoint: boolean,
};

export type AddFetchedSleepLocationsAction = {
    type: 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS',
    sleepLocations: Array<SleepLocation>,
};

export type AddFetchedTransportsAction = {
    type: 'app/trip/ADD_FETCHED_TRANSPORTS',
    transports: Array<Transport>,
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
    | AddFetchedTransportsAction
    | GoToNextStepAction
    | GoToPreviousStepAction
    | PostsAction
    | NotifyAnimationEndAction;
