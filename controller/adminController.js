const USERS = require('../models/userModel');
const SERVICES = require('../models/serviceModel');
const BOOKINGS = require('../models/bookingModel');


const userList = async (req, res) => {
    try {
        const list = await USERS.find({ role: "user" });
        return res.status(200).json({ message: 'list of users', list })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const serviceProviders = async (req, res) => {
    try {
        const list = await USERS.find({ role: "serviceProvider" });
        return res.status(200).json(list)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const approveServiceProviders = async (req, res) => {
    try {
        const  providerId  = req.params.id;
        const provider = await USERS.findById(providerId);
        if (!provider || provider.role !== 'serviceProvider') {
            return res.status(404).json({ message: 'Service provider not found' });
        }
        provider.serviceProvider.isApproved = true;
        provider.serviceProvider.status = 'approved';
        await provider.save();
        res.status(200).json({ message: 'Service provider approved', provider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'something went wrong' });
    }
}

const addService = async (req, res) => {
    try {
        const service = await SERVICES.create(req.body);
        return res.status(201).json(service);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'something went wrong' })
    }

};

const getAllServices = async (req, res) => {
    try {
        const serviceList = await SERVICES.find();
        return res.status(200).json(serviceList)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const getBookedServices = async (req, res) => {
    try {
        const bookedServices = await SERVICES.find({ isBooked: true });
        if (!bookedServices) {
            return res.status(404).json({ message: 'No service is booked' });
        }
        return res.status(200).json(bookedServices)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const getCompletedTasks = async (req, res) => {
    try {
        const completedTasks = await BOOKINGS.find({ status: 'completed' })
            .populate('user', 'fullName email')
            .populate('serviceProvider', 'fullName email')
            .populate('service', 'serviceType rate');
        if (!completedTasks || completedTasks.length === 0) {
            return res.status(404).json({ message: 'No completed tasks found' });
        }
        return res.status(200).json(completedTasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'something went wrong' });
    }
};


module.exports = { userList, serviceProviders, approveServiceProviders, addService, getAllServices, getBookedServices,getCompletedTasks }