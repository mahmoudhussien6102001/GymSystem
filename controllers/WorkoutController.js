const Workout = require('../models/workOut');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

exports.getWorkout = catchAsync(async (req, res, next) => {
    const workouts = await Workout.find({ userId: req.user._id });

    if (!workouts) {
        return next(new ApiError('No workouts found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            workouts
        }
    });
});

exports.createWorkout = catchAsync(async (req, res) => {
    const { exercises } = req.body;
    const newWorkout = await Workout.create({ userId: req.user._id, exercises });

    res.status(200).json({
        status: 'success',
        data: {
            workout: newWorkout
        }
    });
});

exports.updateWorkout = catchAsync(async (req, res, next) => {
    const { workoutId } = req.params;
    const { exercises } = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, { exercises }, { new: true });

    if (!updatedWorkout) {
        return next(new ApiError('Workout not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            workout: updatedWorkout
        }
    });
});

exports.deleteWorkout = catchAsync(async (req, res, next) => {
    const { workoutId } = req.params;

    const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

    if (!deletedWorkout) {
        return next(new ApiError('Workout not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getWorkoutById = catchAsync(async (req, res, next) => {
    const { workoutId } = req.params;

    const workout = await Workout.findById(workoutId);

    if (!workout) {
        return next(new ApiError('Workout not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            workout
        }
    });
});
