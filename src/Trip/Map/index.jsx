// @flow
import type { LineString2D } from 'flow-geojson';

import { withStyles } from 'vitaminjs';
import lineDistance from '@turf/line-distance';
import lineSliceAlong from '@turf/line-slice-along';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { compose, last } from 'ramda';
import { provideState, injectState, softUpdate } from 'freactal';
import selectors from './selectors';
import type { SleepLocation } from '../types';
import SleepMarker from './SleepMarker';
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

const INITIAL_ZOOM = [10];
const withMapZoomControl = provideState({
    initialState: () => ({
        zoom: INITIAL_ZOOM,
    }),
    effects: {
        updateMap: softUpdate((_, map) => ({ zoom: map.getZoom() })),
    },
});

const Map = ({
    effects: { updateMap },
    displayedTripLineString,
    displayedSleepLocations,
}: {
    displayedTripLineString: ?LineString2D,
    displayedSleepLocations: Array<SleepLocation>,
}) =>
    (<Mapbox.Map
        center={
            displayedSleepLocations.length
                ? last(displayedSleepLocations).coordinates
                : [2.3738311, 48.8841141]
        }
        containerStyle={{
            height: '100%',
        }}
        zoom={INITIAL_ZOOM}
        mapboxApiAccessToken={config.mapboxAccessToken}
        style="mapbox://styles/mapbox/satellite-v9"
        onMove={updateMap}
        onStyleLoad={updateMap}
        movingMethod="easeTo"
    >
        {displayedTripLineString
            ? <Motion
                defaultStyle={{ distance: 0 }}
                style={{
                    distance: spring(lineDistance(displayedTripLineString), {
                        stiffness: 42,
                        damping: 19,
                        precision: 1,
                    }),
                }}
            >
                {({ distance }) =>
                      distance > 0
                          ? <Mapbox.GeoJSONLayer
                              data={lineSliceAlong(displayedTripLineString, 0, distance)}
                              lineLayout={{
                                  'line-join': 'round',
                                  'line-cap': 'round',
                              }}
                              linePaint={{
                                  'line-color': 'white',
                                  'line-opacity': 0.8,
                                  'line-width': 2,
                              }}
                          />
                          : null}
            </Motion>
            : null}
        {displayedSleepLocations.map(sleepLocation =>
            (<Mapbox.Marker
                key={sleepLocation.coordinates.join()}
                coordinates={sleepLocation.coordinates}
                anchor="center"
            >
                <SleepMarker />
            </Mapbox.Marker>),
        )}
    </Mapbox.Map>);

export default compose(withMapZoomControl, injectState, connect(selectors), withStyles(s))(Map);
