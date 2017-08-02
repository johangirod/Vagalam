/* @flow */

import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import type { Children } from 'react';
import s from './style.css';

type PropType = { onClose: () => void, children: Children };
class Modale extends Component {
    props: PropType;
    handleKeyDown = (e: SyntheticKeyboardEvent) => {
        if (e.key === 'Escape') {
            this.props.onClose();
        }
    };
    render() {
        const { onClose, children } = this.props;
        return (
            <div role="presentation" className={s.modale} onKeyDown={this.handleKeyDown}>
                <button className={s['close-button']} aria-label="Fermer" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        );
    }
}

export default withStyles(s)(Modale);
