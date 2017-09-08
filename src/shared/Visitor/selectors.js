// @flow
import { pipe } from 'ramda';
import type { Selector } from '../../rootTypes';
import { visitorSelector } from '../../rootSelectors';

export const emailSelector: Selector<?string> = pipe(
    visitorSelector,
    visitor => (visitor ? visitor.email : null),
);
