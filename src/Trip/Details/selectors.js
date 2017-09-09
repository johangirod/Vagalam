/* @flow */

import { createSelector } from 'reselect';
import { last } from 'ramda';
import { currentPathSelector } from '../selectors';
import type { Selector } from '../../rootTypes';

export const currentDayNumberSelector: Selector<?number> = createSelector(
    currentPathSelector,
    (currentPath) => {
        const lastSleepLocation = last(currentPath.filter(({ type }) => type === 'sleep_location'));
        return lastSleepLocation ? lastSleepLocation.dayNumber : null;
    },
);
