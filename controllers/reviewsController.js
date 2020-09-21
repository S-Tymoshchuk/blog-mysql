const query = require('../constants/review.query')
const catchAsyncError = require('../utils/catchAsyncError');


exports.createReview = catchAsyncError(async (req, res, next) => {
  req.body.userId = req.user.id;
  const review = await query.createReview(req.body);
  res.status(201).json({
    status: 'success',
    data: review
  })
})

exports.getReviews = catchAsyncError(async (req, res, next) => {
  const getReviews = await query.getReviews(req.params);
  res.status(200).json({
    status: 'success',
    data: getReviews
  })
})

exports.updateReview = catchAsyncError(async (req, res, next) => {
  await query.getUpdate(req.body, req.params);
  res.status(200).json({
    status: 'success'
  })
})
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  await query.getDelete(req.params);
  res.status(200).json({
    status: 'success'
  })
})