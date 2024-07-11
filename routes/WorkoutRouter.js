const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const WorkoutController = require('./../controllers/WorkoutController');

router.use(authController.protect);

router
  .route('/')
  .get(WorkoutController.getWorkOut)
  .post(WorkoutController.createWorkout);

router
  .route('/:workoutId')
  .get(WorkoutController.getWorkoutById)
  .patch(WorkoutController.updateWorkout)
  .delete(WorkoutController.deleteWorkout);

module.exports = router;
