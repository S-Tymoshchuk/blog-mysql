const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');


router.post('/createPost', authController.protect, authController.restrictTo('admin'), postController.createPost);
router.get('/posts', postController.getPosts);
router.patch('/update/:id', authController.protect, authController.restrictTo('admin'), postController.updatePost);
router.delete('/delete/:id', authController.protect, authController.restrictTo('admin'), postController.deletePost);

module.exports = router;