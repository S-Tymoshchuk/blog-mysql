const jwt = require('jsonwebtoken');
const {
  promisify
} = require('util');
const config = require('../config')
const query = require('../constants/user.query');
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/catchAsyncError');


exports.signUp = catchAsyncError(async (req, res, next) => {
  const user = await query.createUser(req.body);
  res.status(201).json({
    status: 'success',
    data: user
  })
});

exports.login = catchAsyncError(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email or password'))
  }
  const data = await query.login(req.body);
  if (data) {
    res.status(200).json({
      data
    })
  }
});

exports.protect = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You not logged in! Please log in to get access.')
    );
  }

  //Verification token
  const decoded = await promisify(jwt.verify)(token, config.jwtOptions.jwt_secret);
  const result = await query.findUser(decoded.id);
  if (!result) {
    return next(new AppError('User not find please log in'))
  }
  req.user = result[0]
  next()

})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to preform this action'))
    }
    next();
  };
};