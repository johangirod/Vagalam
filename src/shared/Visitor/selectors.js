// @flow
import { compose } from 'ramda';
import type { Selector } from '../../rootTypes';
import { visitorSelector } from '../../rootSelectors';

export const emailSelector: Selector<?string> = compose(visitor => visitor.email, visitorSelector);
