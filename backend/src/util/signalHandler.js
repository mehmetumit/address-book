import process from 'process';
const SignalHandler = (logger) => {
    const sigListener = (signal) => {
        logger.info(`SIGNAL: ${signal} Received terminate, graceful shutdown.`);
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
