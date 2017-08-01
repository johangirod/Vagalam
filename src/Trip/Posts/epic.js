/* @flow */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/do';
import Prismic from 'prismic.io';
import PrismicDOM from 'prismic-dom';
import type { Epic } from '../../rootTypes';
import type { Action, Post } from './types';
import type { PostId } from '../types';
import { addFetchedPosts } from './actions';

const proxyWithGoogleImageResizer = pictureUrl =>
    `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url=${pictureUrl}&container=focus&resize_h=1080&refresh=31536000`;

function fetchPosts(postIds: Array<PostId>): Observable<Array<Post>> {
    return Observable.fromPromise(
        Prismic.api('http://vagalam.prismic.io/api').then(api =>
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
                    ? postApi.data['post.pictures'].value.map(value =>
                          proxyWithGoogleImageResizer(value.picture.value.main.url),
                      )
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

export default fetchPostsEpic;
