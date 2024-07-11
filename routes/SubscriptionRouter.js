const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/SubscriptionController');

router
  .route('/')
  .get(subscriptionController.getSubscription)
  .post(subscriptionController.cerateSubscription);

router
  .route('/:subscriptionId')
  .get(subscriptionController.getSubscriptionById)
  .patch(subscriptionController.updateSubscription)
  .delete(subscriptionController.deleteSubscription);

module.exports = router;
