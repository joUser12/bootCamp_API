const fs =require('fs');
const mongoose=require('mongoose');
const colors =require('colors');
const dotenv=require('dotenv');

// load env vars
dotenv.config({path:'./config/config.env'});

// load models
const BootCamp=require('./models/bootCamp');
const course=require('./models/course');
const auth=require('./models/auth');

// connect Db

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    // useUnifiedTopoloy:true, 
});


// Read Json files

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/data/bootcamp.json`,'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/data/course.json`,'utf-8'));


// import into DB

const importData = async()=>{
    try{
        // await BootCamp.create(bootcamps);
        await course.create(courses);
        console.log(`Data imported `.green.inverse);
        process.exit();
    }
    catch(err){
console.log(err);
    }

}

// Delete Data

const deleteData = async()=>{
    try{
        await BootCamp.deleteMany()
        await course.deleteMany()
        console.log(`Data destroyed `.red.inverse);
        process.exit();
    }
    catch(err){
console.log(err);
    }

}

if(process.argv[2] === '-i'){
    importData();

}else if(process.argv[2] === '-d'){
    deleteData();
}

