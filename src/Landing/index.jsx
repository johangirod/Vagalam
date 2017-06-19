import styled from 'styled-components';
import { withStyles } from 'vitaminjs'; 

import backgroundImage from './background.jpg';
import s from './style.css';

const Landing = () => (
    <div>
        <section style={{ backgroundImage: `url(${backgroundImage})` }} >
            <header>
                <h1> \Vag a lam\ </h1>
            </header>
        </section>
    </div>
);

export default withStyles(s)(Landing);