import { Route } from 'vitaminjs/react-router';
import App from './App';
import Landing from './Landing';

export default (
    <Route component={App}>
        <Route path="/" component={Landing} />
    </Route>
);
