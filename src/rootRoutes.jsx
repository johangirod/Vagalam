import { Route } from 'vitaminjs/react-router';
import { persistStore } from 'redux-persist';
import App from './App';
import Trip from './Trip';
import Landing from './Landing';

export default (store) => {
    if (IS_CLIENT) {
        persistStore(store);
    }
    return (
        <Route component={App}>
            <Route path="/" component={Landing} />
            <Route path="/voyage" component={Trip} />
        </Route>
    );
};
