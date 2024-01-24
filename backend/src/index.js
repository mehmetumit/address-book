import Logger from './adapters/logger/logger.js';
import Server from './adapters/rest/server.js';
import ServerConfig from './configs/serverConfig.js';
import PromConfig from './configs/promConfig.js';
import SwaggerConfig from './configs/swaggerConfig.js';
import CreateContact from './core/app/command/createContact.js';
import DeleteContact from './core/app/command/deleteContact.js';
import UpdateContact from './core/app/command/updateContact.js';

// Composition root of application

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
    appQuery: {}, //TODO
    appCommand: {
        CreateContact: CreateContact({
            logger: logger,
            contactRepo: undefined,
        }),
        DeleteContact: DeleteContact({
            logger: logger,
            contactRepo: undefined,
        }),
        UpdateContact: UpdateContact({
            logger: logger,
            contactRepo: undefined,
        }),
    },
});
server
    .withCors()
    .withProm(PromConfig)
    .withLoggerMiddleware()
    .withSwaggerUI(SwaggerConfig)
    .serve();
