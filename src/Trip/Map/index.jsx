import { withStyles } from 'vitaminjs';

import { compose, last } from 'ramda';
import { provideState, injectState, softUpdate } from 'freactal';

import SleepMarker from './SleepMarker';
import { STARTING_POINT, getLine } from './data';
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
const getCoordinates = (sleepLocation) => {
    const { longitude, latitude } = sleepLocation.data['sleep_location.location'].value;
    return [longitude, latitude];
};
const withSleepPoints = provideState({
    initialState: () => ({
        zoom: INITIAL_ZOOM,
    }),
    effects: {
        updateMap: softUpdate((_, map) => ({ zoom: map.getZoom() })),
    },
    computed: {
        displayedSleepPoints: ({ sleepLocations, currentSleepLocation }) =>
            sleepLocations
                .slice(0, sleepLocations.indexOf(currentSleepLocation) + 1)
                .map(getCoordinates),
    },
});

const Map = ({ state: { displayedSleepPoints, currentSleepLocation }, effects: { updateMap } }) =>
    (<Mapbox.Map
        center={last(displayedSleepPoints) || STARTING_POINT}
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
        {currentSleepLocation
            ? <Mapbox.GeoJSONLayer
                data={getLine(getCoordinates(currentSleepLocation))}
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
        {displayedSleepPoints.map(sleepPoint =>
            (<Mapbox.Marker key={sleepPoint.join()} coordinates={sleepPoint} anchor="center">
                <SleepMarker />
            </Mapbox.Marker>),
        )}
    </Mapbox.Map>);
export default compose(withSleepPoints, injectState, withStyles(s))(Map);
