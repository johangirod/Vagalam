import { pipe, map, unnest, repeat, prepend, slice, aperture, __ } from 'ramda';
import { coordAll } from '@turf/meta';
import { lineString, point } from '@turf/helpers';
import lineSlice from '@turf/line-slice';
import veloscenie from './bike_roads/veloscenie.json';
import ev4 from './bike_roads/ev4.json';

const pathLineString = pipe(map(coordAll), unnest, lineString)([veloscenie, ev4]);

export const STARTING_POINT = [2.3738311, 48.8841141];

export const getStepLines = pipe(
    prepend(point(STARTING_POINT)),
    map(repeat(__, 2)),
    unnest,
    slice(1, -1),
    aperture(2),
    map(([startPoint, endPoint]) => lineSlice(startPoint, endPoint, pathLineString)),
);
