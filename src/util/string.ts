import logger from '@logger';
import moment from 'moment';


export function generateRandomAlphaNumericString(length: number): string {
    const possible = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let str = '';
    for (let i = 0; i < length; ++i) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
}

export function generateRandomNumericString(length: number): string {
    const possible = '0123456789';

    let str = '';
    for (let i = 0; i < length; ++i) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
}

export function getNumber(input) {
    try {
        if (typeof input != 'number') {
            input = parseInt(input, 10);
        }
    } catch (e) {
        logger.debug('ERROR in getNumber');
        throw e;
    }
    return input;
}

export function getNumberOrDefault(input, defaultValue) {
    try {
        input = getNumber(input);
        input = isNaN(input) ? defaultValue : input;
    } catch (e) {
        logger.debug('Input is not number. Returning Default value');
        return defaultValue;
    }
    return input;
}

export function isNotEmptyArray(arrayObject) {
    try {
        if (arrayObject && Array.isArray(arrayObject) && arrayObject.length > 0) {
            return true;
        }
    } catch (e) {
        logger.debug(e);
    }
    return false;
}

export function checkValidJson(input: string): boolean {
    try {
        JSON.parse(input);
        return true;
    } catch (e) {
        logger.error('ERROR occurred in utils.string.toJson()', e);
    }
    return false;
}

export const generateOTP = (length) => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

export const generatePassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}

export async function getAmountByPercentage(price, percentage) {
    const amount = price * (percentage / 100);
    return Number(amount.toFixed(2));
}



export async function calculateRemainingDays(requestAcceptedDate: Date, jobValidDays: number) {
    const acceptedDate = moment(requestAcceptedDate);

    // Calculate the difference in days between today and the request accepted date
    const currentDate = moment();
    const daysSinceAccepted = currentDate.diff(acceptedDate, 'days');

    // Calculate the number of days remaining
    const remainingDays = jobValidDays - daysSinceAccepted;

    // Ensure remaining days are not negative
    return remainingDays > 0 ? remainingDays : 0;
}
