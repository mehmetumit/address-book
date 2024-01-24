import Logger from './adapters/logger/logger.js';
import Server from './adapters/rest/server.js';
import ServerConfig from './configs/serverConfig.js';
import PromConfig from './configs/promConfig.js';
import SwaggerConfig from './configs/swaggerConfig.js';

const logger = Logger();
logger.initLogger({
    outputTransports: logger.consoleTransport(),
    format:
        process.env.NODE_ENV == 'production'
            ? logger.jsonFormat()
            : logger.prettyFormat(),
    level:
        process.env.NODE_ENV == 'production'
            ? logger.productionLevel()
            : logger.debugLevel(),
});

const server = Server({
    serverConfig: ServerConfig,
    logger: logger,
});
server
    .withProm(PromConfig)
    .withLoggerMiddleware()
    .withSwaggerUI(SwaggerConfig)
    .serve();
