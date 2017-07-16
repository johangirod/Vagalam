import { injectState } from 'freactal';
import { withStyles } from 'vitaminjs';
import s from './style.css';
import { compose } from 'ramda';
import Pastille from '../../ui-element/Pastille';



const Details = ({ state: { currentSleepLocation }}) => 
    <div className={s.container}>
        <Pastille 
            value={currentSleepLocation ? currentSleepLocation.data['sleep_location.day_number'].value : '...'} 
            unit="jour" 
        />
        <Pastille value={1209} unit="km" />
    </div>

export default compose(injectState, withStyles(s))(Details);