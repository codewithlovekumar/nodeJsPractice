const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'na'],
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: false
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
