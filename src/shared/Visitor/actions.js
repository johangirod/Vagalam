// @flow
import type { EmailPreference, UpdateEmailPreferenceAction, SuscribeAction } from './types';

export function updateEmailPreference(
    emailPreference: EmailPreference,
): UpdateEmailPreferenceAction {
    return {
        type: 'app/visitor/UPDATE_EMAIL_PREFERENCE',
        emailPreference,
    };
}

export function suscribe(email: string): SuscribeAction {
    return {
        type: 'app/visitor/SUSCRIBE',
        email,
    };
}
