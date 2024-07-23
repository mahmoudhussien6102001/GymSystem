const Subscription = require('../models/Subscription');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

exports.getSubscriptions = catchAsync(async (req, res, next) => {
  const subscriptions = await Subscription.find({ userId: req.user._id }).populate('planId');

  if (!subscriptions.length) {
    return next(new ApiError('No subscriptions found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      subscriptions
    }
  });
});

exports.createSubscription = catchAsync(async (req, res) => {
  const { planId, startDate, endDate } = req.body;
  const newSubscription = await Subscription.create({
    userId: req.user._id,
    planId,
    startDate,
    endDate
  });

  res.status(201).json({
    status: 'success',
    data: {
      subscription: newSubscription
    }
  });
});

exports.updateSubscription = catchAsync(async (req, res, next) => {
  const { subscriptionId } = req.params;
  const { planId, startDate, endDate } = req.body;

  const updatedSubscription = await Subscription.findByIdAndUpdate(
    subscriptionId,
    { planId, startDate, endDate },
    { new: true, runValidators: true }
  );

  if (!updatedSubscription) {
    return next(new ApiError('Subscription not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      subscription: updatedSubscription
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
      subscription
    }
  });
});
