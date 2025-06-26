const BOOKINGS= require('../models/bookingModel');
const REVIEW = require('../models/reviewModel');


const getAssignedServices = async (req, res) => {
    try {
        const providerId = req.params.id;
        if (!providerId) {
            return res.status(400).json({ message: 'Provider ID not found in request' });
        }
        const assignedBookings = await BOOKINGS.find({ serviceProvider: providerId })
            .populate('user', 'fullName email')
            .populate('service', 'serviceType rate');
        res.status(200).json({ assignedTasks: assignedBookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const addReview = async (req, res) => {
    try {
        const { bookingId, rating, comment } = req.body;
        const userId = req.params.id; 
        const booking = await BOOKINGS.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (booking.user.toString() !== userId) return res.status(403).json({ message: 'Not authorized' });
        if (booking.status !== 'completed') return res.status(400).json({ message: 'Can only review completed bookings' });
      
        const existing = await REVIEW.findOne({ booking: bookingId, user: userId });
        if (existing) return res.status(400).json({ message: 'Review already submitted' });
    
        const review = await REVIEW.create({
            booking: bookingId,
            user: userId,
            provider: booking.serviceProvider,
            rating,
            comment
        });
        res.status(201).json({ message: 'Review submitted', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getProviderReviews = async (req, res) => {
    try {
        const providerId = req.params.id;
        const reviews = await REVIEW.find({ provider: providerId })
            .populate('user', 'fullName')
            .populate('booking', 'service');
        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const providerId = req.params.id;
        const { bookingId, status } = req.body;
     
        const allowedStatuses = ['scheduled', 'completed', 'cancelled'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
      
        const booking = await BOOKINGS.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (booking.serviceProvider.toString() !== providerId) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        booking.status = status;
        await booking.save();
        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports={getAssignedServices, addReview, getProviderReviews, updateBookingStatus}