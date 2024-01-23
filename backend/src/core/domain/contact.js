import Joi from 'joi';
import {
    InvalidNameError,
    InvalidEmailError,
    InvalidPhoneError,
    InvalidMobilePhoneError,
    InvalidAddress,
} from '../common/errors/contactError.js';

//Name, address, phone required
const joiSchema = Joi.object({
    name: Joi.string().min(1).max(50).required().error(new InvalidNameError()),
    address: Joi.string()
        .min(1)
        .max(255)
        .required()
        .error(new InvalidAddress()),
    //Phone data of contact Length must be between 1 and 15 digits according to E.164
    phone: Joi.string()
        .min(1)
        .max(15)
        .required()
        .error(new InvalidPhoneError()),
    email: Joi.string().email().error(new InvalidEmailError()),
    mobilePhone: Joi.string()
        .min(1)
        .max(15)
        .error(new InvalidMobilePhoneError()),
});
const Contact = ({ name, address, phone, mobilePhone, email }) => {
    const err = joiSchema.validate({
        name: name,
        address: address,
        phone: phone,
        mobilePhone: mobilePhone,
        email: email,
    }).error;
    if (err) throw err;

    //Private properties
    const contactName = name;
    const contactAddress = address;
    const contactPhone = phone;
    const contactMobilePhone = mobilePhone;
    const contactEmail = email;

    return {
        getName() {
            return contactName;
        },
        getAddress() {
            return contactAddress;
        },
        getPhone() {
            return contactPhone;
        },
        getMobilePhone() {
            return contactMobilePhone;
        },
        getEmail() {
            return contactEmail;
        },
    };
};

export default Contact;
