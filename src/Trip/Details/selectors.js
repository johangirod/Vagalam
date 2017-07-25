// @flow

import { createStructuredSelector, createSelector } from 'reselect';
import { sleepLocationsSelector, currentSleepLocationIndexSelector } from '../selectors';
import type { State } from '../../rootTypes';

const currentDayNumberSelector: State => ?number = createSelector(
    sleepLocationsSelector,
    currentSleepLocationIndexSelector,
    (sleepLocations, currentSleepLocationIndex) =>
        sleepLocations.length && currentSleepLocationIndex >= 0
            ? sleepLocations[Math.min(currentSleepLocationIndex, sleepLocations.length - 1)]
                  .dayNumber
            : null,
);
export default createStructuredSelector({
    currentDayNumber: currentDayNumberSelector,
});
