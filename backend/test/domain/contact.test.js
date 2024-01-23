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
            const contactData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
                address: `${faker.location.streetAddress()} ${faker.location.city()}`,
                mobilePhone: faker.string.numeric({
                    length: { min: 1, max: 15 },
                }),
            };
            const c = Contact({
                name: contactData.name,
                email: contactData.email,
                phone: contactData.phone,
                address: contactData.address,
                mobilePhone: contactData.mobilePhone,
            });
            expect(c.getName()).to.equal(contactData.name);
            expect(c.getEmail()).to.equal(contactData.email);
            expect(c.getPhone()).to.equal(contactData.phone);
            expect(c.getAddress()).to.equal(contactData.address);
            expect(c.getMobilePhone()).to.equal(contactData.mobilePhone);
        }).not.throw();
    });
    it('name is undefined, should throw invalid name', () => {
        expect(() => {
            Contact({
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
            Contact({
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
            Contact({
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
            Contact({
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
            Contact({
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
            Contact({
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
            Contact({
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
                Contact({
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
            Contact({
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
            Contact({
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
