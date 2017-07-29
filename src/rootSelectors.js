// @flow

import type { Selector } from './rootTypes';
import type { State as TripState } from './Trip/types';

export const tripSelector: Selector<TripState> = state => state.app.trip;
