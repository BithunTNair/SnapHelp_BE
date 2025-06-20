const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    service: {
        type: mongoose.Types.ObjectId,
        ref: 'services'
    },
    serviceProvider: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    address: {
        type: String
    },
    bookedOn: {
        type: Date,
        default: Date.now()
    },
    timeSlot: {
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid'
    }
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking