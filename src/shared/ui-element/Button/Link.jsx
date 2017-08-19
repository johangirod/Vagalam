/* @flow */
import { withStyles } from 'vitaminjs';
import s from './style.css';

const LinkButton = ({ children, href, registerRef, ...props }) =>
    (<a href={href} {...props} className={s.button} ref={registerRef}>
        {children}
    </a>);

export default withStyles(s)(LinkButton);
