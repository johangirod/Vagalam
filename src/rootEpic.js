import { combineEpics } from 'redux-observable';
import tripEpic from './Trip/epic';
import visitorEpic from './shared/Visitor/epic';

export default combineEpics(tripEpic, visitorEpic);
