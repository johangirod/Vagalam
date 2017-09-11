import { connect } from 'react-redux';
import { picturesSelector } from './selectors';

// @TODO : only prefetch the next 3 posts
const PrefetchPictures = ({ pictures }) => (
    <div>
        {pictures.map(pictureUrl => <link rel="prefetch" key={pictureUrl} href={pictureUrl} />)}
    </div>
);

export default connect(state => ({ pictures: picturesSelector(state) }))(PrefetchPictures);
