import { Route } from 'vitaminjs/react-router';
import App from './App';
import Map from './Trip/Map'
import Landing from './Landing';

export default (
    <Route component={App}>
        <Route path="/" component={Landing} />
        <Route path="/voyage" component={Map} />
    </Route>
);
