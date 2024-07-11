const mongoose = require('mongoose');
const ClassSchema = mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
  trainerId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true 
    },
  date: { 
    type: Date,
     required: true 
    },
  capacity: {
     type: Number,
      required: true 
    }
});

Class = mongoose.model('Class', ClassSchema);
module.exports=Class ;
