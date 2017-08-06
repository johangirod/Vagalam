/* @flow */
import { createSelector } from 'reselect';
import { pipe } from 'ramda';
import type { Selector } from '../rootTypes';
import { tripSelector } from '../rootSelectors';
import type { MapPoint, CurrentAnimationType } from './types';
import type { State as PostsState } from './Posts/types';

export const postsSelector: Selector<PostsState> = pipe(tripSelector, trip => trip.posts);
export const pathSelector: Selector<Array<MapPoint>> = pipe(tripSelector, trip => trip.path);
export const currentAnimationSelector: Selector<CurrentAnimationType> = pipe(
    tripSelector,
    trip => trip.currentAnimation,
);
export const currentPathSelector: Selector<Array<MapPoint>> = createSelector(
    pathSelector,
    ({ app: { trip: { currentMapPointId } } }) => currentMapPointId,
    (path, currentMapPointId) => {
        const currentMapPointIndex = path.findIndex(({ id }) => id === currentMapPointId);
        return path.slice(0, currentMapPointIndex + 1);
    },
);
