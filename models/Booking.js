const mongoose = require('mongoose');
const BookingSchema = mongoose.Schema({
  classId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Class', 
     required: true
     },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
 },
  date: { 
    type: Date, 
    default: Date.now
 }
});
const Booking= mongoose.model('Booking', BookingSchema);

module.exports= Booking  ; 

