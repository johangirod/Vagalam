import { withStyles } from 'vitaminjs';
import Prismic from 'prismic.io';
import { compose, last } from 'ramda';
import { injectState, provideState, softUpdate } from 'freactal';
import s from './style.css';
import Map from './Map';
import Details from './Details';

const getSleepLocationsAfter = date =>
    Prismic.api('http://vagalam.prismic.io/api')
        .then(api =>
            api.query(
                [
                    Prismic.Predicates.at('document.type', 'sleep_location'),
                    Prismic.Predicates.dateAfter('my.sleep_location.date', date),
                ],
                { orderings: '[my.sleep_location.date]', pageSize: 10 },
            ),
        )
        .then(response => response.results);

const FIRST_DAY_DATE = new Date(2017, 4, 28);

const withSleepLocations = provideState({
    initialState: () => ({
        currentSleepLocation: null,
        currentDate: FIRST_DAY_DATE,
        sleepLocations: [],
        isFetching: false,
    }),
    effects: {
        fetchSleepLocations: (effects, date, isFetching, cb) => {
            if (isFetching) {
                return state => state;
            }
            return effects
                .setFetching(true)
                .then(() => getSleepLocationsAfter(date))
                .then(locations => effects.setFetching(false).then(() => locations))
                .then(effects.updateSleepLocations)
                .then(cb)
                .then(() => state => state);
        },
        updateSleepLocations: (effects, sleepLocations) => (state) => {
            const previousLastDayNumber = state.sleepLocations.length
                ? last(state.sleepLocations).data['sleep_location.day_number'].value
                : 0;
            const fetchedFirstDayNumber = sleepLocations[0].data['sleep_location.day_number'].value;
            if (previousLastDayNumber >= fetchedFirstDayNumber) {
                return state;
            }
            return {
                ...state,
                sleepLocations: state.sleepLocations.concat(sleepLocations),
            };
        },
        setFetching: softUpdate((_, isFetching) => ({ isFetching })),
        goToNextDay: effects => (state) => {
            // TODO: case when no more sleeplocation exists
            const nextLocation = state.sleepLocations.find(
                sleepLocation =>
                    new Date(sleepLocation.data['sleep_location.date'].value) > state.currentDate,
            );
            if (!nextLocation) {
                effects.fetchSleepLocations(
                    state.currentDate,
                    state.isFetching,
                    effects.goToNextDay,
                );
                return state;
            }
            return {
                ...state,
                currentSleepLocation: nextLocation,
                currentDate: new Date(nextLocation.data['sleep_location.date'].value),
            };
        },
        initialize: effects => (state) => {
            effects.fetchSleepLocations(state.currentDate, state.isFetching);
            return state;
        },
    },
});

const Trip = ({ effects }) => {
    const handleKeyDown = e => e.key === ' ' && effects.goToNextDay();
    return (
        <div className={s.layout} onKeyDown={handleKeyDown}>
            <Map />
            <Details />
        </div>
    );
};

export default compose(withSleepLocations, injectState, withStyles(s))(Trip);
