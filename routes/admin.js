const express = require('express');
const { serviceProviders, userList, getBookedServices, addService, getAllServices } = require('../controller/adminController');
const router = express.Router();

router.get('/getAllServiceProviders', serviceProviders);
router.get('/getAllUsers', userList);
router.get('/getBookedServices', getBookedServices);
router.get('/addService', addService);
router.get('/getAllServices', getAllServices);





module.exports = router;