const express = require('express');
const router = express.Router();
const membershipPlanController = require('../controllers/MembershipPlanController');

router
  .route('/')
  .get(membershipPlanController.getMembershipPlan)
  .post(membershipPlanController.cerateMembershipPlan);

router
  .route('/:planId')
  .get(membershipPlanController.getMembershipPlanById)
  .patch(membershipPlanController.updateMembershipPlan)
  .delete(membershipPlanController.deleteMembershipPlan);

module.exports = router;
