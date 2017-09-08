import { connect } from 'react-redux';
import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import selectors from './selectors';
import s from './style.css';

const Details = ({ currentDayNumber }) =>
    currentDayNumber ? (
        <span className={s.details}>Jour {currentDayNumber}</span>
    ) : (
        <em className={s['press-space']}> Appuyez sur Espace pour commencer </em>
    );

export default compose(connect(selectors), withStyles(s))(Details);
