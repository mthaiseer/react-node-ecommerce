const express = require('express');
const router = express.Router();
//controller 
const {requireSigninMiddleware, isAuth, isAdmin} = require('../controllers/auth')
const {userById, productById} = require('../controllers/user');
const {
    createProduct, 
    findProductById, 
    deleteProduct, updateProduct, 
    listProduct, 
    relatedProducts, 
    productCategories,
    productSearchByFilter,
    photo,
    listSearch
} = require('../controllers/product')

router.get('/product/photo/:productId', photo)
router.post('/product/by/search', productSearchByFilter)
router.get('/product/search', listSearch)
router.get('/product/categories', productCategories)
router.get('/product/related/:productId', relatedProducts)
router.get('/product', listProduct)
router.post('/product/:userId', [requireSigninMiddleware,isAuth, isAdmin], createProduct);
router.get('/product/:productId', findProductById);
router.delete('/product/:productId/:userId', [requireSigninMiddleware,isAuth, isAdmin], deleteProduct);
router.put('/product/:productId/:userId', [requireSigninMiddleware,isAuth, isAdmin], updateProduct);

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
router.param('productId', productById);
module.exports = router;