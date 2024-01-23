import { expect } from 'chai';
import { fakerTR as faker } from '@faker-js/faker';
import Contact from '../../src/core/domain/contact.js';
import {
    InvalidNameError,
    InvalidAddress,
    InvalidPhoneError,
    InvalidEmailError,
    InvalidMobilePhoneError,
} from '../../src/core/common/errors/contactError.js';

describe('Contact validation test', () => {
    it('should create contact', () => {
        expect(() => {
            new Contact({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
                address: `${faker.location.streetAddress()} ${faker.location.city()}`,
                mobilePhone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
            });
        }).not.throw();
    });
    it('name is undefined, should throw invalid name', () => {
        expect(() => {
            new Contact({
                email: faker.internet.email(),
                phone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
                address: `${faker.location.streetAddress()} ${faker.location.city()}`,
                mobilePhone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
            });
        }).throw(InvalidNameError);
    });
    it('name has 51 character, should throw invalid name', () => {
        expect(() => {
            new Contact({
                name: faker.string.alphanumeric({
                    length: { min: 51, max: 51 },
                }),
                email: faker.internet.email(),
                phone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
                address: `${faker.location.streetAddress()} ${faker.location.city()}`,
                mobilePhone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
            });
        }).throw(InvalidNameError);
    });
    it('address is undefined, should throw invalid address', () => {
        expect(() => {
            new Contact({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
                mobilePhone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
            });
        }).throw(InvalidAddress);
    });
    it('address has 256 characters, should throw invalid address', () => {
        expect(() => {
            new Contact({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
                address: faker.string.alphanumeric({
                    length: { min: 256, max: 256 },
                }),
                mobilePhone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
            });
        }).throw(InvalidAddress);
    });
    it('phone is undefined, should throw invalid phone', () => {
        expect(() => {
            new Contact({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                address: `${faker.location.streetAddress()} ${faker.location.city()}`,
                mobilePhone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
            });
        }).throw(InvalidPhoneError);
    });
    it('phone has more than 15 characters, should throw invalid phone', () => {
        expect(() => {
            new Contact({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.string.numeric({
                    length: { min: 16, max: 16 },
                }),
                address: `${faker.location.streetAddress()} ${faker.location.city()}`,
                mobilePhone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
            });
        }).throw(InvalidPhoneError);
    });
    it('email is undefined, should create contact', () => {
        expect(() => {
            new Contact({
                name: faker.person.fullName(),
                phone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
                address: `${faker.location.streetAddress()} ${faker.location.city()}`,
                mobilePhone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
            });
        }).not.throw();
    });
    it('email is invalid, should throw invalid email', () => {
        const invalidEmails = [
            'invalid_email@example',
            'invalid_emailexample',
            ' @example.com',
        ];
        for (const email of invalidEmails) {
            expect(() => {
                new Contact({
                    name: faker.person.fullName(),
                    email: email,
                    phone: faker.string.numeric({
                        length: { min: 1, max: 15 },
                    }),
                    address: `${faker.location.streetAddress()} ${faker.location.city()}`,
                    mobilePhone: faker.string.numeric({
                        length: { min: 1, max: 15 },
                    }),
                });
            }).throw(InvalidEmailError);
        }
    });
    it('mobile phone has undefined, should create contact', () => {
        expect(() => {
            new Contact({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
                address: `${faker.location.streetAddress()} ${faker.location.city()}`,
            });
        }).not.throw();
    });
    it('mobile phone has more than 15 characters, should throw invalid mobile phone', () => {
        expect(() => {
            new Contact({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
                address: `${faker.location.streetAddress()} ${faker.location.city()}`,
                mobilePhone: faker.string.numeric({
                    length: { min: 16, max: 16 },
                }),
            });
        }).throw(InvalidMobilePhoneError);
    });
});
