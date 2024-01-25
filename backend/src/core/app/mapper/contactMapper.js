const ContactMapper = (logger) => {
    return {
        mapToDomainModel(dbModel) {
            return {
                name: dbModel?.name,
                address: dbModel?.address,
                phone: dbModel?.phone,
                email: dbModel?.email,
                mobilePhone: dbModel?.mobilePhone,
            };
        },
        mapDbToResponseModel(dbModel) {
            return {
                id: dbModel?._id,
                name: dbModel?.name,
                address: dbModel?.address,
                phone: dbModel?.phone,
                email: dbModel?.email,
                mobilePhone: dbModel?.mobilePhone,
            };
        },
        // Might seem like not doing anything, but adding new properties will be easier if we want to
        // In order to do that, we just need to edit this method instead of random places in codebase
        mapToDbModel(domainModel) {
            return {
                name: domainModel.getName(),
                address: domainModel.getAddress(),
                phone: domainModel.getPhone(),
                email: domainModel.getEmail(),
                mobilePhone: domainModel.getMobilePhone(),
            };
        },
    };
};
export default ContactMapper;
