/* @flow */

import { withStyles } from 'vitaminjs';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';

// Todo remove freactal
import { provideState, injectState, update } from 'freactal';
import TripAnimation from './TripAnimation';
import selectors from './selectors';
import { notifyAnimationEnd } from '../actions';
import type { Coordinates } from '../types';
import type { TripFeatureCollection } from './types';
import s from './style.css';
import Mapbox from './Mapbox';
import TripLayer from './TripLayer';

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
    onAnimationEnd: () => void,
    mapCenterCoordinates: ?Coordinates,
    effects: any,
};

class Map extends PureComponent<PropType> {
    props: PropType;

    render() {
        const {
            effects: { updateMap },
            currentTripFeatures,
            mapCenterCoordinates,
            onAnimationEnd,
        } = this.props;
        return (
            !!mapCenterCoordinates && (
                <Mapbox.Map
                    center={mapCenterCoordinates}
                    containerStyle={{
                        height: '100%',
                        backgroundColor: '#2d2f32',
                    }}
                    zoom={INITIAL_ZOOM}
                    style={STYLE_URL}
                    onMove={updateMap}
                    onStyleLoad={updateMap}
                    movingMethod="easeTo"
                    animationOptions={{
                        ease: 1,
                        duration: 1000,
                    }}
                >
                    <TripAnimation trip={currentTripFeatures} onAnimationEnd={onAnimationEnd}>
                        {(trip, animatedTrip) => (
                            <div>
                                <TripLayer data={trip} id="static-trip" />
                                {animatedTrip && (
                                    <TripLayer data={animatedTrip} id="animated-trip" />
                                )}
                            </div>
                        )}
                    </TripAnimation>
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
