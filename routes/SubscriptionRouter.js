const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/SubscriptionController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/')
  .get(subscriptionController.getSubscriptions)
  .post(subscriptionController.createSubscription);

router.route('/:subscriptionId')
  .get(subscriptionController.getSubscriptionById)
  .patch(subscriptionController.updateSubscription)
  .delete(subscriptionController.deleteSubscription);

module.exports = router;
