import {
    ContactNotFound,
    InvalidAddress,
    InvalidEmailError,
    InvalidMobilePhoneError,
    InvalidNameError,
    InvalidPhoneError,
    NameExistsError,
} from '../../../core/common/errors/contactError.js';
import {
    DatabaseError,
    InternalError,
} from '../../../core/common/errors/internalError.js';

const ErrorController = () => {
    const genErrorCode = (err) => {
        // Cleaner way to find type of errors in js
        switch (true) {
            case err instanceof ContactNotFound:
                return 404;
            case err instanceof NameExistsError:
            case err instanceof InvalidNameError:
            case err instanceof InvalidAddress:
            case err instanceof InvalidPhoneError:
            case err instanceof InvalidEmailError:
            case err instanceof InvalidMobilePhoneError:
                return 400;
            case err instanceof DatabaseError:
                return 503;
            case err instanceof InternalError:
                return 500;
            default:
                return 500;
        }
    };
    return {
        genErrorStruct(err) {
            return {
                code: genErrorCode(err),
                message: err.message,
            };
        },
    };
};
export default ErrorController;
