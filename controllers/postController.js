const query = require('../constants/post.query');
const catchAsyncError = require('../utils/catchAsyncError');

exports.createPost = catchAsyncError(async (req, res, next) => {
  const post = await query.createPost(req.body);
  res.status(201).json({
    status: 'success',
    data: post
  })
})

exports.getPosts = catchAsyncError(async (req, res, next) => {
  const posts = await query.getPosts();
  res.status(200).json({
    status: 'success',
    data: posts
  })
})

exports.updatePost = catchAsyncError(async (req, res, next) => {
  await query.updatePost(req.body, req.params);
  res.status(200).json({
    status: 'success'
  })
})

exports.deletePost = catchAsyncError(async (req, res, next) => {
  await query.deletePost(req.params);
  res.status(200).json({
    status: 'success'
  })
})