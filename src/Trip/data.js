import { pipe, map, unnest, repeat, prepend, slice, aperture, __ } from 'ramda';
import { coordAll } from '@turf/meta';
import { lineString, point } from '@turf/helpers';
import lineSlice from '@turf/line-slice';
import veloscenie from './bike_roads/veloscenie.json'
import ev4 from './bike_roads/ev4.json'

const pathLineString = pipe(
    map(coordAll),
    unnest,
    lineString,
)([veloscenie, ev4]);


const STARTPOINT = [2.3736243, 48.8840297, 0];

// console.log(pathLineString);
export const getStepLines = pipe(
    prepend(point(STARTPOINT)),
    map(repeat(__, 2)),
    unnest,
    slice(1, -1),
    aperture(2),
    map(([startPoint, endPoint]) => {
        console.log(startPoint, endPoint, pathLineString);
        return lineSlice(startPoint, endPoint, pathLineString);
    }),
    x => (console.log('last', x), x),
)

// export const getStepLines = () => [pathLineString];