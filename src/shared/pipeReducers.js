/* @flow */

/** Compose reducers into one */
type Reducer<State, Action> = (State, Action) => State;
export default function pipeReducers<State, Action>(...reducers: Array<Reducer<State, Action>>): Reducer<State, Action> {
    return (state, action) =>
        reducers.reduce((previous, reducer) => reducer(previous, action), state);
}
