import Contact from '../../domain/contact.js';
import ContactMapper from '../mapper/contactMapper.js';

const CreateContact = ({ logger, contactRepo }) => {
    return {
        async createNewContact(contactData) {
            try {
                const contactMapper = ContactMapper();
                const contact = Contact({
                    name: contactData?.name,
                    address: contactData?.address,
                    phone: contactData?.phone,
                    email: contactData?.email,
                    mobilePhone: contactData?.mobilePhone,
                });
                const createdContact = await contactRepo.create(
                    contactMapper.mapToDbModel(contact)
                );
                return contactMapper.mapDbToResponseModel(createdContact);
            } catch (err) {
                logger.error(err);
                throw err;
            }
        },
    };
};
export default CreateContact;
