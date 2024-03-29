import ErrorController from './errorController.js';
const ContactCommandController = ({ logger, appCommand }) => {
    return {
        async createContact(req, res, next) {
            const createContact = appCommand.CreateContact;
            res.setHeader('Content-Type', 'application/json');
            try {
                const { name, address, phone, mobilePhone, email } = req.body;
                const id = await createContact.createNewContact({
                    name: name,
                    address: address,
                    phone: phone,
                    mobilePhone: mobilePhone,
                    email: email,
                });
                res.status(201).json(id);
            } catch (err) {
                const errController = ErrorController();
                const sError = errController.genErrorStruct(err);
                res.status(sError.code).json(sError);
            }
        },
        async updateContactById(req, res, next) {
            const updateContact = appCommand.UpdateContact;
            try {
                await updateContact.updateContactById({
                    id: req.params.id,
                    contactData: {
                        ...req.body,// Filter out undefined fields
                    },
                });
                res.status(204).send();
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                const errController = ErrorController();
                const sError = errController.genErrorStruct(err);
                res.status(sError.code).json(sError);
            }
        },
        async deleteContactById(req, res, next) {
            const deleteContact = appCommand.DeleteContact;
            try {
                await deleteContact.deleteContactById(req.params.id);

                res.status(204).send();
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                const errController = ErrorController();
                const sError = errController.genErrorStruct(err);
                res.status(sError.code).json(sError);
            }
        },
    };
};
export default ContactCommandController;
