const ErrorController = () => {
    return {
        genErrorStruct() {
            return {
                code: '400',
                message: '',
            };
        },
    };
};
export default ErrorController;
