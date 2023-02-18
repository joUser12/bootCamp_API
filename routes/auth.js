const expres =require('express');
const {register, sigin, getMe} = require('../controllers/auth');

const {protect} =require('../middleware/auth')

const router =expres.Router();

router.route('/register').post(register)
router.route('/sigin').post(sigin);
router.route('/me').get(protect,getMe);

module.exports = router