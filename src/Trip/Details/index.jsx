import { connect } from 'react-redux';
import selectors from './selectors';
import s from './style.css';
import Pastille from '../../ui-element/Pastille';

const Details = ({ currentDayNumber }) =>
    (<div className={s.container}>
        <Pastille value={currentDayNumber || '...'} unit="jour" />
        <Pastille value={1209} unit="km" />
    </div>);

export default connect(selectors)(Details);
