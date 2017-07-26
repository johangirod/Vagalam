// @flow
export type Picture = {
    +id: string,
    +url: string,
};
export type Coordinates = [number, number];

opaque type PostId = string;
export opaque type SleepLocationId = string;
export opaque type PointOfInterestId = string;
export type Post = {
    +id: PostId,
    +type: 'Article' | 'Gallery',
    +title: ?string,
    +shortDescription: ?string,
    +pictures: ?Array<Picture>,
    +content: ?string,
};

export type SleepLocation = {
    +id: SleepLocationId,
    +date: Date,
    +coordinates: Coordinates,
    +dayNumber: number,
    +postId: ?PostId,
    +type: 'sleep_location',
};

export type PointOfInterest = {
    +id: PointOfInterestId,
    +date: Date,
    +coordinates: Coordinates,
    +postId: ?PostId,
    +type: 'point_of_interest',    
};

export type MapPoint = PointOfInterest | SleepLocation;
export type MapPointId = PointOfInterestId | SleepLocationId;
export type FetchingStatusState<TypeId> = {
    nextFetchTrigger: ?MapPointId,
    lastFetchedId: ?TypeId,
};
export type State = {
    +posts: { [PostId]: Post },
    +path: Array<MapPoint>,
    +currentMapPointId: ?MapPointId,
    +fetchingStatus: {
        sleepLocations: FetchingStatusState<SleepLocationId>,
        pointsOfInterest: FetchingStatusState<PointOfInterestId>,
    },
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

export type Action = AddFetchedSleepLocationsAction | AddFetchedPointsOfInterestAction | GoToNextStepAction;
