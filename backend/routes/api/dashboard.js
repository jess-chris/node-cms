const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');

const { User, Post, Page } = require('../../db/models');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async (req, res, next) => {

  console.log(req.body);

  return res.json({ message: "OK"});


}));


module.exports = router;