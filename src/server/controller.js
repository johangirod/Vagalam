import Mailchimp from 'mailchimp-api-v3';
// @flow
import { createHash } from 'crypto';
import config from '../config.js';

const mailchimp = Mailchimp(config.mailchimp.APIKey);

const MASTER_LIST_ID = config.mailchimp.masterListId;
const emailFrequency = config.mailchimp.emailFrequencyIds;

const md5 = string => createHash('md5').update(string).digest('hex');

export function suscribeVisitor(email: string) {
    return mailchimp
        .post(`lists/${MASTER_LIST_ID}/members`, {
            email_adress: email,
            status: 'pending',
            interests: {
                [emailFrequency.SOMETIMES]: true,
            },
        })
        .then(null);
}

export function changeEmailPreference(email: string, setting: 'NEVER' | 'SOMETIMES' | 'ALWAYS') {
    return mailchimp
        .post(`lists/${MASTER_LIST_ID}/members/${md5(email)}`, {
            interests: {
                [emailFrequency.SOMETIMES]: false,
                [emailFrequency.ALWAYS]: false,
                [emailFrequency.NEVER]: false,
                [emailFrequency[setting]]: true,
            },
        })
        .then(null);
}
