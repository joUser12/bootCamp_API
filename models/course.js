const mongoose=require('mongoose');
const slugify=require('slugify');
const geocoder= require ('../utils/geocoder');


const CourseSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'please add a course']
    },
    description:{
        type:String,
        required:[true,'please add a description']
    },
    weeks:{
        type:String,
        required:[true,'please add a weeks']
    },
    tuition:{
        type: Number,
        required:[true,'please add a cost']
    },
    minimumSkill:{
        type: String,
        required:[true,'please add a minimumSkill'],
        enum :['beginner','intermediate','advanced']
    },
    scholarshipAvailable:{
        type: Boolean,
        default:true,
    },
    createdAt:{
        type: Date,
        default:Date.now(),
    },
    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required:true
    },
     
});


module.exports = mongoose.model('course',CourseSchema)