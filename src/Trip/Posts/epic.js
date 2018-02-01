/* @flow */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/bufferTime';
import { combineEpics } from 'redux-observable';

import Prismic from 'prismic.io';
import PrismicDOM from 'prismic-dom';
import { last } from 'ramda';
import type { Epic } from '../../rootTypes';
import type { Action, Post } from './types';
import { currentPostSelector } from './selectors';
import type { PostId } from '../types';
import { addFetchedPosts } from './actions';
import { goToNextStep } from '../actions';

// @todo : add srcset
const proxyWithCloudinary = pictureUrl =>
    `https://res.cloudinary.com/vagalam/image/fetch/h_1080/${pictureUrl}`;

function fetchPosts(postIds: Array<PostId>): Observable<Array<Post>> {
    return Observable.fromPromise(
        Prismic.api('https://vagalam.prismic.io/api').then(api =>
            api.query(Prismic.Predicates.in('document.id', postIds), {}),
        ),
    )
        .map(response => response.results)
        .map(postsApi =>
            postsApi.map(postApi => ({
                id: postApi.id,
                type: postApi.data['post.content'] ? 'Article' : 'Gallery',
                title:
                    postApi.data['post.title'] &&
                    PrismicDOM.RichText.asText(postApi.data['post.title'].value),
                content:
                    postApi.data['post.content'] &&
                    PrismicDOM.RichText.asHtml(postApi.data['post.content'].value),
                pictures: postApi.data['post.pictures']
                    ? postApi.data['post.pictures'].value.map(value => ({
                          url: proxyWithCloudinary(value.picture.value.main.url),
                          caption: value.caption && PrismicDOM.RichText.asText(value.caption.value),
                      }))
                    : [],
            })),
        );
}

const fetchPostsEpic: Epic<Action> = $action =>
    Observable.merge(
        $action
            .ofType('app/trip/ADD_FETCHED_SLEEP_LOCATIONS')
            .map(({ sleepLocations }) => sleepLocations),
        $action
            .ofType('app/trip/ADD_FETCHED_POINTS_OF_INTEREST')
            .map(({ pointsOfInterest }) => pointsOfInterest),
    )
        .mergeMap(resources => Observable.of(...resources.map(({ postId }) => postId)))
        .filter(Boolean)
        // $FlowFixMe: rxJS flow typed API not up to date
        .bufferTime(2000, 2000, 10)
        .filter(postIds => postIds.length)
        .mergeMap(fetchPosts)
        .map(addFetchedPosts);

const continueToNextStepIfNoPostsEpic: Epic<Action> = (action$, store) =>
    // CURRENT_ANIMATION_ENDED
    action$
        .ofType('app/trip/GO_TO_NEXT_STEP', 'app/trip/GO_TO_PREVIOUS_STEP')
        .buffer(action$.ofType('app/trip/CURRENT_ANIMATION_ENDED'))
        .map(last)
        .map(action => {
            if (!action || action.type === 'app/trip/GO_TO_PREVIOUS_STEP') {
                return null;
            }
            const postIsDisplayed = !!currentPostSelector(store.getState());
            return postIsDisplayed ? null : goToNextStep();
        })
        .filter(Boolean);

export default combineEpics(continueToNextStepIfNoPostsEpic, fetchPostsEpic);
