import Contact from '../../domain/contact.js';

const CreateContact = ({ logger, contactRepo }) => {
    return {
        async createNewContact(contactData) {
            try {
                const contact = Contact({
                    name: contactData?.name,
                    address: contactData?.address,
                    phone: contactData?.phone,
                    email: contactData?.email,
                    mobilePhone: contactData?.mobilePhone,
                });
                logger.debug(contact.getPhone())
            } catch (err) {
                logger.error(err)
                throw err
            }
        },
    };
};
export default CreateContact;
