const Booking = require('../models/Booking');
const Class = require('../models/class');
const  catchAsync = require ('./../utils/catchAsync') ;
const ApiError = require('./../utils/ApiError') ;



exports.createBooking = catchAsync(async(req,res,next)=>{
    const { classId } = req.body;
  const gymClass = await Class.findById(classId);

  if (!gymClass) {
    next (new ApiError('invalid booking class' ,404));
  }

  const existingBooking = await Booking.findOne({ classId, userId: req.user._id});
  if (existingBooking) {
    next (new ApiError('You have already booked this class',404));
  }

  const booking = await Booking.create({ classId, userId: req.user._id });
  res.status(200).json({
    status:'success' ,
    data :{
        data :booking
    }
  })
    

});


exports.getBooking = catchAsync(async(req,res,next)=>{
    const bookings = await Booking.find({ userId: req.user._id }).populate('classId');
    if(!bookings) {
        next (new ApiError('not found booking ' ,404));
    }
    res.status(200).json({
        status:'success' ,
        data :{
            data :bookings
        }
      })
})



exports.updateBooking = catchAsync(async (req, res, next) => {
    const { bookingId } = req.params;
    const { classId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
        return next(new ApiError('Booking not found', 404));
    }

    const gymClass = await Class.findById(classId);
    if (!gymClass) {
        return next(new ApiError('Invalid class ID', 404));
    }

    booking.classId = classId;
    await booking.save();

    res.status(200).json({
        status: 'success',
        data: {
            data: booking
        }
    });
});
exports.getBookingById = catchAsync(async (req, res, next) => {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId).populate('classId');
    if (!booking) {
        return next(new ApiError('Booking not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: booking
        }
    });
});
exports.deleteBooking = catchAsync(async (req, res, next) => {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
        return next(new ApiError('Booking not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
