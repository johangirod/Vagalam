// @flow

import { withStyles } from 'vitaminjs';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { userArrivedToLastPointSelector } from '../selectors';
import Modale from '../../shared/ui-element/Modale';
import s from './style.css';

type PropType = {
    isOpened: boolean,
    visitorAlreadyLeftEmail: boolean,
};
const LastPointModale = ({ isOpened, visitorAlreadyLeftEmail }: PropType) =>
    (<Modale isOpened={isOpened}>
        <div className={s.modale}>
            <h3>To be continuous...</h3>
            <p>
                Le voyage continue! Ce blog est alimenté en continue, au fur et à mesure de mes
                aventures. Laisse ton mail, wesh
            </p>
            {!visitorAlreadyLeftEmail
                ? <form>
                    <input />
                </form>
                : null}
        </div>
    </Modale>);

export default compose(
    connect(state => ({
        isOpened: userArrivedToLastPointSelector(state),
        visitorAlreadyLeftEmail: () => false,
    })),
    withStyles(s),
)(LastPointModale);
