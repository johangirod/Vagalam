/* @flow */

import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import type { Children } from 'react';
import classnames from 'classnames';
import s from './style.css';

type PropType = { onClose: () => void, isOpened?: boolean, children: Children };
class Modale extends Component {
    static defaultProps = {
        isOpened: true,
    };
    props: PropType;
    handleKeyDown = (e: SyntheticKeyboardEvent) => {
        if (e.key === 'Escape') {
            this.props.onClose();
        }
    };
    render() {
        const { onClose, children, isOpened } = this.props;
        return (
            <div
                role="presentation"
                className={classnames(s.modale, { [s.opened]: isOpened })}
                onKeyDown={this.handleKeyDown}
            >
                <button className={s['close-button']} aria-label="Fermer" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        );
    }
}

export default withStyles(s)(Modale);
