import DotenvFlow from 'dotenv-flow';
DotenvFlow.config();

const ServerConfig = {
    port: process.env.HTTP_PORT,
    shutdownTimeout: process.env.SHUTDOWN_TIMEOUT,
};
export default ServerConfig;
