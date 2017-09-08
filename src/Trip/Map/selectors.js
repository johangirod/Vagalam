/* @flow */

import type { LineString2D } from 'flow-geojson';
import { createSelector, createStructuredSelector } from 'reselect';
import { last, splitAt, prop } from 'ramda';
import { lineString } from '@turf/helpers';
import { coordAll } from '@turf/meta';
import lineSlice from '@turf/line-slice';
import bezier from '@turf/bezier';

import type { Coordinates } from '../types';
import { currentPathSelector, pathSelector } from '../selectors';
import type { Selector } from '../../rootTypes';

const TRIP_STARTING_POINT = [2.3738311, 48.8841141];

function bezierCoord(resolution: number, coordinates: Array<Coordinates>): Array<Coordinates> {
    return coordinates.length >= 2
        ? coordAll(bezier(lineString(coordinates), resolution, 0.6))
        : coordinates;
}

const SMOOTH_LINE_NUMBER = 25;
const wholeTripLineStringSelector: Selector<?LineString2D> = createSelector(pathSelector, (path) => {
    const coordinates = [TRIP_STARTING_POINT, ...path.map(prop('coordinates'))];
    if (coordinates.length < 2) {
        return null;
    }
    const [roughLine, smoothLine] = splitAt(-SMOOTH_LINE_NUMBER, coordinates);
    return lineString([...roughLine, ...bezierCoord(20000, smoothLine)]);
});

const displayedTripLineStringSelector: Selector<?LineString2D> = createSelector(
    wholeTripLineStringSelector,
    currentPathSelector,
    (tripLineString, currentPath) => {
        const currentMapPoint = last(currentPath);
        if (!tripLineString || !currentMapPoint) {
            return null;
        }
        return lineSlice(TRIP_STARTING_POINT, currentMapPoint.coordinates, tripLineString);
    },
);

export default createStructuredSelector({
    displayedTripLineString: displayedTripLineStringSelector,
    currentPath: currentPathSelector,
});
