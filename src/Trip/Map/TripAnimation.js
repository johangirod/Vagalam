// @flow

import { PureComponent } from 'react';
import lineDistance from '@turf/line-distance';
import lineSliceAlong from '@turf/line-slice-along';
import { takeLast, findIndex, map, scan, add, pipe, equals } from 'ramda';
import type { TripFeatureCollection } from './types';

type Props = {
    onAnimationEnd: () => void,
    children: (TripFeatureCollection, ?TripFeatureCollection) => React.Node,
    trip: TripFeatureCollection,
};
type State = {
    distance: ?number,
    animatedTrip: ?TripFeatureCollection,
    staticTrip: ?TripFeatureCollection,
    animationIsPending: boolean,
};

const ANIMATION_SPEED = 40; // In km/second ?
function easeOutQuad(t, b, c, d) {
    t /= d; // eslint-disable-line
    return -c * t * (t - 2) + b;
}

function tripDistance(trip: TripFeatureCollection): number {
    return trip.features.map(l => lineDistance(l)).reduce(add, 0);
}

function tripDifference(
    shorterTrip: TripFeatureCollection,
    longerTrip: TripFeatureCollection,
): TripFeatureCollection {
    const newTrip = { type: 'FeatureCollection', features: [] };
    const shorterTripLength = shorterTrip.features.length;
    if (shorterTripLength === 0) {
        return longerTrip;
    }
    if (!longerTrip.features.length || longerTrip.features.length < shorterTripLength) {
        console.error('shorterTrip must be longer than longerTrip');
        return newTrip;
    }
    const tripEnding = longerTrip.features.slice(shorterTripLength);
    const [longerLine, shorterLine] = [longerTrip, shorterTrip].map(
        trip => trip.features[shorterTripLength - 1].geometry.coordinates,
    );

    const newLine = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: takeLast(longerLine.length - shorterLine.length + 1, longerLine),
        },
        properties: longerTrip.features[shorterTripLength - 1].properties,
    };
    newTrip.features = [newLine, ...tripEnding];
    return newTrip;
}

function truncateTrip(trip: TripFeatureCollection, distance: number): TripFeatureCollection {
    if (distance === 0) {
        return { type: 'FeatureCollection', features: [] };
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
        animatedTrip: null,
        animationIsPending: false,
        staticTrip: null,
    };
    componentWillReceiveProps({ trip: nextTrip }: Props) {
        const previousTrip = this.props.trip;
        if (previousTrip === nextTrip || equals(previousTrip, nextTrip)) {
            return;
        }
        if (navigator.userAgent.indexOf('Firefox') !== -1) {
            // Firefox is behind in term of mapbox
            setTimeout(() => this.props.onAnimationEnd(), 1700);
            return;
        }
        window.cancelAnimationFrame(this.animationFrame);
        const distance = tripDistance(nextTrip) - tripDistance(previousTrip);
        const duration = 10 * Math.sqrt(Math.abs(distance)) / (ANIMATION_SPEED / 1000);
        if (duration < 1) {
            return;
        }
        const [animatedTrip, staticTrip] =
            distance > 0
                ? [tripDifference(previousTrip, nextTrip), previousTrip]
                : [tripDifference(nextTrip, previousTrip), nextTrip];
        const animatedTripLength =
            distance > 0 ? tripDistance(animatedTrip) : -tripDistance(animatedTrip);
        if (
            process.env.NODE_ENV !== 'production' &&
            (Math.abs(distance) + 1 < tripDistance(animatedTrip) ||
                Math.abs(distance) - 1 > tripDistance(animatedTrip))
        ) {
            console.error(
                "The difference in the trip's distances should be equal to the distance of the trip difference",
                distance,
                tripDistance(animatedTrip),
            );
        }
        this.setState({
            staticTrip,
            animatedTrip,
            distance: animatedTripLength > 0 ? 0 : Math.abs(animatedTripLength),
            animationIsPending: true,
        });
        let start = null;
        const animate = timestamp => {
            if (!start) {
                start = timestamp;
            }
            const currentDistance = easeOutQuad(
                timestamp - start,
                animatedTripLength > 0 ? 0 : Math.abs(animatedTripLength),
                animatedTripLength,
                duration,
            );
            this.setState({ distance: currentDistance });
            if (timestamp - start < duration) {
                this.animationFrame = window.requestAnimationFrame(animate);
            } else {
                this.setState({ animationIsPending: false });
            }
        };
        this.animationFrame = window.requestAnimationFrame(animate);
    }
    componentDidUpdate(_, previousState: State) {
        if (previousState.animationIsPending && !this.state.animationIsPending) {
            this.props.onAnimationEnd();
        }
    }
    componentWillUnmount() {
        window.cancelAnimationFrame(this.animationFrame);
    }

    props: Props;
    render() {
        const { staticTrip, animatedTrip, distance } = this.state;
        if (!staticTrip || !animatedTrip || !distance) {
            return this.props.children(this.props.trip, {
                type: 'FeatureCollection',
                features: [],
            });
        }
        return this.props.children(staticTrip, truncateTrip(animatedTrip, distance));
    }
}

export default TripAnimation;
