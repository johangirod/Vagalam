/* @flow */
import { withStyles } from 'vitaminjs';
import { Component } from 'react';
import { Motion, spring } from 'react-motion';
import LinkButton from '../shared/ui-element/Button/Link';
import FrameLayout from '../shared/ui-element/FrameLayout';

import backgroundImage from './background3.jpg';
import s from './style.css';

const calculateMouseCloseness = (
    element: HTMLElement,
    mouse: MouseEvent,
    treshold: Number = 200,
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
        setInterval(() => this.setState(state => ({ glowCycle: 1 - state.glowCycle })), 1000);
    }
    registerCTARef = (CTARef) => {
        this.CTARef = CTARef;
    };
    handleMouseMove = (mouseEvent: MouseEvent) => {
        this.setState({ CTACloseness: calculateMouseCloseness(this.CTARef, mouseEvent) });
    };
    render() {
        return (
            <FrameLayout>
                <section onMouseMove={this.handleMouseMove} className={s.header}>
                    <Motion
                        style={{
                            grayscale: spring((1 - this.state.CTACloseness) * 100),
                            glowOffset: spring(
                                this.state.CTACloseness === 1 ? this.state.glowCycle * 50 : 0,
                                {
                                    stiffness: 80,
                                    damping: 80,
                                },
                            ),
                        }}
                    >
                        {({ grayscale, glowOffset }) =>
                            (<div
                                className={s.background}
                                style={{
                                    backgroundImage: `url(${backgroundImage})`,
                                    filter: `grayscale(${grayscale}%) saturate(${100 +
                                        glowOffset}%) contrast(90%)`,
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
