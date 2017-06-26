import { withStyles } from 'vitaminjs';
import s from './style.css';

import Pastille from '../../ui-element/Pastille';

const Details = () => 
    <div className={s.container}>
        <Pastille value={1} unit="jour" />
        <Pastille value={1209} unit="km" />
    </div>

export default withStyles(s)(Details);