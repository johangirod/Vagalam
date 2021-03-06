// @flow

import { last } from 'ramda';
import { createSelector } from 'reselect';
import type { Selector } from '../../rootTypes';
import type { Post, Picture } from './types';
import { postsSelector, currentPathSelector, currentAnimationSelector } from '../selectors';

export const currentPostSelector: Selector<?Post> = createSelector(
    postsSelector,
    currentPathSelector,
    currentAnimationSelector,
    (posts, currentPath, currentAnimation) => {
        if (currentAnimation === 'Map') {
            return null;
        }
        const currentMapPoint = last(currentPath);
        if (!currentMapPoint || !currentMapPoint.postId) {
            return null;
        }
        const currentPost = posts[currentMapPoint.postId];
        if (!currentPost) {
            // TODO : handle waiting case
            console.error('The post id was not fetched');
            return null;
        }
        return currentPost;
    },
);

export const isFullscreenPostDisplayedSelector: Selector<boolean> = createSelector(
    currentPostSelector,
    currentPost => !!(currentPost && currentPost.pictures.length),
);

export const picturesSelector: Selector<Array<Picture>> = createSelector(postsSelector, posts =>
    // $FlowFixMe: Waiting for https://github.com/facebook/flow/issues/2221 to be solved
    (Object.values(posts): Array<Post>)
        .map(post => post.pictures)
        .filter(Boolean)
        .reduce((acc, value) => acc.concat(value), []),
);
