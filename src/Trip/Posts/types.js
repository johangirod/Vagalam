// @flow

import type { PostId } from '../types';

export opaque type Picture = string;

export type Post = {
    +id: PostId,
    +type: 'Article' | 'Gallery',
    +title: ?string,
    +pictures: Array<Picture>,
    +content: ?string,
};

export type State = { [PostId]: Post };
export type AddFetchedPostsAction = {
    type: 'app/trip/posts/ADD_FETCHED_POSTS',
    posts: Array<Post>,
};
export type Action = AddFetchedPostsAction;
