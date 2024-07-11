const Class = require('../models/class');
const  catchAsync = require ('./../utils/catchAsync') ;
const ApiError = require('./../utils/ApiError') ;


exports.createClass = catchAsync(async(req,res)=>{
    const { name, trainerId, date, capacity } = req.body;
    const gymClass = await Class.create({ name, trainerId, date, capacity });
    res.status(200).json({
        status: 'success' ,
        data : {
            data :gymClass
        }
    })

});

exports.getClass =catchAsync(async(req,res,next)=>{
    const classes = await Class.find().populate('trainerId');
    if(!classes){
        next (new ApiError('not fount classes' ,404));
    }
    res.status(200).json({
        status: 'success' ,
        data : {
            data :classes
        }
    })
    
});


exports.updateClass = catchAsync(async (req, res, next) => {
    const { classId } = req.params;
    const { name, trainerId, date, capacity } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(classId, { name, trainerId, date, capacity }, { new: true });

    if (!updatedClass) {
        return next(new ApiError('Class not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedClass
        }
    });
});
exports.deleteClass = catchAsync(async (req, res, next) => {
    const { classId } = req.params;

    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
        return next(new ApiError('Class not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
exports.getClassById = catchAsync(async (req, res, next) => {
    const { classId } = req.params;

    const gymClass = await Class.findById(classId).populate('trainerId');

    if (!gymClass) {
        return next(new ApiError('Class not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: gymClass
        }
    });
});
