import { withStyles } from 'vitaminjs';
import s from './style.css';

const Pastille = ({ value, unit }) => 
    <div className = {s.pastille} >
        <strong>{value}</strong>
        <small>{unit}</small>
    </div>;

export default withStyles(s)(Pastille);