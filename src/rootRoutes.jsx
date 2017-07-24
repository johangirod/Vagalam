import { Route } from 'vitaminjs/react-router';
import App from './App';
import Trip from './Trip';
import Landing from './Landing';

export default (
    <Route component={App}>
        <Route path="/" component={Landing} />
        <Route path="/voyage" component={Trip} />
    </Route>
);
