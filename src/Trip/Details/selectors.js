// @flow

import { createStructuredSelector, createSelector } from 'reselect';
import { last } from 'ramda';
import { currentPathSelector } from '../selectors';
import type { State } from '../../rootTypes';

const currentDayNumberSelector: State => ?number = createSelector(
    currentPathSelector,
    (currentPath) => {
        const lastSleepLocation = last(currentPath.filter(({ type }) => type === 'sleep_location'));
        return lastSleepLocation ? lastSleepLocation.dayNumber : null;
    },
);
export default createStructuredSelector({
    currentDayNumber: currentDayNumberSelector,
});
