import { withStyles } from 'vitaminjs';
import s from './style.css';

const Post = ({ title, date, content, pictureUrl }) => 
    <article>
        <div className={s.picture} style={{ backgroundImage: `url(${pictureUrl})` }} />
        <div className={s.content} >
            <h1>{title}</h1>
            <p>
                <small className={s.date} >{date.toLocaleDateString()}</small>
            </p> 
            <div
                className={s.body}
                dangerouslySetInnerHTML={{
                    __html: content
                }}
            />
        </div>
    </article>

export default withStyles(s)(Post);
