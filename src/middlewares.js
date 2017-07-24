import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);
export default [epicMiddleware];
