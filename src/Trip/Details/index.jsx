// @flow
import { connect } from 'react-redux';
import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { currentDayNumberSelector } from './selectors';
import { userArrivedToLastPointSelector } from '../selectors';
import { goToPreviousStep, goToNextStep } from '../actions';
import s from './style.css';

type PropType = {
    currentDayNumber: ?number,
    userArrivedToLastPoint: boolean,
    goToPreviousStep: () => void,
    goToNextStep: () => void,
};

const Details = ({
    currentDayNumber,
    // eslint-disable-next-line no-shadow
    goToPreviousStep,
    // eslint-disable-next-line no-shadow
    goToNextStep,
    userArrivedToLastPoint,
}: PropType) =>
    currentDayNumber ? (
        <span className={s.details}>
            <button
                className={s.previous}
                onClick={goToPreviousStep}
                disabled={currentDayNumber === 1}
            >
                &lt;
            </button>{' '}
            Jour {currentDayNumber}{' '}
            <button className={s.next} onClick={goToNextStep} disabled={userArrivedToLastPoint}>
                &gt;
            </button>
        </span>
    ) : (
        <em className={s['press-space']}> Appuyez sur Espace pour commencer </em>
    );

export default compose(
    connect(
        state => ({
            currentDayNumber: currentDayNumberSelector(state),
            userArrivedToLastPoint: userArrivedToLastPointSelector(state),
        }),
        {
            goToNextStep,
            goToPreviousStep,
        },
    ),
    withStyles(s),
)(Details);
