/* @flow */
import { withStyles } from 'vitaminjs';
import { Component } from 'react';
import backgroundImage from './background.jpg';
import EmailForm from '../../shared/Visitor/EmailForm';
import s from './style.css';

const MobileWarning = class extends Component {
    constructor(props) {
        super(props);
        this.state = { show: typeof window !== 'undefined' && window.innerWidth <= 820 };
    }
    handleContinue = () => {
        this.setState({ show: false });
    };
    render() {
        return this.state.show ? (
            <div className={s.container} style={{ backgroundImage: `url('${backgroundImage}')` }}>
                <h2> Le monde est trop grand pour ton écran... </h2>
                <p>
                    <strong>
                        Ce blog a été conçu pour une navigation optimale sur ordi ou tablette (en
                        mode paysage).
                    </strong>
                </p>
                <p>
                    Mon conseil ? Bookmark la page, et reviens quand tu seras calé bien
                    tranquillement devant son ordi/tablette, avec un mug de thé ou de café à portée
                    de main :)
                </p>
                <div style={{ flex: 1 }} />
                <p>
                    Et si tu le souhaites, tu peux laisser ton mail pour être mis au courant des
                    prochaines aventures.
                </p>
                <EmailForm />
                <p style={{ textAlign: 'center' }}>
                    <button className={s.continue} onClick={this.handleContinue}>
                        Continuer quand même
                    </button>
                </p>
            </div>
        ) : null;
    }
};
export default withStyles(s)(MobileWarning);
