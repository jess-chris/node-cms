const { check, validationResult } = require('express-validator');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .trim().escape()
    .isEmail().normalizeEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 32 })
    .withMessage('Please provide a username with at least 3 characters and no more than 32.'),
  check('username')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric only.'),
  check('username')
    .not().isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.'),
  handleValidationErrors
];


const validateLogin = [
  check('username')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid username.'),
  check('password')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a password."),
  handleValidationErrors
];


function handleValidationErrors(req, _res, next) {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
  validateSignup,
  validateLogin
};