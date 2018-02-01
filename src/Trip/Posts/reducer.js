/* @flow */
import type { Action, State } from './types';

export default function postsReducer(state: State = {}, action: Action): State {
    switch (action.type) {
    case 'app/trip/posts/ADD_FETCHED_POSTS':
        return action.posts.reduce(
            (postsMap, post) => ({
                ...postsMap,
                [post.id]: post,
            }),
            state,
        );
    default:
        return state;
    }
}
