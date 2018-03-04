/* @flow */

import { createSelector } from 'reselect';
import { last } from 'ramda';
import { currentPathSelector } from '../selectors';
import type { Selector } from '../../rootTypes';
import type { SleepLocation } from '../types';

export const currentDayNumberSelector: Selector<?number> = createSelector(
    currentPathSelector,
    currentPath => {
        const sleepLocation: ?SleepLocation = last(
            (currentPath.filter(({ type }) => type === 'sleep_location'): Array<any>),
        );
        return sleepLocation ? sleepLocation.dayNumber : null;
    },
);

export const currentDayDateStringSelector: Selector<?string> = createSelector(
    currentPathSelector,
    currentPath => {
        if (!currentPath.length) {
            return null;
        }
        return new Date(currentPath[currentPath.length - 1].date).toLocaleDateString('fr-fr', {
            month: 'long',
            day: 'numeric',
        });
    },
);
