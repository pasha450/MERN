const { body, validationResult } = require('express-validator');
const ContactUs =require('../models/Priority')

var validateUser = () =>[
body('name')
.trim()
.not()
.isEmpty()
.withMessage('Name can not be empty!')
.bail()
.isString()
.withMessage('Name should be a valid string!')
.bail()
.isLength({ min: 1, max: 1000 })
.withMessage('Name length is should be in a valid range!')
.bail(),

// for checked status ****//
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