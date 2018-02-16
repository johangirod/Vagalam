/* @flow */

import { withStyles } from 'vitaminjs';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';

// Todo remove freactal
import { provideState, injectState, update } from 'freactal';
import selectors from './selectors';
import { notifyAnimationEnd } from '../actions';
import type { Coordinates } from '../types';
import type { TripFeatureCollection } from './types';
import s from './style.css';
import config from '../../config';

let Mapbox = new Proxy(
    {},
    {
        get: (target, name) => target[name] || (() => null),
    },
);

if (IS_CLIENT) {
    // eslint-disable-next-line global-require
    Mapbox = require('react-mapbox-gl');
    Mapbox.Map = Mapbox.default({
        accessToken: config.mapboxAccessToken,
    });
}

const INITIAL_ZOOM = [8];
const STYLE_URL = 'mapbox://styles/ganceab/cj60tjdxq0asi2rppfum27wau';
const withMapZoomControl = provideState({
    initialState: () => ({
        zoom: INITIAL_ZOOM,
    }),
    effects: {
        updateMap: update((_, map) => ({ zoom: map.getZoom() })),
    },
});
type PropType = {
    currentTripFeatures: TripFeatureCollection,
    mapCenterCoordinates: ?Coordinates,
    effects: any,
};
class Map extends PureComponent<PropType> {
    props: PropType;

    render() {
        const { effects: { updateMap }, currentTripFeatures, mapCenterCoordinates } = this.props;

        console.log(mapCenterCoordinates, currentTripFeatures);
        return (
            !!mapCenterCoordinates && (
                <Mapbox.Map
                    center={mapCenterCoordinates}
                    containerStyle={{
                        height: '100%',
                        backgroundColor: '#2d2f32',
                    }}
                    zoom={INITIAL_ZOOM}
                    mapboxApiAccessToken={config.mapboxAccessToken}
                    style={STYLE_URL}
                    onMove={updateMap}
                    onStyleLoad={updateMap}
                    movingMethod="easeTo"
                    animationOptions={{
                        ease: 1,
                        duration: 1000,
                    }}
                >
                    {' '}
                    <Mapbox.GeoJSONLayer
                        data={currentTripFeatures}
                        lineLayout={{
                            'line-join': 'round',
                            'line-cap': 'round',
                        }}
                        linePaint={{
                            'line-color': '#fdfaf2',
                            'line-opacity': 0.8,
                            'line-width': 2,
                        }}
                    />
                </Mapbox.Map>
            )
        );
    }
}

export default compose(
    withMapZoomControl,
    injectState,
    connect(selectors, {
        onAnimationEnd: notifyAnimationEnd,
    }),
    withStyles(s),
)(Map);
