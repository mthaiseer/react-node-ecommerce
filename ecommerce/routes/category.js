const express = require('express');
const router = express.Router();
const {userById} = require('../controllers/user')
const {
    requireSigninMiddleware, 
    isAuth, 
    isAdmin
} = require('../controllers/auth')
const {
    createCategory, 
    findCategoryById, 
    categoryById, 
    updateCategory, 
    deleteCategory,
    findAllCategory
} =  require('../controllers/category')
const {categoryCreateValidator} = require('../validators/index')

router.get('/category', findAllCategory);
router.get('/category/:categoryId', findCategoryById)
router.put('/category/:categoryId/:userId',[ requireSigninMiddleware,isAuth, isAdmin], updateCategory)
router.post('/category/:userId', [categoryCreateValidator, requireSigninMiddleware,isAuth, isAdmin], createCategory);
router.delete('/category/:categoryId/:userId',  [requireSigninMiddleware,isAuth, isAdmin], deleteCategory)

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports =  router;