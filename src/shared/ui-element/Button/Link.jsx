/* @flow */
import { withStyles } from 'vitaminjs';
import s from './style.css';

const LinkButton = ({ children, href, ...props }) =>
    (<a href={href} {...props} className={s.button}>
        {children}
    </a>);

export default withStyles(s)(LinkButton);
