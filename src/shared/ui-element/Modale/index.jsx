// @flow

import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import type { Children } from 'react';
import classnames from 'classnames';
import s from './style.css';

class Modale extends Component {
    constructor(props: { onClose: () => void, isOpened?: boolean, children: Children }) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.props.onClose();
        }
    }
    render() {
        const { onClose, children, isOpened = true } = this.props;
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
