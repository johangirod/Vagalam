/* @flow */
import { withStyles } from 'vitaminjs';

import LinkButton from '../shared/ui-element/Button/Link';
import FrameLayout from '../shared/ui-element/FrameLayout';

import backgroundImage from './background.jpg';
import s from './style.css';

const Landing = () =>
    (<FrameLayout>
        <section className={s.header} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <header>
                <h1> \Vag a lam\ </h1>
            </header>
            <div className={s.cta}>
                <LinkButton href="/voyage">Parcourir le voyage</LinkButton>
            </div>
        </section>
    </FrameLayout>);

export default withStyles(s)(Landing);
