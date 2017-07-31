/* @flow */
import type { ActionsObservable } from 'redux-observable';
import type { MiddlewareAPI as Store } from 'redux';

import type { State as TripState, Action as TripAction } from './Trip/types';

export type State = {
    +app: {
        +trip: TripState,
    },
};

export type Action = TripAction;

export type Selector<Type> = State => Type;

export type Epic<EpicAction: Action> = (
    ActionsObservable<Action>,
    Store<State, Action>,
) => Observable<EpicAction>;
