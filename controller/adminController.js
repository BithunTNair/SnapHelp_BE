const USERS = require('../models/userModel');
const SERVICES = require('../models/serviceModel')


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

const addService = async (req, res) => {
    try {
        const service = await SERVICES.create(req.body);
        return res.status(201).json(service)
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
}

module.exports = { userList, serviceProviders, addService, getAllServices, getBookedServices }