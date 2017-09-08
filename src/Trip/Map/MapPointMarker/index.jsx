/* @flow */
import { injectState } from 'freactal';
import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';

import s from './style.css';
import TentIcon from './TentIcon';

const Marker = ({
    state: { zoom },
    type,
}: {
    state: { zoom: number },
    type: 'point_of_interest' | 'sleep_location',
}) => {
    if (zoom < 4 || type === 'point_of_interest') {
        return null;
    }
    const size = zoom > 7 ? 24 : zoom > 6 ? 12 : /* otherwise */ 4;
    return (
        <div
            style={{
                height: `${size}px`,
                width: `${size}px`,
                padding: `${size / 6}px`,
                borderColor: zoom > 6 ? 'black' : 'transparent',
                backgroundColor: 'white',
            }}
            className={s.icon}
        >
            {type === 'sleep_location' ? <TentIcon /> : null}
        </div>
    );
};

export default compose(injectState, withStyles(s))(Marker);
