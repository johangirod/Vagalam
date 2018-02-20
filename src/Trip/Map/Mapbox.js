import config from '../../config';

let Mapbox = new Proxy(
    {},
    {
        get: (target, name) => target[name] || (() => null),
    },
);

if (IS_CLIENT) {
    // eslint-disable-next-line global-require
    Mapbox = require('react-mapbox-gl');
    Mapbox.Map = Mapbox.default({
        accessToken: config.mapboxAccessToken,
    });
}

const exportedMapbox = Mapbox;
export default exportedMapbox;
