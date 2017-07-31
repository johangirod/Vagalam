/* @flow */
import { injectState } from 'freactal';
import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';

import s from './style.css';
import TentIcon from './TentIcon';
import MapIcon from './MapIcon';

const Marker = ({
    state: { zoom },
    type,
}: {
    state: { zoom: number },
    type: 'point_of_interest' | 'sleep_location',
}) => {
    if (zoom < 4) {
        return null;
    }
    const size = zoom > 8 ? 24 : zoom > 6 ? 12 : /* otherwise */ 4;
    return (
        <div
            style={{
                height: `${size}px`,
                width: `${size}px`,
                padding: `${size / 6}px`,
                borderColor: zoom > 7 ? 'black' : 'transparent',
                backgroundColor: type === 'point_of_interest' ? 'red' : 'white',
            }}
            className={s.icon}
        >
            {type === 'sleep_location'
                ? <TentIcon />
                : type === 'point_of_interest' ? <MapIcon /> : null}
        </div>
    );
};

export default compose(injectState, withStyles(s))(Marker);
