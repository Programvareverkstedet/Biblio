const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter'),
  bookRouter = require('./bookRouter'),
  borrowRouter = require('./borrowRouter');

// logger
router.use(function(req, res, next) {
  if (req.user) {
    console.log("User %s: %s %s", req.user.username, req.method, req.url);
  } else {
    console.log('%s %s', req.method, req.url);
  }
  next();
});

router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/borrow', borrowRouter);

module.exports = router