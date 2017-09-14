// @flow
import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import classnames from 'classnames';
import s from './style.css';

class Pictures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPictureIndex: 0,
        };
    }
    componentDidMount() {
        this.resetInterval();
    }
    resetInterval = () => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(this.goToNextPicture, 10000);
    };
    goToNextPicture = () => {
        this.setState(({ currentPictureIndex }) => ({
            currentPictureIndex: (currentPictureIndex + 1) % this.props.pictures.length,
        }));
    };
    handleClickOnPicture = () => {
        if (!this.props.isFullscreen) {
            return;
        }
        this.goToNextPicture();
        this.resetInterval();
    };
    render() {
        const { pictures } = this.props;
        return (
            <div className={s.pictures} onClick={this.handleClickOnPicture}>
                {pictures.map((picture, i) => (
                    <div
                        className={classnames(s['picture-container'], {
                            [s.show]: this.state.currentPictureIndex === i,
                            [s.unique]: pictures.length === 1,
                        })}
                        key={picture.url}
                    >
                        <div className={s['picture-border']}>
                            <img className={classnames(s.picture)} src={picture.url} />
                        </div>
                    </div>
                ))}
                {this.props.isFullscreen ? (
                    <div className={s.caption}>
                        {pictures[this.state.currentPictureIndex].caption}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default withStyles(s)(Pictures);
