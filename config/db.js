const mongoose=require('mongoose');

const connectDB= async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        // useCreateIndex:true,
        // useFindAndModify:false,
        // useUnifiedTopoloy:true,
       
    },err=>{
        if(err)
        console.log(err);
    });
    console.log(conn);
    console.log(`mongo db connected`.bgGreen.bold);

    // console.log(`mongoDB connected:${mongoose.connection.host} `);
}
console.log(connectDB,"hi");

module.exports=connectDB;