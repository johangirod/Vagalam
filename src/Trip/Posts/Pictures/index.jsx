// @flow
import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import s from './style.css';
import type { Picture } from '../types';

type Props = {
    pictures: Array<Picture>,
    isFullscreen: boolean,
};
type State = {
    currentPictureIndex: number,
    previewIndex: ?number,
};
class Pictures extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            currentPictureIndex: 0,
            previewIndex: null,
        };
    }
    componentDidMount() {
        this.resetInterval();
        this.pictureDiv.focus();
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
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
        this.resetInterval();
    };
    goToPreviousPicture = () => {
        this.setState(({ currentPictureIndex }) => ({
            currentPictureIndex:
                (this.props.pictures.length + currentPictureIndex - 1) % this.props.pictures.length,
        }));
        this.resetInterval();
    };
    handleClickOnPicture = () => {
        if (!this.props.isFullscreen) {
            return;
        }
        this.goToNextPicture();
    };
    handleClickOnDot = (e: MouseEvent, i: Number) => {
        this.setState({ currentPictureIndex: i });
        if (this.props.isFullscreen) {
            e.stopPropagation();
        }
    };
    handleMouseEnterDot = (i: Number) => {
        this.setState({
            previewIndex: i,
        });
    };
    handleMouseLeaveDot = () => {
        this.setState({
            previewIndex: null,
        });
    };
    handleKeyDown = (e: KeyboardEvent) => {
        if (
            e.key === ' ' &&
            (!this.props.isFullscreen ||
                this.state.currentPictureIndex === this.props.pictures.length - 1)
        ) {
            return;
        }
        if (e.key === ' ' || e.key === 'ArrowRight') {
            this.goToNextPicture();
            e.stopPropagation();
        }
        if (e.key === 'ArrowLeft') {
            this.goToPreviousPicture();
            e.stopPropagation();
        }
    };

    render() {
        const { pictures } = this.props;
        const currentPictureIndex =
            this.state.previewIndex !== null
                ? this.state.previewIndex
                : this.state.currentPictureIndex;
        const currentPicture = pictures[currentPictureIndex];
        return (
            <div
                role="button"
                className={s.pictures}
                onClick={this.handleClickOnPicture}
                onKeyDown={this.handleKeyDown}
                tabIndex={0}
                ref={ref => {
                    this.pictureDiv = ref;
                }}
            >
                {pictures.map((picture, i) => (
                    <div
                        className={classnames(s['picture-container'], {
                            [s.show]: currentPictureIndex === i,
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
                {pictures.length > 1 && (
                    <div className={s['side-dots']}>
                        {pictures.map((picture, i) => (
                            <button
                                className={classnames(s.dot, {
                                    [s.selected]: currentPictureIndex === i,
                                })}
                                onClick={e => this.handleClickOnDot(e, i)}
                                key={picture.url}
                                onMouseEnter={() => this.handleMouseEnterDot(i)}
                                onMouseLeave={this.handleMouseLeaveDot}
                            >
                                <div role="img" aria-label="dot">
                                    ●
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default withStyles(s)(Pictures);
