const express =require('express');
const dotenv =require('dotenv').config({path:'./config/config.env'});
// const logger=require('./middleware/logger'); changed as morgan
const cookie_parser= require ('cookie-parser');
const colors = require('colors');
const morgan=require('morgan');
const fileupload= require('express-fileupload');
const errorHandler=require('./middleware/error')
const connectDB=require('./config/db');
const cors=require('cors');

// connect Db

connectDB();


// load env vars 

// require('dotenv').config({path:'./config/config.env'});
// require('dotenv').config({ path: 'ENV_FILENAME' });

const app = express();
// cookie parser

app.use(cookie_parser());

// body parseer
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(cors())
app.use(cors({
    origin: true,
    credentials: true,
    methods: 'POST,GET,PUT,OPTIONS,DELETE' 
}));


// route files

const bootCampData=require('./routes/bootcamp')
const courseData=require('./routes/course')
const authdata = require('./routes/auth')

// run dev logger 
if(process.NODE_ENV==='development'){
    app.use(morgan('dev'));

}
// file upload
app.use(fileupload());



// app.use(logger);

// mount routes
app.use('/api/v1/bootcamp',bootCampData)
app.use('/api/v1/course',courseData)
app.use('/api/v1/auth',authdata)

app.use(errorHandler);









const PORT = process.env.PORT || 3000;

const server=app.listen(PORT,()=>{
    console.log(`server is runnig in ${process.env.NODE_ENV} node on port ${PORT}`);
})
// handle unhandled promise
process.on('unhandled',(err,promise)=>{
    console.log(`err:${err.message}`);
    server.close(()=>process.exit(1));
})
