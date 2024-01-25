import mongoose from 'mongoose';
import MongoConfig from '../../configs/mongoConfig.js';
import { ContactModel } from './models/contactModel.js';

try {
    console.log('Trying to connect database...');
    await mongoose.connect(MongoConfig.dbUrl);
    console.log('Database connection established, cleaning db...');
    await ContactModel.deleteMany({});
    console.log('Database cleaned successfully');
    mongoose.connection.close()
} catch (err) {
    console.log(err);
    mongoose.connection.close()
}
