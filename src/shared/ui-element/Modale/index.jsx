/* @flow */

import { Component } from 'react';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import { withStyles } from 'vitaminjs';

import type { Children } from 'react';
import s from './style.css';

type PropType = {
    children: Children,
    fullScreen?: boolean,
    onClose?: () => void,
    isOpened?: boolean,
};

class Modale extends Component {
    static defaultProps = {
        isOpened: true,
        fullScreen: false,
        onClose: () => {},
    };
    constructor(props) {
        super(props);
        this.state = {
            isOpened: props.isOpened,
        };
    }
    state: {
        isOpened: boolean,
    };
    componentWillReceiveProps(nextProps) {
        if (
            this.props.isOpened !== nextProps.isOpened &&
            this.state.isOpened !== nextProps.isOpened
        ) {
            this.setState({
                isOpened: nextProps.isOpened,
            });
        }
    }
    props: PropType;
    handleKeyDown = (e: SyntheticKeyboardEvent) => {
        if (e.key === 'Escape') {
            this.handleClose();
        }
    };
    handleClose = () => {
        this.props.onClose();
        this.setState({ isOpened: false });
    };
    render() {
        const { children, fullScreen } = this.props;
        return (
            <CSSTransitionGroup
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}
                transitionName={{
                    enter: s.enter,
                    enterActive: s['enter-active'],
                    leave: s.leave,
                    leaveActive: s['leave-active'],
                }}
            >
                {this.state.isOpened
                    ? <div role="presentation" className={s.overlay} onKeyDown={this.handleKeyDown}>
                        <div className={classnames(s.modale, { [s.fullscreen]: fullScreen })}>
                            <button
                                className={s['close-button']}
                                aria-label="Fermer"
                                onClick={this.handleClose}
                            >
                                  X
                              </button>
                            {children}
                        </div>
                    </div>
                    : null}
            </CSSTransitionGroup>
        );
    }
}

export default withStyles(s)(Modale);
