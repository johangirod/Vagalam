// @flow

import type { Coordinates, TransportTypes } from '../types';

export type TripFeature = {
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: Array<Coordinates>,
    },
    property: {
        transportType?: TransportTypes,
    },
};

export type TripFeatureCollection = {
    type: 'FeatureCollection',
    features: Array<TripFeature>,
};
