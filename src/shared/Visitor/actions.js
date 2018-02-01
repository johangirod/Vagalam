// @flow
import type { EmailPreference, UpdateEmailPreferenceAction, SubscribeAction } from './types';

export function updateEmailPreference(emailPreference: EmailPreference): UpdateEmailPreferenceAction {
    return {
        type: 'app/visitor/UPDATE_EMAIL_PREFERENCE',
        emailPreference,
    };
}

export function subscribe(email: string): SubscribeAction {
    return {
        type: 'app/visitor/SUBSCRIBE',
        email,
    };
}
