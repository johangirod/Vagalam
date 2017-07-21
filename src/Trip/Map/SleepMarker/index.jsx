import { injectState } from 'freactal';
import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';

import s from './style.css';
import Icon from './Icon';

const Marker = ({ state: { zoom } }) => {
    const size = zoom > 7 ? '24px' : '12px';
    return (
        <div
            style={{
                height: size,
                width: size,
            }}
            className={s.icon}
        >
            <Icon />
        </div>
    );
};

export default compose(injectState, withStyles(s))(Marker);
