// @flow

import { PureComponent } from 'react';
import lineDistance from '@turf/line-distance';
import lineSliceAlong from '@turf/line-slice-along';
import { findIndex, map, scan, add, pipe } from 'ramda';
import type { TripFeatureCollection } from './types';

type Props = {
    onAnimationEnd: () => void,
    children: TripFeatureCollection => React.Node,
    trip: TripFeatureCollection,
};
type State = { distance: ?number };

const ANIMATION_SPEED = 50; // In km/second ?
function easeOutQuad(t, b, c, d) {
    t /= d; // eslint-disable-line
    return -c * t * (t - 2) + b;
}

function tripDistance(trip: TripFeatureCollection): number {
    return trip.features.map(l => lineDistance(l)).reduce(add, 0);
}
function truncateTrip(trip: TripFeatureCollection, distance: ?number): TripFeatureCollection {
    if (!distance) {
        return trip;
    }
    const distances = pipe(map(l => lineDistance(l)), scan(add, 0))(trip.features);
    const index = findIndex(currentDistance => currentDistance >= distance, distances) - 1;
    if (index === -2) {
        console.error('The animated distance cannot exceede the trip length');
        return trip;
    }
    const truncatedTrip = trip.features.slice(0, index); // eslint-disable-line
    const truncatedLastLine = lineSliceAlong(trip.features[index], 0, distance - distances[index]);
    truncatedLastLine.properties = trip.features[index].properties;
    truncatedTrip.push(truncatedLastLine);
    return { ...trip, features: truncatedTrip };
}

class TripAnimation extends PureComponent<Props, State> {
    state: State = {
        distance: null,
    };
    componentWillUpdate({ trip: nextTrip }: Props) {
        const previousTrip = this.props.trip;
        if (previousTrip === nextTrip) {
            return;
        }
        this.setState({ distance: tripDistance(previousTrip) }); // eslint-disable-line
    }
    componentDidUpdate({ trip: previousTrip }: Props) {
        const nextTrip = this.props.trip;
        if (previousTrip === nextTrip) {
            return;
        }
        const [previousTripLength, nextTripLength] = [previousTrip, nextTrip].map(tripDistance);
        const totalAnimatedDistance = nextTripLength - previousTripLength;
        const animationDuration =
            10 * Math.sqrt(Math.abs(totalAnimatedDistance)) / (ANIMATION_SPEED / 1000);
        if (animationDuration < 1) {
            return;
        }
        let start = null;
        const animate = timestamp => {
            if (!start) {
                start = timestamp;
            }
            const distance = easeOutQuad(
                timestamp - start,
                previousTripLength,
                totalAnimatedDistance,
                animationDuration,
            );
            this.setState({ distance });
            if (timestamp - start < animationDuration) {
                this.animationFrame = window.requestAnimationFrame(animate);
            } else {
                this.setState({ distance: null });
                this.props.onAnimationEnd();
            }
        };
        this.animationFrame = window.requestAnimationFrame(animate);
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.animationFrame);
    }
    props: Props;
    render() {
        const newTrip = truncateTrip(this.props.trip, this.state.distance);
        return this.props.children(newTrip);
    }
}

export default TripAnimation;
