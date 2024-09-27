const { body, validationResult } = require('express-validator');
const ContactUs =require('../models/Developer')

var validateUser = () => [
  body('developername')
    .trim()
    .not()
    .isEmpty()
    .withMessage(' DeveloperName can not be empty!')
    .bail()
    .isString()
    .withMessage(' DeveloperName should be a valid string!')
    .bail()
    .isLength({ min: 1, max: 1000 })
    .withMessage('DeveloperName length is should be in a valid range!')
    .bail(),
  
    // for email------
  body("email")
  .trim()
  .not()
  .isEmpty()
  .withMessage("Email can not be empty!")
  .bail()
  .isString()
  .withMessage("Email should be a valid string!")
  .bail()
  .isEmail()
  .withMessage("Input must be a valid email!")
  .bail(),
  
    body('Role')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Role field cannot be empty!')
    .bail()
    .isString()
    .withMessage(' Role be a valid string!')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Role must be between 2 and 100 characters long')
    .bail(),

    body('statuschecked')
.isBoolean()
.withMessage('Status must be a boolean (true or false)')
.bail()
.custom(value => {
  if (typeof value !== 'boolean') {
    throw new Error('Status must be true (checked) or false (unchecked)');
  }
  return true;
})
];

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },


module.exports = validateUser();