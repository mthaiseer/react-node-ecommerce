const express = require('express');
const router = express.Router();
//controller 
const {requireSigninMiddleware, isAuth, isAdmin} = require('../controllers/auth')
const {userById, userProfile, updateProfile} = require('../controllers/user')

/**
 * Route for load user details if GET http://localhost:8000/secret/<id> 
 * when above URL called router.param will be cicked off 
 */
router.get('/secret/:userId', [requireSigninMiddleware,isAuth, isAdmin], userProfile)

router.get('/user/:userId', [requireSigninMiddleware,isAuth], userProfile);

router.put('/user/:userId', [requireSigninMiddleware,isAuth], updateProfile);


/**
 * Map the given param placeholder name(s) to the given callback(s).

Parameter mapping is used to provide pre-conditions to routes which use normalized placeholders. For example 
a :user_id parameter could automatically load a user's information from the database without any additional code,

The callback uses the samesignature as middleware, the only differencing being that the 
value of the placeholder is passed, in this case the id of the user. Once the next() function is invoked, 
just like middleware it will continue on to execute the route, or subsequent parameter functions.
See Documentation 
 */
router.param('userId', userById);

module.exports = router;