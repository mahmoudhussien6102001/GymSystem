const mongoose = require('mongoose');
const SubscriptionSchema = mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
     },
  planId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'MembershipPlan',
     required: true 
    },
  startDate: { 
    type: Date, 
    default: Date.now 
},
  endDate: { 
    type: Date, 
    equired: true
 }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription;
