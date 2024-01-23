import express from 'express';
import YamlParser from '../../util/yamlParser.js';
import SwaggerMiddleware from './middlewares/swaggerMiddleware.js';
import PromMiddleware from './middlewares/promMiddleware.js';
import SignalHandler from '../../util/signalHandler.js';

const Server = ({ serverConfig, logger }) => {
    const app = express();
    const router = express.Router();
    const port = serverConfig.port;
    () => {};
    return {
        // Recommended to use on top of middleware chain
        withProm(promConfig) {
            app.use(PromMiddleware(promConfig));
            return this;
        },
        withSwaggerUI(filePath) {
            try {
                const swaggerDoc = YamlParser(logger).parse(filePath);
                router.use('/doc', SwaggerMiddleware(swaggerDoc));
            } catch (err) {
                logger.error('Swagger middleware disabled');
            }
            return this;
        },
        serve() {
            app.use('/v1', router);
            router.get('/', (req, res) => {
                res.json({
                    'GET /metrics': 'get metrics data',
                });
            });
            app.listen(port, () => {
                console.log(`Example app listening on port ${port}`);
            });
            SignalHandler(logger).listenINT().listenQUIT().listenTERM();
        },
    };
};

export default Server;
