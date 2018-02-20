// @flow
import type { TripFeatureCollection } from './types';
import Mapbox from './Mapbox';

type Props = {
    data: TripFeatureCollection,
    id: string,
};
const TripLayer = ({ data, id }: Props) => (
    <Mapbox.GeoJSONLayer
        data={data}
        id={id}
        lineLayout={{
            'line-join': 'round',
            'line-cap': 'round',
        }}
        linePaint={{
            'line-color': {
                property: 'transportType',
                type: 'categorical',
                stops: [['BIKE', '#fdfaf2'], ['BOAT', '#07a']],
            },
            'line-opacity': 0.8,
            'line-width': {
                property: 'transportType',
                type: 'categorical',
                stops: [['BIKE', 2], ['BOAT', 1]],
            },
        }}
    />
);

export default TripLayer;
