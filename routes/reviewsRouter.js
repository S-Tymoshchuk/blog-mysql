const express = require('express');
const reviewsController = require('../controllers/reviewsController')
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/:postId', reviewsController.getReviews);
router.post('/create', authController.protect, reviewsController.createReview);
router.patch('/update/:id', authController.protect, reviewsController.updateReview)
router.delete('/delete/:id', authController.protect, reviewsController.deleteReview);


module.exports = router;