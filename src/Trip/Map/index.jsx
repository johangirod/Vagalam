import { withStyles } from 'vitaminjs';

import { compose, last } from 'ramda';
import { provideState, injectState, softUpdate } from 'freactal';

import SleepMarker from './SleepMarker';
import { STARTING_POINT } from './data';
import s from './style.css';
import config from '../../config';

const Mapbox = new Proxy(
    {},
    {
        get: (target, name) => target[name] || (() => null),
    },
);

if (IS_CLIENT) {
    // eslint-disable-next-line global-require
    const { default: ReactMapboxGl, Marker } = require('react-mapbox-gl');
    Mapbox.Map = ReactMapboxGl({
        accessToken: config.mapboxAccessToken,
    });
    Mapbox.Marker = Marker;
}

const INITIAL_ZOOM = [10];
const withSleepPoints = provideState({
    initialState: () => ({
        zoom: INITIAL_ZOOM,
    }),
    effects: {
        updateMap: softUpdate((_, map) => ({ zoom: map.getZoom() })),
    },
    computed: {
        displayedSleepPoints: ({ sleepLocations, currentSleepLocation }) =>
            console.log(sleepLocations) ||
            sleepLocations
                .slice(0, sleepLocations.indexOf(currentSleepLocation) + 1)
                .map((sleepLocation) => {
                    const { longitude, latitude } = sleepLocation.data[
                        'sleep_location.location'
                    ].value;
                    return [longitude, latitude];
                }),
    },
});

const Map = ({ state: { displayedSleepPoints }, effects: { updateMap } }) =>
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
        {displayedSleepPoints.map(sleepPoint =>
            (<Mapbox.Marker key={sleepPoint.join()} coordinates={sleepPoint} anchor="center">
                <SleepMarker />
            </Mapbox.Marker>),
        )}
    </Mapbox.Map>);
export default compose(withSleepPoints, injectState, withStyles(s))(Map);
