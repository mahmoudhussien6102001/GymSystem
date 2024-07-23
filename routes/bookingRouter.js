const express = require('express');
const router = express.Router();
const bookingController = require('./../controllers/bookingController');
const authController =require('./../controllers/authController');

router.use(authController.protect);
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
