import {
    ContactNotFound,
    NameExistsError,
} from '../../core/common/errors/contactError.js';
import { ContactModel } from './models/contactModel.js';
const ContactRepository = (logger) => {
    return {
        async findAll(queryData) {
            logger.debug(queryData);

            return await ContactModel.find(queryData);
        },
        async getById(id) {
            const contact = await ContactModel.findById(id);
            if (!contact) throw new ContactNotFound();
            return contact;
        },
        async updateById({ id, contactData }) {
            const contact = await ContactModel.findByIdAndUpdate(
                id,
                contactData
            );
            if (!contact) throw new ContactNotFound();
            logger.debug('Updated contact:', contact);
        },
        async create(contactData) {
            try {
                return await ContactModel.create(contactData);
            } catch (err) {
                // Handle unique name error
                // Error code 11000 means duplicate in mogodb
                logger.debug(err)
                if (err?.code === 11000) {
                    throw new NameExistsError();
                }
                throw err;
            }
        },
        async delete(id) {
            const isDeleted = await ContactModel.findOneAndDelete(id);
            if (!isDeleted) throw new ContactNotFound();
        },
    };
};
export default ContactRepository;
