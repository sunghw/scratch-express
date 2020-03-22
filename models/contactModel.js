import mongoose from 'mongoose';

// Setup schema
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    age: Number,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Contact model

export const Contact = mongoose.model('contact', contactSchema);
// this is making model.find method to be available.. lets see how its used in app.js / controller.
// module.exports.get = function (callback, limit) { 
//     Contact.find(callback).limit(limit);
// }