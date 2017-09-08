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
            script={[
                {
                    innerHTML: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
  analytics.load("MU4inBjkrvhUp3WuzqnO9eeBllyXEliM");
  analytics.page();
  }}();`,
                },
            ]}
        />
        {children}
    </div>),
);
