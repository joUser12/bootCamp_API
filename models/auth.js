const mongoose=require('mongoose');
const slugify=require('slugify');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const AuthSchema= new mongoose.Schema({
    name:{type:String,required:[true]},
    email:{type:String,required:[true],unique:true,match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]},
    role:{type:String,enum:['user','publisher'],
default:'user'},
password:{type:String,required:[true],minlength:6},
resetPasswordToken:String,
resetPasswordExpire:Date,
createdAt:{
    type:Date,
    default:Date.now
}
});

// Encrypt password using bycrypt js

AuthSchema.pre('save',async function (next){
    const salt= await  bcrypt.genSaltSync(10);
    this.password= await bcrypt.hashSync(this.password,salt);
})

// signin JWT and return

AuthSchema.methods.getSignedJwtToken= function() {
    return jwt.sign({id:this._id},process.env.JWT_TOKEN,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
// match user entered to hashed password in database

AuthSchema.methods.isMatchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


module.exports= mongoose.model('authentication',AuthSchema)