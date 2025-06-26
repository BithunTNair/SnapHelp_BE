const SERVICES = require('../models/serviceModel');
const REVIEWS = require('../models/reviewModel');
const BOOKINGS = require('../models/bookingModel');
const USERS = require('../models/userModel');

const serviceList = async (req, res) => {
    try {
        const list = await SERVICES.find();
        return res.status(200).json({ message: 'list of services', list })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'something went wrong' })
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

        const existing = await REVIEWS.findOne({ booking: bookingId, user: userId });
        if (existing) return res.status(400).json({ message: 'Review already submitted' });

        const review = await REVIEWS.create({
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

const updateReview = async (req, res) => {
    try {
        const userId = req.params.id;
        const { reviewId, rating, comment } = req.body;

        const review = await REVIEWS.findOne({ _id: reviewId, user: userId });
        if (!review) {
            return res.status(404).json({ message: 'Review not found or not authorized' });
        }

        if (rating !== undefined) review.rating = rating;
        if (comment !== undefined) review.comment = comment;

        await review.save();
        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const userId = req.params.id;
        const { reviewId } = req.body;

        const review = await REVIEWS.findOne({ _id: reviewId, user: userId });
        if (!review) {
            return res.status(404).json({ message: 'Review not found or not authorized' });
        }

        await REVIEWS.deleteOne({ _id: reviewId });
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const userId = req.params.id;
        const bookings = await BOOKINGS.find({ user: userId })
            .populate('service', 'serviceType rate')
            .populate('serviceProvider', 'fullName email');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const bookService = async (req, res) => {
    try {
        const { serviceId, serviceProviderId, date, address, notes } = req.body;
        const userId = req.params.id;

        const service = await SERVICES.findById(serviceId);
        if (!service) return res.status(404).json({ message: 'Service not found' });

        const provider = await USERS.findById(serviceProviderId);
        if (!provider) return res.status(404).json({ message: 'Service provider not found' });

        const booking = await BOOKINGS.create({
            user: userId,
            service: serviceId,
            serviceProvider: serviceProviderId,
            date,
            address,
            notes,
            status: 'pending'
        });

        res.status(201).json({ message: 'Service booked successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



module.exports = { serviceList, addReview, updateReview, deleteReview, getUserBookings, bookService };