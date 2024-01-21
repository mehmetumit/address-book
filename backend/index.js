import express from 'express';
import process from 'process';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
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
