// @flow

export type EmailPreference = 'SOMETIMES' | 'NEVER' | 'ALWAYS';

export type State = ?{
    +email: string,
    +emailPreference: EmailPreference,
};

export type UpdateEmailPreferenceAction = {
    type: 'app/visitor/UPDATE_EMAIL_PREFERENCE',
    emailPreference: EmailPreference,
};
export type SubscribeAction = {
    type: 'app/visitor/SUBSCRIBE',
    email: string,
};
export type Action = UpdateEmailPreferenceAction | SubscribeAction;
