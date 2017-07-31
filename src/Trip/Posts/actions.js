/* @flow */
import type { AddFetchedPostsAction, Post } from './types';

export function addFetchedPosts(posts: Array<Post>): AddFetchedPostsAction {
    return {
        type: 'app/trip/posts/ADD_FETCHED_POSTS',
        posts,
    };
}
