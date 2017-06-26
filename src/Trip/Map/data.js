import { pipe, map, reduce, concat } from 'ramda';
import { coordAll } from '@turf/meta';
import { lineString } from '@turf/helpers';
import veloscenie from './bike_roads/veloscenie.json'
import ev4 from './bike_roads/ev4.json'

export const path = pipe(
    map(coordAll),
    reduce(concat, []),
    lineString,
)([veloscenie, ev4]);

