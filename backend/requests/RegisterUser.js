const { body , validationResult} =require('express-validator');
const User = require('../models/User');

// validation for form Field *****

const validateUser =() =>[
    body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name must be required')
    .bail()
    .isString()
    .withMessage('Name should be in valid string')
    .bail() ,
     
//  **** for email ****
    body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty')
    .bail()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .bail()
    .custom((value) => {
      return User.findOne({ email: { $regex: new RegExp(`^${value}$`, 'i') } }).then((user) => {
        if (user) {
          return Promise.reject('Email is already in use!');
        }
      });
    }),
  
    // for phone no *****
    body("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage('phone no is required')
    .bail()
    .isString()
    .withMessage('phone no should be in a valid format')
    .bail(),


    // **** for password *****
    body("password")
    .not()
    .isEmpty() 
    .withMessage('Password field is required.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .bail()
    .custom((value) => {
      const UpperCase = /[A-Z]/.test(value);
      const LowerCase = /[a-z]/.test(value);
      const Number = /\d/.test(value);
      const SpecialChar = /[@$!%*?&]/.test(value);
      const NoWhitespace = /\s/.test(value);
  
      if (!UpperCase || !LowerCase || !Number || !SpecialChar || NoWhitespace) {
        throw new Error('Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and no whitespace.');
      }
      return true;
    })
    .bail(),

//    for confirm password*****
    body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage('Confirm password field is required.')
    .bail()
    .custom((value, { req }) => {
    if (value !== req.body.password) {
    throw new Error('Passwords do not match.');
    }
    return true;
    })
    .bail(),

    (req, res, next) => {
      const errors = validationResult(req);
      // console.log(errors,'got it ,okieee')
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });
      next();
  },
]
module.exports = validateUser();
