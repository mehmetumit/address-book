import { Router } from 'express';
import HelpController from '../controllers/helpController.js';
import NotAllowedController from '../controllers/notAllowedController.js';

const HelpRouter = () => {
    const router = Router();
    router.route('/').get(HelpController().getHelp).all(NotAllowedController);

    return router;
};

export default HelpRouter;
