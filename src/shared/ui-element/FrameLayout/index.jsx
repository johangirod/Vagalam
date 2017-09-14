/* @flow */
import { withStyles } from 'vitaminjs';
import s from './style.css';

type PropType = {
    top: Element,
    bottom: Element,
    frameBackgroundColor?: string,
    freeRatio?: boolean,
    children: Node,
};

const FrameLayout = (
    {
        top,
        bottom,
        children,
        frameBackgroundColor = 'white',
        freeRatio = false,
        ...otherProps
    }: PropType = {},
) => (
    <div className={s.layout} {...otherProps} style={{ backgroundColor: frameBackgroundColor }}>
        <div className={s.top}>{top}</div>
        <div className={s.inside} style={freeRatio ? { maxWidth: 'none' } : {}}>
            {children}
        </div>
        <div className={s.bottom}>{bottom}</div>
    </div>
);

export default withStyles(s)(FrameLayout);
