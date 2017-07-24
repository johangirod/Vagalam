// @flow

import type { State as TripState } from './Trip/types';

export type State = {
    +app: {
        +trip: TripState,
    },
};
