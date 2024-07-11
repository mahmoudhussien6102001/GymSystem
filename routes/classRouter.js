const express = require('express');
const router = express.Router();
const classController = require('../controllers/ClassController');

router
  .route('/')
  .get(classController.getClass)
  .post(classController.createClass);

router
  .route('/:classId')
  .get(classController.getClassById)
  .patch(classController.updateClass)
  .delete(classController.deleteClass);

module.exports = router;
