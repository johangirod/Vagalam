// @flow
import { connect } from 'react-redux';
import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import { currentDayNumberSelector, currentDayDateStringSelector } from './selectors';
import { userArrivedToLastPointSelector } from '../selectors';
import { goToPreviousStep, goToNextStep } from '../actions';
import s from './style.css';

type PropType = {
    currentDayNumber: ?number,
    currentDayDateString: ?string,
    userArrivedToLastPoint: boolean,
    goToPreviousStep: () => void,
    goToNextStep: () => void,
};

const Details = ({
    currentDayNumber,
    currentDayDateString,
    // eslint-disable-next-line no-shadow
    goToPreviousStep,
    // eslint-disable-next-line no-shadow
    goToNextStep,
    userArrivedToLastPoint,
}: PropType) =>
    currentDayNumber && currentDayDateString ? (
        <span className={s.details}>
            <button
                className={s.previous}
                onClick={goToPreviousStep}
                disabled={currentDayNumber === 1}
            >
                &lt;
            </button>{' '}
            {currentDayDateString} / jour {currentDayNumber}
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
            currentDayDateString: currentDayDateStringSelector(state),
            userArrivedToLastPoint: userArrivedToLastPointSelector(state),
        }),
        {
            goToNextStep,
            goToPreviousStep,
        },
    ),
    withStyles(s),
)(Details);
