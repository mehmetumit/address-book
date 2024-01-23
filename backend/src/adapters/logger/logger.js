import winston from 'winston';

// Custom logging by wrapping winston library

const Logger = () => {
    let logger;
    return {
        initLogger({ outputTransports, level, format }) {
            logger = winston.createLogger({
                level: level,
                format: format,
                transports: [outputTransports],
            });
        },
        consoleTransport(options) {
            return new winston.transports.Console(options);
        },
        // Might be useful
        httpTransport(options) {
            return new winston.transports.Http(options);
        },
        debugLevel() {
            return 'debug';
        },
        infoLevel() {
            return 'info';
        },
        productionLevel() {
            return 'production';
        },
        prettyFormat() {
            return winston.format.combine(
                winston.format.timestamp(),
                winston.format.prettyPrint(),
            );
        },
        jsonFormat(){
            return winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            );
        },
        error(message) {
            logger.error(message);
        },
        info(message) {
            logger.info(message);
        },
        debug(message) {
            logger.debug(message);
        },
    };
};
export default Logger;
