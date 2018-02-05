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
import type { Action, SleepLocationId, PointOfInterestId, MapPointId } from './types';
import type { Epic } from '../rootTypes';
import { addFetchedPointsOfInterest, addFetchedSleepLocations } from './actions';

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

const getPostId: (string, any) => ?string = (type, apiResponse) => {
    const post = apiResponse[`${type}.post`];
    return post ? post.value.document.id : null;
};

const fetchSleepLocationsAfter: (?SleepLocationId) => Observable<Action> = id =>
    fetchMapPoints('sleep_location', 'date', id)
        .map(results =>
            results.map(result => {
                const { longitude, latitude } = result['sleep_location.location'].value;
                const endOfDay = new Date(result['sleep_location.date'].value);
                endOfDay.setHours(23, 59, 59, 999);
                return {
                    date: endOfDay.toISOString(),
                    dayNumber: result['sleep_location.day_number'].value,
                    coordinates: [longitude, latitude],
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
            results.map(result => {
                const { longitude, latitude } = result['point_of_interest.location'].value;
                return {
                    date: result['point_of_interest.datetime'].value,
                    coordinates: [longitude, latitude],
                    id: result.id,
                    postId: getPostId('point_of_interest', result),
                    type: 'point_of_interest',
                };
            }),
        )
        .map(addFetchedPointsOfInterest);

const goToNextStepEpic: Epic<Action | RehydrateAction> = (action$, store) =>
    Observable.merge(
        action$.ofType('app/trip/GO_TO_NEXT_STEP'),
        action$.ofType(REHYDRATE).filter(action => action.key === 'app::trip'),
    ).mergeMap(() => {
        const {
            currentMapPointId,
            fetchingStatus: { sleepLocations, pointsOfInterest },
        } = store.getState().app.trip;
        const request$Array = [];
        if (sleepLocations.nextFetchTrigger === currentMapPointId) {
            request$Array.push(fetchSleepLocationsAfter(sleepLocations.lastFetchedId));
        }
        if (pointsOfInterest.nextFetchTrigger === currentMapPointId) {
            request$Array.push(fetchPointOfInterestsAfter(pointsOfInterest.lastFetchedId));
        }
        return Observable.merge(...request$Array);
    });

export default combineEpics(goToNextStepEpic, postsEpic);
