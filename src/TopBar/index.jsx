// @flow
import { withStyles } from 'vitaminjs';
import s from './style.css';

const TopBar = () => <div className={s.topbar}>Vagalam</div>;

export default withStyles(s)(TopBar);
