const ErrorResponse=require('../utils/errorResponse')
const course = require('../models/course');
const asyncHandler=require('../middleware/async');

// @desc Get all course
// @route Get /api/v1/course
// @route Get /api/v1/bootcamps/:bootcampId/courses
// @access public
exports.getCourses= asyncHandler(  async (req,res,next)=>{

    let query;
    if(req.params.bootcampId)query = course.find({bootcamp:req.params.bootcampId})
    else   query = course.find();
       
    var  courses = await query 
    res.status(200).json({
    success:true,
    count :courses.length,
    data:courses   
})
});

// @desc Get single course
// @route Get /api/v1/course/:id
// @access public
exports.getCourse= asyncHandler( async (req,res,next)=>{
  
    var courseid= await course.findById(req.params.id);
    if(!courseid)
    // res.status(404).json({success:false})
    next(new ErrorResponse(`course not found with id of ${req.params.id}`),400)
    res.status(200).json({
        success:true,
        data:courseid
    })



});