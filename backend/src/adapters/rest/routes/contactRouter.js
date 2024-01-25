import { Router } from 'express';
import ContactCommandController from '../controllers/contactCommand.js';
import ContactQueryController from '../controllers/contactQuery.js';
const ContactRouter = ({ logger, appCommand, appQuery }) => {
    const router = Router();
    const queryController = ContactQueryController({
        logger: logger,
        appQuery: appQuery,
    });
    const commandController = ContactCommandController({
        logger: logger,
        appCommand: appCommand,
    });
    router
        .route('/')
        .get(queryController.getContactsByParams)
        .post(commandController.createContact);
    router
        .route('/:id')
        .get(queryController.getContactById)
        .delete(commandController.deleteContactById)
        .put(commandController.updateContactById);
    return router;
};
export default ContactRouter;
