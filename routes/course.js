const expres= require('express');

const {getCourses,getCourse}= require('../controllers/course')

// const {protect} =require('../middleware/auth')
const router=expres.Router({mergeParams:true});

router.route('/').get(getCourses)
router.route('/:id').get(getCourse)

module.exports=router