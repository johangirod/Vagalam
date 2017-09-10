// @flow

import { withStyles } from 'vitaminjs';
import { connect } from 'react-redux';
import { Component } from 'react';
import { compose } from 'ramda';
import { updateEmailPreference, subscribe } from './actions';
import { emailSelector } from './selectors';
import s from './style.css';
import type { EmailPreference } from './types';

type PropType = {
    onVisitorSubmitEmail: any => void,
    onEmailPreferenceChange: EmailPreference => void,
};

class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            emailSubmitted: false,
            emailPreference: 'SOMETIMES',
        };
    }
    state: {
        email: ?string,
        emailSubmitted: boolean,
        emailPreference: EmailPreference,
    };
    props: PropType;
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.onVisitorSubmitEmail(this.state.email);
        this.setState({ emailSubmitted: true });
    };
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };
    handleEmailPreferenceChange = (e) => {
        this.setState({ emailPreference: e.target.value });
        this.props.onEmailPreferenceChange(e.target.value);
    };
    render() {
        if (this.props.email) {
            return (
                <p>
                    {this.state.emailSubmitted ? <strong> C'est noté ! </strong> : null}
                    Tu receveras un mail
                    <select
                        className={s.select}
                        value={this.state.emailPreference}
                        onChange={this.handleEmailPreferenceChange}
                        style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
                    >
                        <option value="ALWAYS"> dès qu'il y a du nouveau </option>
                        <option value="SOMETIMES"> de temps en temps </option>
                        <option value="NEVER">jamais (ou presque)</option>
                    </select>
                </p>
            );
        }

        return (
            <form className={s.form} onSubmit={this.handleFormSubmit}>
                <label htmlFor="email" className={s.label}>
                    Email
                </label>
                <div className={s['input-container']}>
                    <input
                        className={s.input}
                        id="email"
                        type="email"
                        onChange={this.handleEmailChange}
                    />
                    <input type="submit" value="Suivre" className={s.submit} />
                </div>
            </form>
        );
    }
}

export default compose(
    connect(state => ({ email: emailSelector(state) }), {
        onVisitorSubmitEmail: subscribe,
        onEmailPreferenceChange: updateEmailPreference,
    }),
    withStyles(s),
)(EmailForm);
