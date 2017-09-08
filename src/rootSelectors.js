/* @flow */

import type { Selector } from './rootTypes';
import type { State as TripState } from './Trip/types';
import type { State as VisitorState } from './shared/Visitor/types';

export const tripSelector: Selector<TripState> = state => state.app.trip;
export const visitorSelector: Selector<VisitorState> = state => state.app.visitor;
