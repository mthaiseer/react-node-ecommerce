const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHelper');
const jwt = require('jsonwebtoken');
const expressJwt  = require('express-jwt');

exports.signup = async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
    } catch (e) {
        return res.status(400).json({
            //error: errorHandler(e)
            error: 'Email is taken'
        })
    }

    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({
        user
    })

}

// using promise
// exports.signup = (req, res) => {
//     // console.log("req.body", req.body);
//     const user = new User(req.body);
//     user.save((err, user) => {
//         if (err) {
//             return res.status(400).json({
//                 // error: errorHandler(err)
//                 error: 'Email is taken'
//             });
//         }
//         user.salt = undefined;
//         user.hashed_password = undefined;
//         res.json({
//             user
//         });
//     });
// };

exports.signin = async (req, res) => {

    //use spread operator
    const {
        email,
        password
    } = req.body;

    //if email or password missing then return error 
    if (!email || !password) {
        return res.status(400).json({
            error: 'email or password is missing, please enter valid credentails'
        })
    }

    //get user from db 
    const user = await User.findOne({
        email
    });

    //if DB user not found return error 
    if (!user) {
        res.status(400).json({
            error: 'user account not found, please signup'
        })
    }

    //check user password and hashed password are matching 
    if (!user.validatePassword(password)) {
        return res.status(401).json({
            error: 'Email or password does not match'
        })
    }

    //all good then generate token 
    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET);
    //set cookie 
    res.cookie('t', token, {
        expire: new Date() + 9999
    });

    //clear sensitive data before sending to user (use lodash)
    user.hashed_password = undefined;
    user.salt = undefined;
    //return token and user object back to caller 
    return res.json({
        token,
        user
    });
}

exports.signout = (req, res) => {
    //remove cookie 
    res.clearCookie('t');
    res.json({
        message: 'signout was successful'
    })
}

exports.requireSigninMiddleware =  expressJwt({
    secret : process.env.JWT_SECRET,
    userProperty: 'auth'
});


/**
 * This restrict logged in user not permitted to fetch other user profiles
 */
exports.isAuth =  (req, res, next)=>{
    let user  = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        res.status(403).json({
            error : 'Access denied'
        })
    }
    next();
}

exports.isAdmin =  (req, res, next) =>{
    let admin = req.profile && req.profile.role === 1;
    if(!admin){
        res.status(403).json({
            error: 'Access denied! Admin resource'
        })
    }
    next();
}