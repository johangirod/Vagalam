import WPAPI from 'wpapi';

const wp = new WPAPI({ endpoint: 'https://vagalamapi.wordpress.com/wp-json' });
// export const getEvents = () => wp.posts().then(
//     posts => console.log(posts),
// );

export const getEvents = () => Promise.resolve([
    {
        date: new Date('2017', '30', '05'),
        location: '',
        event_type: 'sleep',
        coordinates: [43, 1],
    }
])