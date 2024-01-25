import process from 'process';
const SignalHandler = ({ logger, timeoutSecond, shutdownCallbacks }) => {
    const sigListener = async(signal) => {
        logger.info(
            `Received ${signal}, gracefully shutting down...`
        );
        setTimeout(() => {
            logger.error('Graceful shutdown failed, forcefully shutting down');
            process.exit(1);
        }, timeoutSecond * 1000);
        for (const callback of shutdownCallbacks) {
            await callback();
        }
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
