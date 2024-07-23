const MembershipPlan = require('./../models/MembershipPlan');
const  catchAsync = require ('./../utils/catchAsync') ;
const ApiError = require('./../utils/ApiError') ;


exports.getMembershipPlan =catchAsync(async(req,res,next)=>{

    const Members = await MembershipPlan.find({});
    if(!MembershipPlan) {
        next (new ApiError('not fount MembershipPlan' ,404))
    }
    res.status(200).json({
        status:'success' ,
        result:Members.length,
        data :{
            data :Members
        }

    })

});


exports.cerateMembershipPlan = catchAsync(async(req,res)=>{
    const members = await MembershipPlan.create(req.body) ;

    res.status(200).json({
        status:'success' ,
        data :{
            data :members
        }

    })
});

exports.updateMembershipPlan = catchAsync(async (req, res, next) => {
    const { planId } = req.params;
    const { name, price, description } = req.body;

    const updatedPlan = await MembershipPlan.findByIdAndUpdate(planId, { name, price, description }, { new: true });

    if (!updatedPlan) {
        return next(new ApiError('Membership plan not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedPlan
        }
    });
});
exports.deleteMembershipPlan = catchAsync(async (req, res, next) => {
    const { planId } = req.params;

    const deletedPlan = await MembershipPlan.findByIdAndDelete(planId);

    if (!deletedPlan) {
        return next(new ApiError('Membership plan not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
exports.getMembershipPlanById = catchAsync(async (req, res, next) => {
    const { planId } = req.params;

    const membershipPlan = await MembershipPlan.findById(planId);

    if (!membershipPlan) {
        return next(new ApiError('Membership plan not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: membershipPlan
        }
    });
});
