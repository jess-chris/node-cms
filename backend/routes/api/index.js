const router = require('express').Router();
// const asyncHandler = require('express-async-handler');

const usersRouter = require('./users.js');
const sessionRouter = require('./session.js');
const dashboardRouter = require('./dashboard.js');

router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/dashboard', dashboardRouter);



module.exports = router;