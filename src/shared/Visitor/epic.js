// @flow

import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { ajaxPost } from 'rxjs/observable/dom/AjaxObservable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/filter';

import type { Epic } from '../../rootTypes';
import type { Action } from './types';
import { emailSelector } from './selectors';

const suscribeEpic: Epic<Action> = $action =>
    $action
        .ofType('app/visitor/SUBSCRIBE')
        .mergeMap(({ email }) => ajaxPost(`/on_visitor_suscribe/${encodeURIComponent(email)}`))
        .filter(() => false);

const updateEmailPreferenceEpic: Epic<Action> = ($action, store) => $action
        .ofType('app/visitor/UPDATE_EMAIL_PREFERENCE')
        .mergeMap(({ emailPreference }) => {
            const email = emailSelector(store.getState());
            if (!email) {
                return Observable.empty();
            }
            return ajaxPost(
                `/on_visitor_preference_update/${encodeURIComponent(email)}/${encodeURIComponent(
                    emailPreference,
                )}`,
            );
        })
        .filter(() => false);
export default combineEpics(suscribeEpic, updateEmailPreferenceEpic);
