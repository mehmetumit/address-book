import mongoose from 'mongoose';
import {
    ContactNotFound,
    NameExistsError,
} from '../../core/common/errors/contactError.js';
import { DatabaseError } from '../../core/common/errors/internalError.js';
import { ContactModel } from './models/contactModel.js';
const ContactRepository = ({ logger, dbConfig }) => {
    let connection;
    const throwErrIfNotConnected = () => {
        // 0: disconnected
        // 1: connected
        // 2: connecting
        // 3: disconnecting
        if (mongoose.connection.readyState != 1) {
            throw new DatabaseError();
        }
    };
    return {
        conntectToDb() {
            mongoose.connection.on('disconnected', () =>
                logger.info('Database connection closed')
            );
            mongoose.connection.on('connected', () =>
                logger.info('Database connection established')
            );
            mongoose
                .connect(dbConfig.dbUrl)
                .then((conn) => {
                    connection = conn;
                })
                .catch((err) => {
                    //Initial connection failed
                    logger.info('Database connection not established');
                    logger.error(err);
                });
        },
        async shutdown() {
            try {
                if (connection) {
                    await connection.disconnect();
                } else {
                    logger.info('Database connection not exists to close');
                }
            } catch (err) {
                logger.info(err.name);
            }
        },
        async findAll(queryData) {
            throwErrIfNotConnected();
            let dbQuery = {};
            if (queryData?.name !== undefined) {
                dbQuery.name = {
                    $regex: `.*${queryData.name}.*`,
                    $options: 'i',
                };
            }
            if (queryData?.address !== undefined) {
                dbQuery.address = {
                    $regex: `.*${queryData.address}.*`,
                    $options: 'i',
                };
            }
            if (queryData?.phone !== undefined) {
                dbQuery.phone = {
                    $regex: `.*${queryData.phone}.*`,
                    $options: 'i',
                };
            }
            if (queryData?.email !== undefined) {
                dbQuery.email = {
                    $regex: `.*${queryData.email}.*`,
                    $options: 'i',
                };
            }
            if (queryData?.mobilePhone !== undefined) {
                dbQuery.mobilePhone = {
                    $regex: `.*${queryData.mobilePhone}.*`,
                    $options: 'i',
                };
            }

            return await ContactModel.find(dbQuery);
        },
        async getById(id) {
            throwErrIfNotConnected();
            const contact = await ContactModel.findById(id);
            if (!contact) throw new ContactNotFound();
            return contact;
        },
        async updateById({ id, contactData }) {
            throwErrIfNotConnected();
            try {
                const contact = await ContactModel.findByIdAndUpdate(
                    id,
                    contactData
                );
                if (!contact) throw new ContactNotFound();
                logger.debug({
                    UpdatedContact: contact,
                });
            } catch (err) {
                // Handle unique name error
                // Error code 11000 means duplicate in mogodb
                logger.error(err);
                if (err?.code === 11000) {
                    throw new NameExistsError();
                }
                throw err;
            }
        },
        async create(contactData) {
            throwErrIfNotConnected();
            try {
                return await ContactModel.create(contactData);
            } catch (err) {
                // Handle unique name error
                // Error code 11000 means duplicate in mogodb
                logger.error(err);
                if (err?.code === 11000) {
                    throw new NameExistsError();
                }
                throw err;
            }
        },
        async delete(id) {
            throwErrIfNotConnected();
            const isDeleted = await ContactModel.findOneAndDelete(id);
            if (!isDeleted) throw new ContactNotFound();
        },
    };
};
export default ContactRepository;
