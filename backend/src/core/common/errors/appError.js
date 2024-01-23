// Base application error
class BaseApplicationError extends Error {
    constructor(message) {
        super();

        Error.captureStackTrace(this, this.constructor);
        //Set error name
        this.name = this.constructor.name;

        this.message = message || 'Base applicaton error';
    }
}
export default BaseApplicationError;
