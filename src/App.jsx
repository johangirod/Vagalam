import { withStyles } from 'vitaminjs';
import Helmet from 'vitaminjs/react-helmet';
import s from './style.global.css';
import TopBar from './TopBar';

export default withStyles(s)(({ children }) =>
    (<div>
        <Helmet
            title="Vagalam"
            meta={[
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
            ]}
            link={[
                {
                    href: 'https://fonts.googleapis.com/css?family=Crimson+Text|Lato',
                    rel: 'stylesheet',
                },
            ]}
        />
        {children}
    </div>),
);
