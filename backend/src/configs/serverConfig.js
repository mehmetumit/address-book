import DotenvFlow from 'dotenv-flow';
DotenvFlow.config();

const ServerConfig = {
    port: process.env.HTTP_PORT || 3000,
    shutdownTimeout: process.env.SHUTDOWN_TIMEOUT || 10,
};
export default ServerConfig;
