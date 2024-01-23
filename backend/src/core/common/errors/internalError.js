import BaseApplicationError from './appError.js';

class InternalError extends BaseApplicationError {
    constructor(message) {
        super(message || 'Internal error');
    }
}
export default InternalError;
