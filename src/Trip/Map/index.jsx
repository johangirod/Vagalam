/* @flow */

import type { LineString2D } from 'flow-geojson';

import { withStyles } from 'vitaminjs';
import { Component } from 'react';
import lineDistance from '@turf/line-distance';
import lineSliceAlong from '@turf/line-slice-along';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { compose, last } from 'ramda';
import { provideState, injectState, update } from 'freactal';
import selectors from './selectors';
import { notifyAnimationEnd } from '../actions';
import type { MapPoint } from '../types';
import MapPointMarker from './MapPointMarker';
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
    displayedTripLineString: ?LineString2D,
    currentPath: Array<MapPoint>,
    style: ?{ [string]: string | 0 },
    onAnimationEnd: () => void,
};
class Map extends Component {
    static defaultProps = {
        style: {},
    };
    constructor(props) {
        super(props);
        this.state = {
            mapAnimation: null,
        };
    }
    state: {
        mapAnimation: 'FORWARD' | 'BACKWARD' | null,
    };
    componentWillReceiveProps(nextProps) {
        if (!nextProps.currentPath || !this.props.currentPath) {
            return;
        }
        if (this.props.currentPath.length < nextProps.currentPath.length) {
            this.setState({ mapAnimation: 'FORWARD' });
        }
        if (this.props.currentPath.length > nextProps.currentPath.length) {
            this.setState({ mapAnimation: 'BACKWARD' });
        }
    }
    handleAnimationEnd = () => {
        this.setState({ mapAnimation: null });
        // Waiting for marker to appear
        setTimeout(this.props.onAnimationEnd, 300);
    };
    props: PropType;

    render() {
        const { effects: { updateMap }, displayedTripLineString, currentPath, style } = this.props;
        const currentMapPoint = last(currentPath);
        return (
            <Mapbox.Map
                center={currentMapPoint ? currentMapPoint.coordinates : [2.3738311, 48.8841141]}
                containerStyle={{
                    height: '100%',
                    backgroundColor: 'black',
                    ...style,
                }}
                zoom={INITIAL_ZOOM}
                mapboxApiAccessToken={config.mapboxAccessToken}
                style={STYLE_URL}
                onMove={updateMap}
                onStyleLoad={updateMap}
                movingMethod="easeTo"
            >
                {displayedTripLineString ? (
                    <Motion
                        defaultStyle={{ distance: 0 }}
                        style={{
                            distance: spring(lineDistance(displayedTripLineString), {
                                stiffness: 170,
                                damping: 55,
                                precision: 1,
                            }),
                        }}
                        onRest={this.handleAnimationEnd}
                    >
                        {({ distance }) => distance > 0 ? (
                                <Mapbox.GeoJSONLayer
                                    data={lineSliceAlong(displayedTripLineString, 0, distance)}
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
                            ) : null}
                    </Motion>
                ) : null}
                {currentPath
                    .slice(0, this.state.mapAnimation === 'FORWARD' ? -1 : currentPath.length)
                    .map(mapPoint => (
                        <Mapbox.Marker
                            key={mapPoint.coordinates.join()}
                            coordinates={mapPoint.coordinates}
                            anchor="center"
                        >
                            <MapPointMarker type={mapPoint.type} />
                        </Mapbox.Marker>
                    ))}
            </Mapbox.Map>
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
