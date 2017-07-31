/* @flow */
import { withStyles } from 'vitaminjs';
import Pictures from '../Pictures';
import s from './style.css';
import type { Post as PostType } from '../types';

const Post = ({ title, content, pictures }: PostType) =>
    (<article>
        {pictures.length ? <Pictures pictures={pictures} /> : null}
        {content
            ? <div
                className={s.content}
                style={{ alignSelf: pictures.length ? 'stretch' : 'center' }}
            >
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
            : null}
    </article>);

export default withStyles(s)(Post);
