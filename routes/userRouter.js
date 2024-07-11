const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const uploadImage = require('../utils/uploadImage');

// Public routes
router.post('/signup', uploadImage.uploadImage,authController.signUp);
router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);


// Protect all routes after this middleware
router.use(authController.protect);

// Authenticated user routes
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.delete('/deleteMe', userController.deleteMe);

// Admin routes
router.use(authController.restrictTo('admin'));

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser); 

router.route('/:id')
    .get(userController.getUser) 
    .patch(userController.updateUser)
    .delete(userController.deleteUser); 

module.exports = router;
