const express = require('express');
const router = express.Router();
const classController = require('../controllers/ClassController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect,authController.restrictTo("admin","member"),classController.getClass)
  .post(authController.protect,authController.restrictTo('admin'),classController.createClass);
  
router.use(authController.protect,authController.restrictTo('admin'));
router
  .route('/:classId')
  .get(classController.getClassById)
  .patch(classController.updateClass)
  .delete(classController.deleteClass);

module.exports = router;
