import Logger from './adapters/logger/logger.js';
import Server from './adapters/rest/server.js';
import ServerConfig from './configs/serverConfig.js';
import PromConfig from './configs/promConfig.js';
import SwaggerConfig from './configs/swaggerConfig.js';
import CreateContact from './core/app/command/createContact.js';
import DeleteContact from './core/app/command/deleteContact.js';
import UpdateContact from './core/app/command/updateContact.js';
import GetContact from './core/app/query/getContact.js';
import mongoose from 'mongoose';
import MongoConfig from './configs/mongoConfig.js';
import ContactRepository from './adapters/mongo/contactRepository.js';
import SignalHandler from './util/signalHandler.js';

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

const contactRepo = ContactRepository({
    logger: logger,
    dbConfig: MongoConfig,
});
const server = Server({
    serverConfig: ServerConfig,
    logger: logger,
    appQuery: {
        GetContact: GetContact({
            logger: logger,
            contactRepo: contactRepo,
        }),
    },
    appCommand: {
        CreateContact: CreateContact({
            logger: logger,
            contactRepo: contactRepo,
        }),
        DeleteContact: DeleteContact({
            logger: logger,
            contactRepo: contactRepo,
        }),
        UpdateContact: UpdateContact({
            logger: logger,
            contactRepo: contactRepo,
        }),
    },
});
contactRepo.conntectToDb();
server
    .withCors()
    .withProm(PromConfig)
    .withLoggerMiddleware()
    .withSwaggerUI(SwaggerConfig)
    .serve();

SignalHandler({
    logger: logger,
    timeoutSecond: ServerConfig.shutdownTimeout,
    shutdownCallbacks: [server.shutDown, contactRepo.shutdown],
})
    .listenINT()
    .listenQUIT()
    .listenTERM();
