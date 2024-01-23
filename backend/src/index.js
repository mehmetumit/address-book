import Logger from './adapters/logger/logger.js';
import Server from './adapters/rest/server.js';
import ServerConfig from './configs/serverConfig.js';
import PromConfig from './configs/promConfig.js';

const logger = Logger();
logger.initLogger({
    outputTransports: logger.consoleTransport(),
    format: logger.prettyFormat(),
    level: logger.debugLevel(),
});

const server = Server({
    serverConfig: ServerConfig,
    logger: logger,
});
server.withProm(PromConfig).withSwaggerUI('../api/swagger.yaml').serve();
