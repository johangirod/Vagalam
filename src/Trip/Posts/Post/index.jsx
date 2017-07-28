// @flow
import { withStyles } from 'vitaminjs';
import Pictures from '../Pictures';
import s from './style.css';

const Post = ({
    title,
    date,
    content,
    pictures,
}: {
    title: string,
    date: Date,
    content: string,
    pictures: Array<string>,
}) =>
    (<article>
        <Pictures pictures={pictures} />
        <div className={s.content}>
            <h1>
                {title}
            </h1>
            <p>
                <small className={s.date}>
                    {date.toLocaleDateString()}
                </small>
            </p>
            <div
                className={s.body}
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </div>
    </article>);

export default withStyles(s)(Post);
