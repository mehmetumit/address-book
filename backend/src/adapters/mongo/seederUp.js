import mongoose from 'mongoose';
import MongoConfig from '../../configs/mongoConfig.js';
import ContactSeed from '../../core/seeds/contactSeed.js';
import { ContactModel } from './models/contactModel.js';

try {
    console.log('Trying to connect database...');
    await mongoose.connect(MongoConfig.dbUrl);
    console.log('Database connection established, seeding db...');
    await ContactModel.insertMany(ContactSeed);
    console.log('Database seeded successfully');
    mongoose.connection.close()
} catch (err) {
    console.log(err);
    mongoose.connection.close()
}
