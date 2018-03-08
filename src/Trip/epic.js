/* @flow */

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/merge';

import Prismic from 'prismic.io';
import { combineEpics } from 'redux-observable';
import { REHYDRATE } from 'redux-persist';
import type { RehydrateAction } from 'redux-persist/src/types';

import postsEpic from './Posts/epic';
import type { Action, SleepLocationId, PointOfInterestId, TransportId, MapPointId } from './types';
import type { Epic } from '../rootTypes';
import {
    addFetchedPointsOfInterest,
    addFetchedSleepLocations,
    addFetchedTransports,
} from './actions';

const fetchMapPoints = (type: string, ordering: string, id: ?MapPointId): Observable<Object> =>
    Observable.fromPromise(
        Prismic.api('https://vagalam.prismic.io/api').then(api =>
            api.query(Prismic.Predicates.at('document.type', type), {
                orderings: `[my.${type}.${ordering}]`,
                pageSize: 10,
                after: id,
            }),
        ),
    ).map((response: Object) =>
        response.results.map(apiMapPoint => ({ ...apiMapPoint.data, id: apiMapPoint.id })),
    );

function getPostId(type: string, apiResponse: any, postKeyName: string = 'post'): ?string {
    const post = apiResponse[`${type}.${postKeyName}`];
    return post ? post.value.document.id : null;
}

const toArrayCoordinate = ({
    longitude,
    latitude,
}: {
    longitude: string,
    latitude: string,
}): [string, string] => [longitude, latitude];

// TODO: SLEEP LOCATION DATE CAN BE DURING THE FOLLOWING DAY IF I SLEPT AT 3 PM
// TODO: WHAT ABOUT TIMEZONE??????s
const fetchSleepLocationsAfter: (?SleepLocationId) => Observable<Action> = id =>
    fetchMapPoints('sleep_location', 'date', id)
        .map(results =>
            results.map(result => {
                const endOfDay = new Date(result['sleep_location.date'].value);
                endOfDay.setHours(23, 59, 59, 999);
                return {
                    date: endOfDay.toISOString(),
                    dayNumber: result['sleep_location.day_number'].value,
                    coordinates: toArrayCoordinate(result['sleep_location.location'].value),
                    id: result.id,
                    postId: getPostId('sleep_location', result),
                    type: 'sleep_location',
                };
            }),
        )
        .map(addFetchedSleepLocations);

const fetchPointOfInterestsAfter: (?PointOfInterestId) => Observable<Action> = id =>
    fetchMapPoints('point_of_interest', 'datetime', id)
        .map(results =>
            results.map(result => ({
                date: result['point_of_interest.datetime'].value,
                coordinates: toArrayCoordinate(result['point_of_interest.location'].value),
                id: result.id,
                postId: getPostId('point_of_interest', result),
                type: 'point_of_interest',
            })),
        )
        .map(addFetchedPointsOfInterest);

const fetchTransportsAfter: (?TransportId) => Observable<Action> = id =>
    fetchMapPoints('transport', 'start_datetime', id)
        .map(results =>
            results
                .map(result => {
                    if (
                        result['transport.start_datetime'].value >
                        result['transport.end_datetime'].value
                    ) {
                        console.error(
                            'API error: transport start date in ulterior to its end date',
                            result,
                        );
                        return [];
                    }
                    const baseTransport = {
                        id: result.id,
                        type: 'transport',
                        transportType: result['transport.type'].value.toUpperCase(),
                    };
                    const startTransport = {
                        date: result['transport.start_datetime'].value,
                        coordinates: toArrayCoordinate(result['transport.start_location'].value),
                        status: 'start',
                        postId: getPostId('transport', result, 'begin_post'),
                        ...baseTransport,
                    };
                    const endTransport = {
                        date: result['transport.end_datetime'].value,
                        coordinates: toArrayCoordinate(result['transport.end_location'].value),
                        status: 'end',
                        postId: getPostId('transport', result, 'end_post'),
                        ...baseTransport,
                    };
                    return [startTransport, endTransport];
                })
                .reduce((arr, transports) => [...arr, ...transports], []),
        )
        .map(addFetchedTransports);

const goToNextStepEpic: Epic<Action | RehydrateAction> = (action$, store) =>
    Observable.merge(
        action$.ofType('app/trip/GO_TO_NEXT_STEP'),
        action$.ofType(REHYDRATE).filter(action => action.key === 'app::trip'),
    ).mergeMap(() => {
        const {
            currentMapPoint,
            fetchingStatus: { sleepLocations, pointsOfInterest, transports },
        } = store.getState().app.trip;
        const currentMapPointId = currentMapPoint && currentMapPoint.id;
        const request$Array = [];
        if (sleepLocations.nextFetchTrigger === currentMapPointId) {
            request$Array.push(fetchSleepLocationsAfter(sleepLocations.lastFetchedId));
        }
        if (pointsOfInterest.nextFetchTrigger === currentMapPointId) {
            request$Array.push(fetchPointOfInterestsAfter(pointsOfInterest.lastFetchedId));
        }
        if (transports.nextFetchTrigger === currentMapPointId) {
            request$Array.push(fetchTransportsAfter(transports.lastFetchedId));
        }
        return Observable.merge(...request$Array);
    });

export default combineEpics(goToNextStepEpic, postsEpic);
