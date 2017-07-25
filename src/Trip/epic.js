// @flow

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/exhaust';
import 'rxjs/add/observable/fromPromise';

import type { ActionsObservable } from 'redux-observable';
import type { Store } from 'redux';
import { last } from 'ramda';
import Prismic from 'prismic.io';
import type { PredicateQuery } from 'prismic.io';

import type { Action, SleepLocation } from './types';
import type { State } from '../rootTypes';
import { addSleepLocations } from './actions';
import {} from './types';

const TRIP_FIRST_DAY = new Date(2017, 4, 28);

const fetchSleepLocationsAfter: Date => Observable<Array<SleepLocation>> = date =>
    Observable.fromPromise(
        Prismic.api('http://vagalam.prismic.io/api')
            .then(api =>
                api.query(
                    ([
                        Prismic.Predicates.at('document.type', 'sleep_location'),
                        Prismic.Predicates.dateAfter('my.sleep_location.date', date),
                    ]: Array<PredicateQuery>),
                    { orderings: '[my.sleep_location.date]', pageSize: 10 },
                ),
            )
            .then(response =>
                response.results.map((apiSleepLocation) => {
                    const { longitude, latitude } = apiSleepLocation.data[
                        'sleep_location.location'
                    ].value;
                    return {
                        date: new Date(apiSleepLocation.data['sleep_location.date'].value),
                        dayNumber: apiSleepLocation.data['sleep_location.day_number'].value,
                        coordinates: [longitude, latitude],
                    };
                }),
            ),
    );

export default function goToNextDay(
    action$: ActionsObservable<Action>,
    store: Store<State, Action>,
): Observable<Action> {
    return action$
        .ofType('app/trip/GO_TO_NEXT_SLEEP_LOCATION')
        .map(() => {
            const { sleepLocations, currentSleepLocationIndex } = store.getState().app.trip;
            const lastSleepLocation = last(sleepLocations);
            if (lastSleepLocation && currentSleepLocationIndex >= sleepLocations.length - 1) {
                return fetchSleepLocationsAfter(lastSleepLocation.date);
            }
            return null;
        })
        .filter(Boolean)
        .startWith(fetchSleepLocationsAfter(TRIP_FIRST_DAY))
        .exhaust()
        .map(addSleepLocations);
}
