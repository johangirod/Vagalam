import Helmet from 'vitaminjs/react-helmet';
import { Component } from 'react';
import { withStyles } from 'vitaminjs'; 

import veloscenie from '../bike_roads/veloscenie.json'
import ev4 from '../bike_roads/ev4.json'
import s from './style.css';

class Map extends Component {
    componentDidMount() {
        // Only work client side
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); 
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FuY2VhYiIsImEiOiJjajQ0OHZjZzgxOGY3MndzOTh6YTFjbmNyIn0.0pHsI5xrBMh9YMftXmLQKw';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-streets-v10',
            zoom: 6,
            center: [2.35, 48.853],
        });
        map.on('load', () => {
            map.addLayer({
                id: 'veloscenie',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: veloscenie,
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#2067d8',
                    'line-width': 5,
                },
            });
            map.addLayer({
                id: 'ev4',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: ev4,
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': 'red',
                    'line-width': 5,
                },
            });
        });
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

export default withStyles(s)(Map);