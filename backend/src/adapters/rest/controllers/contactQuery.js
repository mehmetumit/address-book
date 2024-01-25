import ErrorController from './errorController.js';

const ContactQueryController = ({ logger, appQuery }) => {
    return {
        async getContactById(req, res, next) {
            const getContact = appQuery.GetContact;
            res.setHeader('Content-Type', 'application/json');
            try {
                const contact = await getContact.getContactById(req.params.id);
                res.status(200).json(contact);
            } catch (err) {
                const errController = ErrorController();
                const sError = errController.genErrorStruct(err);
                res.status(sError.code).json(sError);
            }
        },
        async getContactsByParams(req, res, next) {
            const getContact = appQuery.GetContact;
            res.setHeader('Content-Type', 'application/json');
            try {
                const contact = await getContact.findContacts({
                    ...req.query, // Filter out undefined fields
                });
                res.status(200).json(contact);
            } catch (err) {
                const errController = ErrorController();
                const sError = errController.genErrorStruct(err);
                res.status(sError.code).json(sError);
            }
        },
    };
};
export default ContactQueryController;
