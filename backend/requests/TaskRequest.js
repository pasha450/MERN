const { body, validationResult } = require('express-validator');
const ContactUs = require('../models/Task');

var validateUser = () => [
  body('ProjectName')
  .trim()
  .not()
  .isEmpty()
  .withMessage('ProjectName cannot be empty!')
  .isString()
  .withMessage('ProjectName should be a valid string!')
  .isLength({ min: 1, max: 1000 })
  .withMessage('ProjectName length should be in a valid range!')
  .bail(),

  
  body('Status')
.isBoolean()
.withMessage('Status must be a boolean (true or false)')
.bail()
.custom(value => {
  if (typeof value !== 'boolean') {
    throw new Error('Status must be true (checked) or false (unchecked)');
  }
  return true;
}),
    
    body('Assignto')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Assignto field cannot be empty!')
    .bail()
    .isString()
    .withMessage('Assignto must be a valid string!')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Assignto must be between 2 and 100 characters long')
    .bail(),


    body('Issue') 
    .trim() 
    .not() 
    .isEmpty() 
    .withMessage('Issue field cannot be empty!') 
    .bail() 
    .isString() 
    .withMessage('Issue must be a valid string!')
    .bail() 
    .isLength({ min: 2, max: 500 })
    .withMessage('Issue must be between 2 and 500 characters long')
    .bail(),

    // for name and email*****
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

];


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },


module.exports = validateUser();