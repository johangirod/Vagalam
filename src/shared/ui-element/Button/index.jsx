/* @flow */
import { withStyles } from 'vitaminjs';
import s from './style.css';

const Button = ({ children, href, ...props }) =>
    (<button type="button" {...props}>
        {children}
    </button>);

export default withStyles(s)(Button);
