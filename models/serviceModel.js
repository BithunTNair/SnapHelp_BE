const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceType: {
        type: String,
        required: true
    },
    serviceProvider: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    bookedDate: {
        type: Date,
        required:true
    }
});

const services = mongoose.model('services', serviceSchema);
module.exports = services;