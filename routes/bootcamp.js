const expres = require('express');

const {getBootCamp,getBootcampInRadius,getBootCamps,createBootcamp,updateBootcamp,deleteBootcamp ,photoUpload}= require('../controllers/bootCamp')

const {protect} =require('../middleware/auth')
const router=expres.Router();

// Include other resource routers
const courseRouter = require('./course')



// router.route('/radius/:zipcode/:distance').get(getBootcampInRadius)
// Re-route into other resource routers

router.use('/:bootcampId/courses',courseRouter);

router.route('/').get(getBootCamps)
// router.route('/add').put(createBootcamp);

router.route('/:id').get(getBootCamp).put(protect,updateBootcamp).delete(protect,deleteBootcamp)

router.route('/:id/:photo').put(photoUpload);

// router.get('/',(req,res)=>{
//     // res.send({id:1,name:'joy'})
//     // res.status(200).json({success:true,data:{id:1,name:'joy'}})
   
// });
// router.get('/:id',(req,res)=>{
//     res.status(200).json({success:true,message:`get id by user ${req.params.id}`})
// })

// post 
// router.post('/',(req,res)=>{
//     console.log(req.body);
//      const  userData=  bootcamp.create(req.body);
//             res.status(200).json({
//                 success:true,
//                 data:userData
//             });
// })

// router.put('/:id',(req,res)=>{
//     res.status(200).json({success:true,message:`update by user ${req.params.id}`})
// })

// router.delete('/:id',(req,res)=>{
//     res.status(200).json({success:true,message:`delelte by user ${req.params.id}`})
// })

module.exports=router