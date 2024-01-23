import promBundle from 'express-prom-bundle';

const PromMiddleware = (promConfig) => {
    return promBundle(promConfig);
};
export default PromMiddleware;
