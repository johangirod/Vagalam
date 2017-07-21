import { withStyles } from 'vitaminjs';
import Prismic from 'prismic.io';
import { compose } from 'ramda';
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
    }),
    effects: {
        fetchSleepLocations: (effects, date) =>
            getSleepLocationsAfter(date).then(newSleepLocations => state => ({
                ...state,
                sleepLocations: state.sleepLocations.concat(newSleepLocations),
            })),
        goToNextDay: effects => (state) => {
            // TODO: case when no more sleeplocation exists
            const nextLocation = state.sleepLocations.find(
                sleepLocation =>
                    new Date(sleepLocation.data['sleep_location.date'].value) > state.currentDate,
            );
            if (!nextLocation) {
                effects.fetchSleepLocations(state.currentDate).then(effects.goToNextDay);
                return state;
            }
            return {
                ...state,
                currentSleepLocation: nextLocation,
                currentDate: new Date(nextLocation.data['sleep_location.date'].value),
            };
        },
        initialize: (effects) => {
            effects.fetchSleepLocations(FIRST_DAY_DATE);
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
