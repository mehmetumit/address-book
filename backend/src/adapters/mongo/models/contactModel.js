import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
//Validations handled in core domain
//Just need to make sure name is unique
const contactSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4},
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    mobilePhone: {
        type: String,
    },
    email: {
        type: String,
    },
});
const ContactModel = mongoose.model('ContactModel', contactSchema);
const schemaObj = contactSchema.obj;
//Export schema obj
export { ContactModel, schemaObj };
