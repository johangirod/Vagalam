// @flow
import { withStyles } from 'vitaminjs';
import s from './style.css';

const FrameLayout = ({ top, bottom, children, ...otherProps }) =>
    (<div className={s.layout} {...otherProps}>
        <div className={s.top}>
            {top}
        </div>
        <div className={s.inside}>
            {children}
        </div>
        <div className={s.bottom}>
            {bottom}
        </div>
    </div>);

export default withStyles(s)(FrameLayout);
