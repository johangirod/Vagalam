// @flow

import type { LineString2D } from 'flow-geojson';
import type { Coordinates } from '../types';
import { createSelector, createStructuredSelector } from 'reselect';
import { last, splitAt } from 'ramda';
import { lineString } from '@turf/helpers';
import { coordAll } from '@turf/meta';
import lineSlice from '@turf/line-slice';
import bezier from '@turf/bezier';

import { sleepLocationsSelector, currentSleepLocationIndexSelector } from '../selectors';
import type { State } from '../../rootTypes';

const TRIP_STARTING_POINT = [2.3738311, 48.8841141];

function bezierCoord(resolution: number, coordinates: Array<Coordinates>): Array<Coordinates> {
    return coordinates.length
        ? coordAll(bezier(lineString(coordinates), resolution, 0.6))
        : coordinates;
}

const SMOOTH_LINE_NUMBER = 15;
const wholeTripLineStringSelector: State => ?LineString2D = createSelector(
    sleepLocationsSelector,
    (sleepLocations) => {
        if (!sleepLocations.length) {
            return null;
        }
        const coordinates = [
            TRIP_STARTING_POINT,
            ...sleepLocations.map(sleepLocation => sleepLocation.coordinates),
        ];
        const [roughLine, smoothLine] = splitAt(-SMOOTH_LINE_NUMBER, coordinates);

        return lineString([...bezierCoord(5000, roughLine), ...bezierCoord(20000, smoothLine)]);
    },
);

const displayedSleepLocationsSelector: State => Array<Coordinates, > = createSelector(
    sleepLocationsSelector,
    currentSleepLocationIndexSelector,
    (sleepLocations, currentSleepLocationIndex) =>
        sleepLocations.slice(0, currentSleepLocationIndex + 1),
);

const displayedTripLineStringSelector: State => ?LineString2D = createSelector(
    wholeTripLineStringSelector,
    displayedSleepLocationsSelector,
    (tripLineString, sleepLocations) => {
        if (!tripLineString || !sleepLocations.length) {
            return null;
        }
        return lineSlice(TRIP_STARTING_POINT, last(sleepLocations), tripLineString);
    },
);

export default createStructuredSelector({
    displayedSleepLocations: displayedSleepLocationsSelector,
    displayedTripLineString: displayedTripLineStringSelector,
});
