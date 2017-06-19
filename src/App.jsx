import { withStyles } from 'vitaminjs';
import s from './style.global.css';
import Helmet from 'vitaminjs/react-helmet';


export default withStyles(s)(({ children }) => 
    <div>
        <Helmet
            title="Vagalam"
            meta={[{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]} 
            link={[{ href: "https://fonts.googleapis.com/css?family=Crimson+Text|Lato", rel: 'stylesheet' }]} 
        /> 
        {children}
    </div>
);