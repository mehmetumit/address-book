import express from 'express';
import process from 'process';
import promBundle from 'express-prom-bundle';

const app = express();
const port = 3000;
const promMiddleware = promBundle({
    includeUp: true,
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
});

app.use(promMiddleware);

app.get('/', (req, res) => {
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
