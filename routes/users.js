const express = require('express');
const { serviceList, addReview, getUserBookings, updateReview, deleteReview, bookService } = require('../controller/userController');

const router = express.Router();

router.get('/list', serviceList);
router.post('/addReview/:id', addReview);
router.put('/updateReview/:id', updateReview);
router.delete('/deleteReview/:id', deleteReview);
router.get('/bookings/:id', getUserBookings);
router.post('bookService', bookService)

module.exports = router;