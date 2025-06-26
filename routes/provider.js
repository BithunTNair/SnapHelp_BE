const express = require('express');
const { getAssignedServices, updateBookingStatus } = require('../controller/providerController');

const router = express.Router();

router.get('/assignedServices', getAssignedServices);
router.post('/updateBookingStatus/:id', updateBookingStatus);

module.exports = router;