import { withStyles } from 'vitaminjs';
import s from './style.css';

const Button = ({ children, ...props }) => <button {...props} />;
export default withStyles(s)(Button);