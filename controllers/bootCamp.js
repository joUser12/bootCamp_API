const ErrorResponse=require('../utils/errorResponse')
const bootcamp=require('../models/bootCamp');
const asyncHandler=require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc Get all bootcamp
// @route Get /api/v1/bootcamp
// @access public
exports.getBootCamps= asyncHandler(  async (req,res,next)=>{
   
    
        var  value = await bootcamp.find(); 
    // res.status(200).json({success:true,message:"get all user "}) 
    res.status(200).json({
        success:true,
        count:value.length,
        data:value
       
    })

  
});

// @desc Get single bootcamp
// @route Get /api/v1/bootcamp/1
// @access public
exports.getBootCamp= asyncHandler( async (req,res,next)=>{
  
        var userbyid= await bootcamp.findById(req.params.id);
        if(!userbyid)
        // res.status(404).json({success:false})
        next(new ErrorResponse(`user not found with id of ${req.params.id}`),400)
        res.status(200).json({
            success:true,
            data:userbyid
        })
        // res.status(200).json({success:true,message:`get id by user ${req.params.id}`})



  
 
});


exports.createBootcamp = asyncHandler  (async (req,res,next)=>{

        try {
            console.log(req.body,"data 01");
            // const  userData= await bootcamp.create(req.body);
            res.status(200).json({
                success:true,
                data:"userData"
            });
        } catch(err) {
            console.log(err,"data errr");
        }

        
});



// @desc update  bootcamp
// @route PUT  /api/v1/bootcamp/1
// @access public
exports.updateBootcamp= asyncHandler( async (req,res,next)=>{
   
          var userUpdate= await bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if(!userUpdate)
        next(new ErrorResponse(`user not found with id of ${req.params.id}`),400)
        // res.status(400).json({success:false })  
        res.status(200).json({success:true,data:userUpdate})
 
});
// @desc Delete bootcamp
// @route Delete /api/v1/bootcamp/1
// @access public
exports.deleteBootcamp= asyncHandler( async (req,res,next)=>{
        var userDelete=await bootcamp.findByIdAndDelete(req.params.id);
        if(!userDelete)
        next(new ErrorResponse(`user not found with id of ${req.params.id}`),400)
        // res.status(400).json({success:false })
        // res.status(200).json({success:true,message:`delelte by user ${req.params.id}`})
        res.status(200).json({success:true,data:{}})
 
});


// @desc Get bootcamp within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access public
// exports.getBootcampInRadius= asyncHandler( async (req,res,)=>{
//  const {zipcode,distance} = req.params;

// //  Get lat\lng from geocoder
// const loc = await geocoder.geocode(zipcode);
// const lat = loc[0].latitude;
// const lng = loc[0].longitude;

// // calc radius using radians 
// // divide dist by radius of earth

// // earth Raduis = 

// const radius = distance/3963;

// const bootCamps =await bootcamp.find({
//     location:{ $geoWithin:{$centerSphere : [[lng,lat],radius]}}
// })
// res.status(200).json({
//     success:true,
//     count:bootCamps.length,
//     data:bootCamps
// })


// }); 


// @desc fileupload
// @route Delete /api/v1/user/1
// @access public
exports.photoUpload= asyncHandler( async (req,res,next)=>{
 
    var userDelete=await bootcamp.findById(req.params.id);
    // if(!userDelete)
    // next(new ErrorResponse(`user not found with id of ${req.params.id}`),400)
   
    console.log(req.files);
    
    if(!req.files){
        next(new ErrorResponse(`please upload a file`),400)
    }
    const filess= req.files
    if(!filess.mimetype.startsWith('image')){
        next(new ErrorResponse(`please upload image`),400)
    }



    

});