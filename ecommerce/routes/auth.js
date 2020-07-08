const express = require('express');
const router = express.Router();

const {userSignupValidator} = require('../validators/index')

//controller 
const {signup, signin, signout, requireSigninMiddleware} = require('../controllers/auth')

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/ping', requireSigninMiddleware,  (req ,  res)=>{
    res.send('Pinged to test auth')
})

module.exports = router;