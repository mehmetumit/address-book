const ContactQueryController = ({ logger, appQuery }) => {
    return {
        getContactById(req, res, next) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json("{ 'hello':'get by id' }");
            logger.debug(req.params);
        },
        getContactByParams(req, res, next) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json("{ 'hello':'world params' }");
            logger.debug(req.query);
        },
    };
};
export default ContactQueryController;
