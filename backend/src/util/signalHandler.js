import process from 'process';
const SignalHandler = ({ logger, timeoutSecond, shutdownCallback }) => {
    const sigListener = (signal) => {
        logger.info(`SIGNAL: ${signal} Received terminate, graceful gracefully shutting down...`);
        setTimeout(() => {
            logger.error('Graceful shutdown failed, forcefully shutting down')
            process.exit(1);
        }, timeoutSecond * 1000);
        shutdownCallback();
        process.exit(0);
    };
    return {
        listenINT() {
            process.on('SIGINT', sigListener);
            return this;
        },
        listenTERM() {
            process.on('SIGTERM', sigListener);
            return this;
        },
        listenQUIT() {
            process.on('SIGQUIT', sigListener);
            return this;
        },
    };
};
export default SignalHandler;
