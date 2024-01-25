const DeleteContact = ({ logger, contactRepo }) => {
    return {
        async deleteContactById(id) {
            try {
                await contactRepo.delete(id);
            } catch (err) {
                logger.error(err);
                throw err;
            }
        },
    };
};
export default DeleteContact;
