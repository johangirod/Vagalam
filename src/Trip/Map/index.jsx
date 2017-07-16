import Helmet from 'vitaminjs/react-helmet';
import { Component } from 'react';
import { withStyles } from 'vitaminjs'; 
import convert from 'color-convert';
import { compose } from 'ramda';
import { point } from '@turf/helpers';
import { provideState, injectState } from 'freactal';

import { getStepLines } from './data';
import s from './style.css';

const withStepLines = provideState({
    computed: {
        stepLines: ({ sleepLocations, currentSleepLocation }) => 
            currentSleepLocation && getStepLines(sleepLocations
                .slice(0, sleepLocations.indexOf(currentSleepLocation))
                .map(sleepLocation => {
                    const { longitude, latitude } = sleepLocation.data['sleep_location.location'].value;
                    return point([longitude, latitude]);
                })
            )
    }
})

const printStepLines = (map, stepLines) => {
    if (!stepLines) {
        return;
    }
    map.eachLayer && map.eachLayer(layer => 
        map.removeLayer(layer)
    );
    stepLines.map((stepLine, i) => map.addLayer({
        id: `step-${Math.random()}`,
        type: 'line',
        source: {
            type: 'geojson',
            data: stepLine,
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-width': 5,
            'line-color': `#${convert.hsl.hex(360*i/stepLines.length, 100, 50)}`,
        },
    }));
};

class Map extends Component {
    componentDidMount() {
        // Only work client side
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); 
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FuY2VhYiIsImEiOiJjajQ0OHZjZzgxOGY3MndzOTh6YTFjbmNyIn0.0pHsI5xrBMh9YMftXmLQKw';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-streets-v10',
            zoom: 6,
            center: [2.35, 48.853],
        });
        printStepLines(this.map, this.props.state.stepLines);
    }
    componentWillReceiveProps(nextProps) {
        printStepLines(this.map, nextProps.state.stepLines);
    }
    render() { 
        return (
            <div id='map' className={s.map} onKeyDown={this.handleKeyDown}>
                <Helmet 
                    link={[{ href: 'https://api.mapbox.com/mapbox-gl-js/v0.38.0/mapbox-gl.css', rel: 'stylesheet' }]} 
                />
            </div>
        );
    }
}

export default compose(
    withStepLines, 
    injectState,    
    withStyles(s)
)(Map);