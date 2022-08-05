const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const usersRouter = require('./users.js');

router.use('/users', usersRouter);



module.exports = router;