/* @flow */

import { createSelector, createStructuredSelector } from 'reselect';
import bezierSpline from '@turf/bezier-spline';
import { point } from '@turf/helpers';
import lineSlice from '@turf/line-slice';
import type { TransportTypes, MapPoint, Coordinates } from '../types';
import type { TripFeature, TripFeatureCollection } from './types';
import { pathSelector, currentPathSelector } from '../selectors';
import type { Selector } from '../../rootTypes';

const newTripFeature = (transportType: TransportTypes | 'BIKE'): TripFeature => ({
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: [],
    },
    properties: {
        transportType,
    },
});

const pathToFeatureCollection = (path: Array<MapPoint>): Array<TripFeature> => {
    const [lines, currentLine] = path.reduce(
        (
            [tripLines: Array<TripFeatures>, currentTripLine: ?TripFeature],
            currentMapPoint: MapPoint,
        ) => {
            if (currentMapPoint.type === 'transport') {
                const newTripLine = newTripFeature(
                    currentMapPoint.status === 'start' ? currentMapPoint.transportType : 'BIKE',
                );
                if (!currentTripLine) {
                    return [tripLines, currentTripLine];
                }
                currentTripLine.geometry.coordinates.push(currentMapPoint.coordinates);
                newTripLine.geometry.coordinates = [currentMapPoint.coordinates];
                return [[...tripLines, currentTripLine], newTripLine];
            }
            if (!currentTripLine) {
                currentTripLine = newTripFeature('BIKE'); // eslint-disable-line
            }
            currentTripLine.geometry.coordinates.push(currentMapPoint.coordinates);
            return [tripLines, currentTripLine];
        },
        [[], null],
    );
    if (currentLine && currentLine.geometry.coordinates.length > 1) {
        return [...lines, currentLine];
    }
    return lines;
};

const smoothLine = (tripLine: TripFeature): TripFeature => {
    if (tripLine.geometry.coordinates.length <= 2) {
        return tripLine;
    }
    return bezierSpline(tripLine, {
        resolution: tripLine.geometry.coordinates.length * 2000,
        sharpness: 0.6,
    });
};

const tripSmoothLineSelector: Selector<TripFeatureCollection> = createSelector(
    pathSelector,
    path => {
        const tripFeatures = {
            type: 'FeatureCollection',
            features: pathToFeatureCollection(path),
        };
        tripFeatures.features = tripFeatures.features.map(smoothLine);
        return tripFeatures;
    },
);

const currentTripLineSelector: Selector<TripFeatureCollection> = createSelector(
    currentPathSelector,
    currentPath => ({
        type: 'FeatureCollection',
        features: pathToFeatureCollection(currentPath),
    }),
);
const currentTripFeaturesSelector: Selector<TripFeatureCollection> = createSelector(
    tripSmoothLineSelector,
    currentTripLineSelector,
    currentPathSelector,
    (smoothTrip, currentTrip, currentPath) => {
        if (!currentTrip.features.length) {
            return currentTrip;
        }
        const lastSmoothLine = smoothTrip.features[currentTrip.features.length - 1];
        const newLastSmoothLine = lineSlice(
            point(lastSmoothLine.geometry.coordinates[0]),
            point(currentPath[currentPath.length - 1].coordinates),
            lastSmoothLine,
        );
        const currentSmoothTrip = {
            ...smoothTrip,
            features: smoothTrip.features.slice(0, currentTrip.features.length),
        };
        currentSmoothTrip.features[currentSmoothTrip.features.length - 1] = newLastSmoothLine;
        return currentSmoothTrip;
    },
);

const mapCenterCoordinatesSelector: Selector<?Coordinates> = createSelector(
    currentPathSelector,
    currentPath =>
        currentPath.length > 0 ? currentPath[currentPath.length - 1].coordinates : null,
);

export default createStructuredSelector({
    currentTripFeatures: currentTripFeaturesSelector,
    mapCenterCoordinates: mapCenterCoordinatesSelector,
});
