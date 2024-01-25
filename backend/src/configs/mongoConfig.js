import DotenvFlow from 'dotenv-flow';
DotenvFlow.config();

const MongoConfig = {
    //${Username}:${Password}@host:port/db_name
    dbUrl: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`,
};
export default MongoConfig;
