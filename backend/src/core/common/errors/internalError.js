import BaseApplicationError from './appError.js';

export class InternalError extends BaseApplicationError {
    constructor(message) {
        super(message || 'Internal error');
    }
}
export class DatabaseError extends BaseApplicationError {
    constructor(message) {
        super(message || 'Database unavailable');
    }
}
