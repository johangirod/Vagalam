import { connect } from 'react-redux';
import { picturesSelector } from './selectors';

// @TODO : only prefetch the next 3 posts
const PrefetchPictures = ({ pictures }) => (
    <div>{pictures.map(({ url }) => <link rel="prefetch" key={url} href={url} />)}</div>
);

export default connect(state => ({ pictures: picturesSelector(state) }))(PrefetchPictures);
