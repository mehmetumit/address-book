const PromConfig = {
    includeUp: true,
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    customLabels: {
        project_name: 'address_book_backend',
        project_type: 'test_metrics_labels',
    },
    promClient: {
        collectDefaultMetrics: {},
    },
};
export default PromConfig;
