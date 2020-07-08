const express = require('express');
const router = express.Router();
const {requireSigninMiddleware, isAuth} = require('../controllers/auth')
const {userById} = require('../controllers/user');
const {generateToken, processPayment} = require('../controllers/braintree');

router.get("/braintree/getToken/:userId", [requireSigninMiddleware, isAuth], generateToken)
router.post("/braintree/payment/:userId", [requireSigninMiddleware, isAuth], processPayment)

router.param("userId", userById)

module.exports = router;