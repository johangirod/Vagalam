// @flow
import { withStyles } from 'vitaminjs';
import Pictures from '../Pictures';
import s from './style.css';
import type { Post as PostType } from '../types';

const Post = ({ title, content, pictures }: PostType) =>
    (<article>
        {pictures.length ? <Pictures pictures={pictures} /> : null}
        <div className={s.content}>
            <h1>
                {title}
            </h1>
            <div
                className={s.body}
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </div>
    </article>);

export default withStyles(s)(Post);
