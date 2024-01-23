const LoggerMiddleware = ({ logger, disabledPaths }) => {
    return (req, res, next) => {
        for (const path of disabledPaths) {
            if (req.path.includes(path)) {
                next();
                return;
            }
        }
        res.on('finish', () => {
            logger.debug({
                method: req.method,
                url: req.originalUrl,
                code: res.statusCode,
                statusMessage: res.statusMessage,
            });
        });
        next();
    };
};
export default LoggerMiddleware;
