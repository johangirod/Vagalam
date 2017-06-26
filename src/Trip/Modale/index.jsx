import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import classnames from 'classnames';
import s from './style.css';

class Modale extends Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    } 
    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.props.onClose();
        }
    }
    render () {
        const { onClose, children, isOpen } = this.props;
        return (
            <div 
                className={classnames(s.modale, { [s.opened]: isOpen })}
                onKeyDown={this.handleKeyDown}
            >
                <button 
                    className={s['close-button']}
                    aria-label="Fermer"
                    role="button"
                    onClick={onClose}
                >X</button>
                {children}
            </div>
        );
    }
}

export default withStyles(s)(Modale);
