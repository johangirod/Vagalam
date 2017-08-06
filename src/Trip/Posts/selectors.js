/* @flow */

import { last } from 'ramda';
import { createSelector } from 'reselect';
import type { Selector } from '../../rootTypes';
import type { Post } from './types';
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
            throw new Error('The post id was not fetched');
        }
        return currentPost;
    },
);

export const hasFullScreenPostSelector: Selector<Boolean> = createSelector(
    currentPostSelector,
    currentPost => currentPost && currentPost.pictures.length,
);
