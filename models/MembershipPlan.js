const mongoose = require('mongoose');
const MembershipPlanSchema = mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
  duration: { 
    type: Number, 
    required: true 
}, 
  price: {
     type: Number
     , required: true
     }
});

const MembershipPlan= mongoose.model('MembershipPlan', MembershipPlanSchema);
module.exports =MembershipPlan;
