// @flow
import { withStyles } from 'vitaminjs';

import LinkButton from '../shared/ui-element/Button/Link';

import backgroundImage from './background.jpg';
import s from './style.css';

const Landing = () =>
    (<div>
        <section className={s.header} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <header>
                <h1> \Vag a lam\ </h1>
            </header>
        </section>
        <section className={s.body}>
            <LinkButton href="/voyage"> Parcourir le voyage </LinkButton>
        </section>
    </div>);

export default withStyles(s)(Landing);
