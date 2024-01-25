import Contact from '../../domain/contact.js';
import ContactMapper from '../mapper/contactMapper.js';

const GetContact = ({ logger, contactRepo }) => {
    return {
        async getContactById(id) {
            try {
                const contactMapper = ContactMapper();
                const dbContact = await contactRepo.getById(id);
                const contact = Contact(
                    contactMapper.mapToDomainModel(dbContact)
                );
                return contact.serialize();
            } catch (err) {
                logger.error(err);
                throw err;
            }
        },
        async findContacts(contactData) {
            try {
                const contactMapper = ContactMapper();
                const dbContacts = await contactRepo.findAll(contactData);
                const contactsResp = dbContacts.map((dbContact) => {
                    return contactMapper.mapDbToResponseModel(dbContact);
                });
                return contactsResp;
            } catch (err) {
                logger.error(err);
                throw err;
            }
        },
    };
};
export default GetContact;
