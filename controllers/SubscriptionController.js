const Subscription= require('./../models/Subscription');
const  catchAsync = require ('./../utils/catchAsync') ;
const ApiError = require('./../utils/ApiError') ;


exports.getSubscription =catchAsync(async(req,res,next)=>{

    const Subscription = await Subscription.find({ userId: req.user.userId }).populate('planId');
    if(!Subscription) {
        next (new ApiError('not fount Subscription' ,404))
    }
    res.status(200).json({
        status:'success' ,
        data :{
            data :Subscription
        }

    })

});


exports.cerateSubscription = catchAsync(async(req,res)=>{
    const { planId } = req.body;
  const plan = await MembershipPlan.findById(planId);

  if (!plan) {
    return res.status(400).json({ message: 'Invalid plan' });
  }

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + plan.duration);
    const Subscription = await Subscription.create({userId: req.user.userId,
        planId,
        endDate}) ;

    res.status(200).json({
        status:'success' ,
        data :{
            data :Subscription
        }

    })
});


exports.updateSubscription = catchAsync(async (req, res, next) => {
    const { subscriptionId } = req.params;
    const { planId } = req.body;

    const plan = await MembershipPlan.findById(planId);
    if (!plan) {
        return res.status(400).json({ message: 'Invalid plan' });
    }

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration);

    const updatedSubscription = await Subscription.findByIdAndUpdate(subscriptionId, {
        planId,
        endDate
    }, { new: true });

    if (!updatedSubscription) {
        return next(new ApiError('Subscription not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedSubscription
        }
    });
});
exports.deleteSubscription = catchAsync(async (req, res, next) => {
    const { subscriptionId } = req.params;

    const deletedSubscription = await Subscription.findByIdAndDelete(subscriptionId);

    if (!deletedSubscription) {
        return next(new ApiError('Subscription not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
exports.getSubscriptionById = catchAsync(async (req, res, next) => {
    const { subscriptionId } = req.params;

    const subscription = await Subscription.findById(subscriptionId).populate('planId');

    if (!subscription) {
        return next(new ApiError('Subscription not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: subscription
        }
    });
});
