import express from 'express';
import process from 'process';
import promBundle from 'express-prom-bundle';
import swaggerUi from 'swagger-ui-express';
import YamlParser from './util/yamlParser.js';
import Logger from './adapters/logger/logger.js';

const app = express();
const router = express.Router();
const port = 3000;
const logger = Logger();
logger.initLogger({
    outputTransports: logger.consoleTransport(),
    format: logger.prettyFormat(),
    level: logger.debugLevel(),
});
logger.info('Hello info')
logger.debug('Hello debug')
logger.error('Hello error')
const swaggerDoc = YamlParser(logger).parse('../api/swagger.yaml');
const promMiddleware = promBundle({
    includeUp: true,
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    customLabels: {
        project_name: 'address_book_backend',
        project_type: 'test_metrics_labels',
    },
    promClient: {
        collectDefaultMetrics: {},
    },
});

app.use(promMiddleware);
app.use('/v1', router);
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

router.get('/', (req, res) => {
    res.json({
        'GET /metrics': 'get metrics data',
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
function sigListener(signal) {
    console.log(`\nSIGNAL: ${signal} Received terminate, graceful shutdown.`);
    process.exit(0);
}
process.on('SIGINT', sigListener);
process.on('SIGTERM', sigListener);
process.on('SIGQUIT', sigListener);
