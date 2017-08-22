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
    onVisitorSubmitEmail: any => void,
};
const LastPointModale = ({ isOpened, visitorAlreadyLeftEmail, onVisitorSubmitEmail }: PropType) =>
    (<Modale isOpened={isOpened}>
        <div className={s.modale}>
            <h3>To be continuous...</h3>
            <p>
                Le voyage continue! Ce blog est alimenté en continue, au fur et à mesure de mes
                aventures. Laisse ton mail, wesh
            </p>
            {!visitorAlreadyLeftEmail
                ? <form className={s.form} onSubmit={onVisitorSubmitEmail}>
                    <input className={s.input} />
                    <button type="submit" className={s.submit}>
                          Suivre
                      </button>
                </form>
                : null}
        </div>
    </Modale>);

export default compose(
    connect(state => ({
        isOpened: userArrivedToLastPointSelector(state),
        visitorAlreadyLeftEmail: false,
        onVisitorSubmitEmail: (e) => {
            console.log('yeaaaa', e);
        },
    })),
    withStyles(s),
)(LastPointModale);
