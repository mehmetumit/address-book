import Contact from '../../domain/contact.js';
import ContactMapper from '../mapper/contactMapper.js';

const UpdateContact = ({ logger, contactRepo }) => {
    return {
        async updateContactById({ id, contactData }) {
            try {
                const contactMapper = ContactMapper();
                const contactDbModel = await contactRepo.getById(id);
                const contactDomainModel = {
                    ...contactMapper.mapToDomainModel(contactDbModel),
                    ...contactData,
                };
                const contact = Contact({
                    ...contactDomainModel,
                });
                await contactRepo.updateById({
                    id: id,
                    contactData: contactMapper.mapToDbModel(contact),
                });
            } catch (err) {
                logger.error(err);
                throw err;
            }
        },
    };
};
export default UpdateContact;
