/* @flow */

import { createSelector, createStructuredSelector } from 'reselect';
import bezierSpline from '@turf/bezier-spline';

import type { TransportTypes, MapPoint, Coordinates } from '../types';
import type { TripFeature, TripFeatureCollection } from './types';
import { currentPathSelector } from '../selectors';
import type { Selector } from '../../rootTypes';

const newTripFeature = (transportType?: TransportTypes): TripFeature => ({
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: [],
    },
    property: {
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
                    ...(currentMapPoint.status === 'start' ? [currentMapPoint.transportType] : []),
                );
                if (!currentTripLine) {
                    return [tripLines, currentTripLine];
                }
                currentTripLine.geometry.coordinates.push(currentMapPoint.coordinates);
                newTripLine.geometry.coordinates = [currentMapPoint.coordinates];
                return [[...tripLines, currentTripLine], newTripLine];
            }
            if (!currentTripLine) {
                currentTripLine = newTripFeature(); // eslint-disable-line
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
const currentTripFeaturesSelector: Selector<TripFeatureCollection> = createSelector(
    currentPathSelector,
    path => {
        const tripFeatures = {
            type: 'FeatureCollection',
            features: pathToFeatureCollection(path),
        };
        tripFeatures.features = tripFeatures.features.map(smoothLine);
        return tripFeatures;
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
