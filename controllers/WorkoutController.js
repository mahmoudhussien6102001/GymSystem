const Workout  = require ('./../models/workOut') ;
const  catchAsync = require ('./../utils/catchAsync') ;
const ApiError = require('./../utils/ApiError') ;
 




exports.getWorkOut = catchAsync(async (req,res,next)=>{
   
    const workOut = await Workout.find({ userId: req.user.userId}) ;
    if(!workOut){
        next (new ApiError('not fount Workout' ,404))
    }
    res.status(200).json({
        status : 'success',
        data :{
            workOut : workOut
        }
    })
})


exports.createWorkout =catchAsync(async(req,res)=>{
    const {exercises} = req.body;
    const newWorkout = await Workout.create({ userId: req.user.userId, exercises }) ;
    res.status(200).json({
        status : 'success',
        data :{
            workOut : workOut
        }
    })
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
            workOut: updatedWorkout
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
            workOut: workout
        }
    });
});
