const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();
router.post('/bookings', authMiddleware.verifyJsonWebTokenMiddleware , bookingController.createBooking);
router.get('/bookings', authMiddleware.verifyJsonWebTokenMiddleware ,bookingController.getBookings);
router.put('/bookings/:bookingId', authMiddleware.verifyJsonWebTokenMiddleware, bookingController.updateBooking);
router.delete('/bookings/:bookingId',authMiddleware.verifyJsonWebTokenMiddleware, bookingController.deleteBooking);
module.exports = router;
