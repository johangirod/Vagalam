// @flow

import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import Modale from '../../shared/ui-element/Modale';
import Button from '../../shared/ui-element/Button';
import s from './style.css';

function isFullScreen() {
    const doc = window.document;
    return (
        doc.fullscreenElement ||
        doc.mozFullScreenElement ||
        doc.webkitFullscreenElement ||
        doc.msFullscreenElement
    );
}
function goFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen;

    if (!isFullScreen()) {
        requestFullScreen.call(docEl);
    }
}
type PropType = {};
class FullScreenPopup extends Component {
    constructor(props: PropType) {
        super(props);
        this.state = {
            alreadyAsked: false,
            isFullScreen: IS_CLIENT && isFullScreen(),
        };
    }
    props: PropType;
    handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ') {
            this.handleGoFullScreen();
        }
    };
    handleGoFullScreen = () => {
        this.setState({ fullScreen: true, alreadyAsked: true });
        goFullScreen();
    };
    handleModaleClose = () => {
        this.setState({ alreadyAsked: true });
    };
    render() {
        if (IS_SERVER) {
            return null;
        }

        return (
            <Modale
                isOpened={!this.state.isFullScreen && !this.state.alreadyAsked}
                onClose={this.handleModaleClose}
            >
                <div className={s.modale} role="presentation" onKeyDown={this.handleKeyDown}>
                    <p>
                        Pour une meilleur experience, je conseille la navigation en plein écran.
                        Vous pourrez revenir en mode normal à tout moment en appuyant sur la touche{' '}
                        <i>Echap</i>.
                    </p>
                    <div className={s['button-container']}>
                        <Button onClick={this.handleGoFullScreen} style={{ margin: '16px' }}>
                            Activer le plein écran
                        </Button>
                    </div>
                </div>
            </Modale>
        );
    }
}

export default withStyles(s)(FullScreenPopup);
