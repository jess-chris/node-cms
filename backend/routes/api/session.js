const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { validateLogin } = require('../../utils/validation');

const { User } = require('../../db/models');

const router = express.Router();


router.post('/', validateLogin, asyncHandler(async (req, res, next) => {

  const { username, password } = req.body;
  

  const user = await User.login({ username, password });


  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.json({ user });

}));


router.delete('/', (_req, res) => {

  res.clearCookie('token');
  return res.json({ message: 'OK'});

});


router.get('/', restoreUser, (req, res) => {

  const { user } = req;

  if (user) return res.json({ user: user.toSafeObject() });

  else return res.json({});

});






module.exports = router