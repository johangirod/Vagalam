// @flow

import type { State as TripState, Action as TripAction } from './Trip/types';

export type State = {
    +app: {
        +trip: TripState,
    },
};

export type Action = TripAction;
