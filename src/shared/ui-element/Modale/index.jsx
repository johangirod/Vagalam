/* @flow */

import { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { withStyles } from 'vitaminjs';
import type { Children } from 'react';
import s from './style.css';

type PropType = { onClose: () => void, children: Children, isOpened?: boolean };
class Modale extends Component {
    static defaultProps = {
        isOpened: true,
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
            this.props.onClose();
            this.setState({ isOpened: false });
        }
    };
    render() {
        const { onClose, children } = this.props;
        return (
            <CSSTransitionGroup
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionName={{
                    enter: s.enter,
                    enterActive: s['enter-active'],
                    leave: s.leave,
                    leaveActive: s['leave-active'],
                }}
            >
                {this.state.isOpened
                    ? <div role="presentation" className={s.modale} onKeyDown={this.handleKeyDown}>
                        <button
                            className={s['close-button']}
                            aria-label="Fermer"
                            onClick={onClose}
                        >
                              X
                          </button>
                        {children}
                    </div>
                    : null}
            </CSSTransitionGroup>
        );
    }
}

export default withStyles(s)(Modale);
