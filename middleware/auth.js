const ErrorResponse=require('../utils/errorResponse')
const User=require('../models/auth');
const asyncHandler=require('../middleware/async');
const jwt =require('jsonwebtoken');


// protect routes

exports.protect = asyncHandler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token =req.headers.authorization.split(" ")[1];
    }
    // make sure token

    if(!token) return next(new ErrorResponse('Not authorize to access this route',401));

    try{
        const decoded = jwt.verify(token,process.env.JWT_TOKEN);
        req.user= await User.findById(decoded.id)
        next();
    }
    catch (err){ 
    }
})

// Grant access to specific roles

exports.authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(`user role ${req.user.role} is not authorized to access this route `,403));

        }
    }
}