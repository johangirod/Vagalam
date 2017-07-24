import { compose, curryN, __ } from 'ramda';

/** Compose reducers into one */
export default function composeReducers(...reducers) {
    return (state, action) => {
        const stateFns = reducers.map(reducer => curryN(2)(reducer)(__, action));
        return compose(...stateFns)(state);
    };
}
