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
const calculateMouseCloseness = (
    element: HTMLElement,
    mouse: MouseEvent,
    treshold: number = 200,
) => {
    const { top, bottom, left, right } = element.getBoundingClientRect();
    const horizontalDistance =
        mouse.clientX < left
            ? left - mouse.clientX
            : mouse.clientX > right ? mouse.clientX - right : 0;
    const verticalDistance =
        mouse.clientY < top
            ? top - mouse.clientY
            : mouse.clientY > bottom ? mouse.clientY - bottom : 0;
    const distance = Math.sqrt(verticalDistance ** 2 + horizontalDistance ** 2);
    return 1 - Math.min(distance, treshold) / treshold;
};
class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CTACloseness: 0,
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
    handleMouseMove = (mouseEvent: MouseEvent) => {
        this.setState({ CTACloseness: calculateMouseCloseness(this.CTARef, mouseEvent) });
    };
    handleMouseOut = () => {
        this.setState({ CTACloseness: 0 });
    };
    render() {
        return (
            <FrameLayout>
                <section
                    onMouseMove={this.handleMouseMove}
                    className={s.header}
                    onMouseOut={this.handleMouseOut}
                >
                    <Motion
                        style={{
                            saturate: spring(this.state.CTACloseness * 100, SPRING_CONFIG),
                            glowOffset: spring(
                                this.state.CTACloseness > 0 ? this.state.glowCycle * 50 : 0,
                                SPRING_CONFIG,
                            ),
                        }}
                    >
                        {({ saturate, glowOffset }) =>
                            (<div
                                className={s.background}
                                style={{
                                    backgroundImage: `url(${backgroundImage})`,
                                    filter: `saturate(${saturate + glowOffset}%)`,
                                }}
                            />)}
                    </Motion>
                    <header>
                        <h1> \Vag a lam\ </h1>
                    </header>
                    <div className={s.cta}>
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
