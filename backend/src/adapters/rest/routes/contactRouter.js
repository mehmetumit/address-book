import { Router } from 'express';
import ContactCommandController from '../controllers/contactCommand.js';
import ContactQueryController from '../controllers/contactQuery.js';
const ContactRouter = (logger) => {
    const router = Router();
    const queryController = ContactQueryController(logger);
    const commandController = ContactCommandController(logger);
    router
        .route('/')
        .get(queryController.getContactByParams)
        .post(commandController.createContact);
    router
        .route('/:contact_id')
        .get(queryController.getContactById)
        .delete(commandController.deleteContactById)
        .put(commandController.updateContactById);
    return router;
};
export default ContactRouter;
