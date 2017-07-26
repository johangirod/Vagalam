// @flow
import { createSelector } from 'reselect';
import type { State as RootState } from '../rootTypes';
import type { MapPoint } from './types';

export const pathSelector: RootState => Array<MapPoint> = ({ app: { trip: { path } } }) => path;
export const currentPathSelector: RootState => Array<MapPoint> = createSelector(
    pathSelector,
    ({ app: { trip: { currentMapPointId } } }) => currentMapPointId,
    (path, currentMapPointId) => {
        const currentMapPointIndex = path.findIndex(({ id }) => id === currentMapPointId);
        return path.slice(0, currentMapPointIndex + 1);
    },
);
