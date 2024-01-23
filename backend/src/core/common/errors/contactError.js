import BaseApplicationError from './appError.js';

export class NameExistsError extends BaseApplicationError {
    constructor(message) {
        super(message || 'Contact name exists');
    }
}
export class InvalidNameError extends BaseApplicationError {
    constructor(message) {
        super(message || 'Contact name invalid');
    }
}
export class InvalidEmailError extends BaseApplicationError {
    constructor(message) {
        super(message || 'Contact email invalid');
    }
}
export class InvalidPhoneError extends BaseApplicationError {
    constructor(message) {
        super(message || 'Contact phone invalid');
    }
}
export class InvalidAddress extends BaseApplicationError {
    constructor(message) {
        super(message || 'Contact address invalid');
    }
}
export class InvalidMobilePhoneError extends BaseApplicationError {
    constructor(message) {
        super(message || 'Contact phone invalid');
    }
}
