import { withStyles } from 'vitaminjs';

import { compose } from 'ramda';
import { point } from '@turf/helpers';
import { provideState, injectState } from 'freactal';

import { STARTING_POINT } from './data';
import s from './style.css';
import config from '../../config';

let MapboxMap = () => null;
if (IS_CLIENT) {
    const { default: ReactMapboxGl, Layer, Feature } = require('react-mapbox-gl');
    MapboxMap = ReactMapboxGl({
        accessToken: config.mapboxAccessToken,
    });
}

const withStepLines = provideState({
    computed: {
        displayedSleepPoints: ({ sleepLocations, currentSleepLocation }) =>
            currentSleepLocation &&
            sleepLocations
                .slice(0, sleepLocations.indexOf(currentSleepLocation))
                .map((sleepLocation) => {
                    const { longitude, latitude } = sleepLocation.data[
                        'sleep_location.location'
                    ].value;
                    return point([longitude, latitude]);
                }),
    },
});

const INITIAL_ZOOM = [14];
console.log(MapboxMap);

const Map = () =>
  (<MapboxMap
    center={STARTING_POINT}
    containerStyle={{
        height: '100%',
    }}
    zoom={INITIAL_ZOOM}
    mapboxApiAccessToken={config.mapboxAccessToken}
    style="mapbox://styles/mapbox/satellite-streets-v10"
  />);
export default compose(withStepLines, injectState, withStyles(s))(Map);
