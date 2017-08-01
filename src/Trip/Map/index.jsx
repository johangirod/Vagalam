/* @flow */

import type { LineString2D } from 'flow-geojson';

import { withStyles } from 'vitaminjs';
import { Component } from 'react';
import lineDistance from '@turf/line-distance';
import lineSliceAlong from '@turf/line-slice-along';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { compose, last } from 'ramda';
import { provideState, injectState, softUpdate } from 'freactal';
import selectors from './selectors';
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

const INITIAL_ZOOM = [9];
const withMapZoomControl = provideState({
    initialState: () => ({
        zoom: INITIAL_ZOOM,
    }),
    effects: {
        updateMap: softUpdate((_, map) => ({ zoom: map.getZoom() })),
    },
});
type PropType = {
    displayedTripLineString: ?LineString2D,
    currentPath: Array<MapPoint>,
    onAnimationEnd: () => void,
    onAnimationStart: () => void,
};
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMapCurrentlyAnimated: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (
            nextProps.currentPath &&
            this.props.currentPath &&
            this.props.currentPath.length !== nextProps.currentPath.length
        ) {
            this.setState({ isMapCurrentlyAnimated: true });
            this.props.onAnimationStart();
        }
    }
    handleAnimatonEnd = () => {
        this.setState({ isMapCurrentlyAnimated: false });
        this.props.onAnimationEnd();
    };
    props: PropType;
    render() {
        const { effects: { updateMap }, displayedTripLineString, currentPath } = this.props;
        const currentMapPoint = last(currentPath);
        return (
            <Mapbox.Map
                center={currentMapPoint ? currentMapPoint.coordinates : [2.3738311, 48.8841141]}
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
                        onRest={this.handleAnimatonEnd}
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
                {currentPath
                    .slice(0, this.state.isMapCurrentlyAnimated ? -1 : currentPath.length)
                    .map(mapPoint =>
                        (<Mapbox.Marker
                            key={mapPoint.coordinates.join()}
                            coordinates={mapPoint.coordinates}
                            anchor="center"
                        >
                            <MapPointMarker type={mapPoint.type} />
                        </Mapbox.Marker>),
                    )}
            </Mapbox.Map>
        );
    }
}

export default compose(withMapZoomControl, injectState, connect(selectors), withStyles(s))(Map);
