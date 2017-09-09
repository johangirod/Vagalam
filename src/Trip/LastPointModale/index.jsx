// @flow

import { withStyles } from 'vitaminjs';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { userArrivedToLastPointSelector } from '../selectors';
import Modale from '../../shared/ui-element/Modale';
import EmailForm from '../../shared/Visitor/EmailForm';
import { emailSelector } from '../../shared/Visitor/selectors';
import s from './style.css';

type PropType = {
    isOpened: boolean,
    visitorEmail: ?string,
};
const LastPointModale = ({ isOpened, visitorEmail }: PropType) => (
    <Modale isOpened={isOpened}>
        <div className={s.modale}>
            <h3>Le blog s'arrête ici...</h3>
            <p>
                Mais pas le voyage ! Ce blog est mis à jour en continu, n'hésites pas à revenir
                d'ici quelques jours pour suivre les nouvelles aventures.
            </p>
            {!visitorEmail ? (
                <p>Tu peux aussi laisser ton email pour être prévenu quand il y a du nouveau.</p>
            ) : null}
            <EmailForm />
        </div>
    </Modale>
);

export default compose(
    connect(state => ({
        isOpened: userArrivedToLastPointSelector(state),
        visitorEmail: emailSelector(state),
    })),
    withStyles(s),
)(LastPointModale);
