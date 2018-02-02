// @flow
import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
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
        const currentPicture = pictures[this.state.currentPictureIndex];
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
                            <img
                                className={classnames(s.picture)}
                                src={picture.url}
                                alt={picture.caption}
                            />
                        </div>
                    </div>
                ))}
                {this.props.isFullscreen ? (
                    <CSSTransitionGroup
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={100}
                        transitionName={{
                            enter: s.enter,
                            enterActive: s['enter-active'],
                            leave: s.leave,
                            leaveActive: s['leave-active'],
                        }}
                    >
                        <div className={s.caption} key={currentPicture.url}>
                            {currentPicture.caption}
                        </div>
                    </CSSTransitionGroup>
                ) : null}
            </div>
        );
    }
}

export default withStyles(s)(Pictures);
