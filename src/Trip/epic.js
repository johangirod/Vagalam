// @flow

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/merge';

import type { ActionsObservable } from 'redux-observable';
import type { Store } from 'redux';
import Prismic from 'prismic.io';

import type { Action, SleepLocationId, PointOfInterestId } from './types';
import type { State } from '../rootTypes';
import { addFetchedPointsOfInterest, addFetchedSleepLocations } from './actions';

const fetchSleepLocationsAfter: (?SleepLocationId) => Observable<Action> = id =>
    Observable.fromPromise(
        Prismic.api('http://vagalam.prismic.io/api')
            .then(api =>
                api.query(Prismic.Predicates.at('document.type', 'sleep_location'), {
                    orderings: '[my.sleep_location.date]',
                    pageSize: 10,
                    after: id,
                }),
            )
            .then(response =>
                response.results.map((apiSleepLocation: any) => {
                    const { longitude, latitude } = apiSleepLocation.data[
                        'sleep_location.location'
                    ].value;
                    const endOfDay = new Date(apiSleepLocation.data['sleep_location.date'].value);
                    endOfDay.setHours(23, 59, 59, 999);
                    return {
                        date: endOfDay,
                        dayNumber: apiSleepLocation.data['sleep_location.day_number'].value,
                        coordinates: [longitude, latitude],
                        id: apiSleepLocation.id,
                        postId: null,
                        type: 'sleep_location',
                    };
                }),
            )
            .then(addFetchedSleepLocations),
    );

const fetchPointOfInterestsAfter: (?PointOfInterestId) => Observable<Action> = id =>
    Observable.fromPromise(
        Prismic.api('http://vagalam.prismic.io/api')
            .then(api =>
                api.query(Prismic.Predicates.at('document.type', 'point_of_interest'), {
                    orderings: '[my.point_of_interest.datetime]',
                    pageSize: 10,
                    after: id,
                }),
            )
            .then(response =>
                response.results.map((apiPointOfInterest: any) => {
                    const { longitude, latitude } = apiPointOfInterest.data[
                        'point_of_interest.location'
                    ].value;
                    return {
                        date: new Date(apiPointOfInterest.data['point_of_interest.datetime'].value),
                        coordinates: [longitude, latitude],
                        id: apiPointOfInterest.id,
                        postId: null,
                        type: 'point_of_interest',
                    };
                }),
            )
            .then(addFetchedPointsOfInterest),
    );

export default function goToNextStep(
    action$: ActionsObservable<Action>,
    store: Store<State, Action>,
): Observable<Action> {
    return action$.ofType('app/trip/GO_TO_NEXT_STEP').startWith('').mergeMap(() => {
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
}
