const ErrorResponse=require('../utils/errorResponse')
const auth=require('../models/auth');
const asyncHandler=require('../middleware/async');



// @desc  user Register 
// @route Get /api/v1/auth/register
// @access public

exports.register=asyncHandler(async(req,res,next)=>{
    const {name,email,password,role} =req.body;
    const user= await auth.create({
        name,email,password,role
    })
    // create token
    const token = user.getSignedJwtToken();
  res.status(200).json({success:true,token});
});

// @desc  user login 
// @route Get /api/v1/auth/login
// @access public

exports.sigin=asyncHandler(async(req,res,next)=>{
  const {email,password} =req.body;
// validate email and password
  if(!email || !password)  return next (new ErrorResponse('plese enter the  username and password',400));
  // check user
  const user1= await auth.findOne({email}).select('+password');
if(!user1){
  return next (new ErrorResponse('invalid credentials',401)); 
}
const isMatch = await user1.isMatchPassword(password);
if(!isMatch)return next (new ErrorResponse('invalid credentials',401)); 

    // create token
    // const token = user1.getSignedJwtToken();
    sentTokenResponse(user1,200,res)

// res.status(200).json({success:true,token});
})

// Get token from model ,create cookie and send response

const sentTokenResponse= (user,statusCode,res)=>{
  const token= user.getSignedJwtToken();
  const options={
    expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
    httpOnly:true
  };

  if(process.env.NODE_ENV ==='production'){
    options.secure =true;

  }

  res.status(statusCode).cookie('token',token,options).json({success:true,token})
}

// @desc  user login 
// @route Get /api/v1/auth/me
// @access private

exports.getMe = asyncHandler (async(req,res,next)=>{
  const user= await auth.findById(req.user.id);

  res.status(200).json({
    success:true,
    data:user
  })
})

