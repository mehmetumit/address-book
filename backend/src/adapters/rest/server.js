import express from 'express';
import YamlParser from '../../util/yamlParser.js';
import SwaggerMiddleware from './middlewares/swaggerMiddleware.js';
import PromMiddleware from './middlewares/promMiddleware.js';
import LoggerMiddleware from './middlewares/loggerMiddleware.js';
import HelpRouter from './routes/helpRouter.js';
import cors from 'cors';
import ContactRouter from './routes/contactRouter.js';
import bodyParserErrorHandler from 'express-body-parser-error-handler';

const Server = ({ serverConfig, logger, appCommand, appQuery }) => {
    const app = express();
    const router = express.Router();
    const port = serverConfig.port;
    let server;
    return {
        // Recommended to use on top of middleware chain
        withProm(promConfig) {
            app.use(PromMiddleware(promConfig));
            return this;
        },
        withCors() {
            app.use(cors());
            return this;
        },
        withSwaggerUI(swaggerConfig) {
            try {
                const swaggerDoc = YamlParser(logger).parse(
                    swaggerConfig.filePath
                );
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
            app.use(
                bodyParserErrorHandler({
                    onError: (err, req, res) => {},
                    errorMessage: (err) => {
                        return err.message;
                    },
                })
            );
            app.use('/api/v1', router);
            router.use('/', HelpRouter());
            router.use(
                '/contacts',
                ContactRouter({
                    logger: logger,
                    appCommand: appCommand,
                    appQuery: appQuery,
                })
            );
            server = app.listen(port, () => {
                logger.info(`Listening on port ${port}`);
            });
        },
        async shutDown() {
            await server.close();
            logger.info('Server shutdown successfully');
        },
    };
};

export default Server;
