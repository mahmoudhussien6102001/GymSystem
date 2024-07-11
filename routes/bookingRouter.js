const express = require('express');
const router = express.Router();
const bookingController = require('./../controllers/bookingController');

router
  .route('/')
  .get(bookingController.getBooking)
  .post(bookingController.createBooking);

router
  .route('/:bookingId')
  .get(bookingController.getBookingById)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
