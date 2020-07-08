const express = require('express');
const router = express.Router();
const {requireSigninMiddleware, isAuth, isAdmin} = require('../controllers/auth')
const {userById, addOrderToUserHistory} = require('../controllers/user');
const {createOrder, listOrders, listOrderStatus} = require('../controllers/order');
const {decreaseOrderQuantity} = require('../controllers/product');

router.post("/order/create/:userId", [requireSigninMiddleware, isAuth, decreaseOrderQuantity, addOrderToUserHistory], createOrder);
router.get("/order/list/:userId", [requireSigninMiddleware, isAuth, isAdmin], listOrders)
router.get("/order/list-status/:userId", [requireSigninMiddleware, isAuth, isAdmin], listOrderStatus)

router.param("userId", userById)

module.exports = router;