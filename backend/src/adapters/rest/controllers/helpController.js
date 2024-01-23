const HelpController = () => {
    return {
        getHelp(req, res) {
            res.status(200).json({
                '/metrics': 'get metrics data',
                'doc/': 'get api doc',
            });
        },
    };
};

export default HelpController;
