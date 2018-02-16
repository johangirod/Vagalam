/* @flow */
import { createSelector } from 'reselect';
import { pipe, equals } from 'ramda';
import type { Selector } from '../rootTypes';
import { tripSelector } from '../rootSelectors';
import type { MapPoint, CurrentAnimationType } from './types';
import type { State as PostsState } from './Posts/types';

export const postsSelector: Selector<PostsState> = pipe(tripSelector, trip => trip.posts);
export const pathSelector: Selector<Array<MapPoint>> = pipe(tripSelector, trip => [...trip.path]);
export const currentAnimationSelector: Selector<CurrentAnimationType> = pipe(
    tripSelector,
    trip => trip.currentAnimation,
);
export const userArrivedToLastPointSelector: Selector<boolean> = pipe(
    tripSelector,
    trip => trip.userArrivedToLastPoint,
);
export const currentPathSelector: Selector<Array<MapPoint>> = createSelector(
    pathSelector,
    pipe(tripSelector, trip => trip.currentMapPoint),
    (path, currentMapPoint) => {
        const currentMapPointIndex = path.findIndex(equals(currentMapPoint));
        return path.slice(0, currentMapPointIndex + 1);
    },
);
