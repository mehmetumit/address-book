import express from 'express';
import YamlParser from '../../util/yamlParser.js';
import SwaggerMiddleware from './middlewares/swaggerMiddleware.js';
import PromMiddleware from './middlewares/promMiddleware.js';
import LoggerMiddleware from './middlewares/loggerMiddleware.js';
import SignalHandler from '../../util/signalHandler.js';
import HelpRouter from './routes/helpRouter.js';

const Server = ({ serverConfig, logger }) => {
    const app = express();
    const router = express.Router();
    const port = serverConfig.port;
    const shutdownTimeout = serverConfig.shutdownTimout;
    let server;
    return {
        // Recommended to use on top of middleware chain
        withProm(promConfig) {
            app.use(PromMiddleware(promConfig));
            return this;
        },
        withSwaggerUI(swaggerConfig) {
            try {
                const swaggerDoc = YamlParser(logger).parse(swaggerConfig.filePath);
                router.use('/doc', SwaggerMiddleware(swaggerDoc));
            } catch (err) {
                logger.error('Swagger middleware disabled');
            }
            return this;
        },
        withLoggerMiddleware() {
            router.use(
                LoggerMiddleware({ logger: logger, disabledPaths: ['/doc/'] })
            );
            return this;
        },
        serve() {
            app.use(express.json());
            app.use('/v1', router);
            router.use('/', HelpRouter());
            server = app.listen(port, () => {
                logger.info(`Listening on port ${port}`);
            });
            SignalHandler({
                logger: logger,
                timeoutSecond: shutdownTimeout,
                shutdownCallback: this.shutDown,
            })
                .listenINT()
                .listenQUIT()
                .listenTERM();
        },
        shutDown() {
            server.close();
            logger.info('Server shutdown successfully');
        },
    };
};

export default Server;
