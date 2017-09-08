/* @flow */
import { withStyles } from 'vitaminjs';
import { Component } from 'react';
import { Motion, spring } from 'react-motion';
import LinkButton from '../shared/ui-element/Button/Link';
import FrameLayout from '../shared/ui-element/FrameLayout';

import backgroundImage from './background4.jpg';
import s from './style.css';

const SPRING_CONFIG = {
    stiffness: 80,
    damping: 80,
};
class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseOverCTA: false,
            glowCycle: 0,
        };
    }
    componentDidMount() {
        setInterval(() => this.setState({ glowCycle: 1 }), 1000);
        setInterval(() => this.setState({ glowCycle: 0 }), 600);
    }
    registerCTARef = (CTARef) => {
        this.CTARef = CTARef;
    };
    handleMouseEnter = () => {
        this.setState({ mouseOverCTA: true });
    };
    handleMouseOut = () => {
        this.setState({ mouseOverCTA: false });
    };
    render() {
        return (
            <FrameLayout freeRatio>
                <section className={s.header} onMouseOut={this.handleMouseOut}>
                    <Motion
                        style={{
                            saturate: spring(this.state.mouseOverCTA ? 100 : 0, SPRING_CONFIG),
                            glowOffset: spring(
                                this.state.mouseOverCTA ? this.state.glowCycle * 50 : 0,
                                SPRING_CONFIG,
                            ),
                        }}
                    >
                        {({ saturate, glowOffset }) => (
                            <div
                                className={s.background}
                                style={{
                                    backgroundImage: `url(${backgroundImage})`,
                                    filter: `saturate(${saturate + glowOffset}%)`,
                                }}
                            />
                        )}
                    </Motion>
                    <header>
                        <h1> \Vagalam\ </h1>
                        <h2> Le blog intéractif de mon tour du monde à vélo </h2>
                    </header>
                    <div
                        className={s.cta}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseOut={this.handleMouseOut}
                    >
                        <LinkButton registerRef={this.registerCTARef} href="/voyage">
                            Parcourir le voyage
                        </LinkButton>
                    </div>
                </section>
            </FrameLayout>
        );
    }
}
export default withStyles(s)(Landing);
