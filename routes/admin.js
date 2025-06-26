const express = require('express');
const { serviceProviders, userList, getBookedServices, addService, getAllServices, approveServiceProviders, getCompletedTasks } = require('../controller/adminController');
const router = express.Router();

router.get('/getAllServiceProviders', serviceProviders);
router.get('/getAllUsers', userList);
router.get('/approveProvider',approveServiceProviders)
router.get('/getBookedServices', getBookedServices);
router.get('getcompletedTasks',getCompletedTasks)
router.get('/addService', addService);
router.get('/getAllServices', getAllServices);





module.exports = router;