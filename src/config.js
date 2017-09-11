export default {
    mapboxAccessToken:
        'pk.eyJ1IjoiZ2FuY2VhYiIsImEiOiJjajQ0OHZjZzgxOGY3MndzOTh6YTFjbmNyIn0.0pHsI5xrBMh9YMftXmLQKw',
    mailchimp: {
        masterListId: 'f92f079c89',
        APIKey: process.env.MAILCHIMP_API_KEY,
        emailFrequencyIds: {
            ALWAYS: 'c771900d17',
            SOMETIMES: '0d75f6d649',
            NEVER: '0141ce329c',
        },
    },
};
