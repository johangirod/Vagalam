import { injectState } from 'freactal';
import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';

import s from './style.css';
import Icon from './Icon';

const Marker = ({ state: { zoom } }) => {
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
            }}
            className={s.icon}
        >
            <Icon />
        </div>
    );
};

export default compose(injectState, withStyles(s))(Marker);
