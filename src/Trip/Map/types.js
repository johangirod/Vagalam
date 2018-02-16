// @flow

import type { Coordinates, TransportTypes } from '../types';

export type TripFeature = {
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: Array<Coordinates>,
    },
    properties: {
        transportType: TransportTypes | 'BIKE',
    },
};

export type TripFeatureCollection = {
    type: 'FeatureCollection',
    features: Array<TripFeature>,
};
