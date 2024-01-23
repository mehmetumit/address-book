import swaggerUi from 'swagger-ui-express';

const SwaggerMiddleware = (swaggerDoc) => {
    return [swaggerUi.serve, swaggerUi.setup(swaggerDoc)];
};

export default SwaggerMiddleware;
