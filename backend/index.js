import express from 'express';
import process from 'process';
import promBundle from 'express-prom-bundle';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs'
import YAML from 'yaml'

const app = express();
const router = express.Router()
const port = 3000;
const file = fs.readFileSync('../api/swagger.yaml', 'utf8')
const swaggerDoc = YAML.parse(file)
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
app.use('/v1', router)
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
