/* @flow */
import { withStyles } from 'vitaminjs';
import type { Children } from 'react';
import s from './style.css';

type PropType = {
    top: Element,
    bottom: Element,
    frameBackgroundColor?: string,
    children: Children,
};

const FrameLayout = (
    { top, bottom, children, frameBackgroundColor = 'white', ...otherProps }: PropType = {},
) =>
    (<div className={s.layout} {...otherProps} style={{ backgroundColor: frameBackgroundColor }}>
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
