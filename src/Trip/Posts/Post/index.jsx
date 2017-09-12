// @flow

import { withStyles } from 'vitaminjs';
import { Component } from 'react';
import classnames from 'classnames';
import Pictures from '../Pictures';
import s from './style.css';
import type { Post as PostType } from '../types';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreenPictures: !props.content };
    }
    handleClickOnPictures = () => {
        this.setState({ fullscreenPictures: true });
    };
    handleMouseEnterContent = () => {
        this.setState({ fullscreenPictures: !this.props.content });
    };
    render() {
        const { title, content, pictures } = this.props;

        return (
            <article>
                {pictures.length ? (
                    <div
                        className={classnames(s.pictures, {
                            [s.fullscreen]: this.state.fullscreenPictures,
                        })}
                        onClick={this.handleClickOnPictures}
                    >
                        <Pictures
                            pictures={pictures}
                            isFullscreen={this.state.fullscreenPictures}
                        />
                    </div>
                ) : null}

                {content ? (
                    <div
                        onMouseEnter={this.handleMouseEnterContent}
                        className={pictures.length ? s['content-pictures'] : s['content-alone']}
                    >
                        <h1>{title}</h1>
                        <div
                            className={s.body}
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                        />
                    </div>
                ) : null}
            </article>
        );
    }
}

export default withStyles(s)(Post);
