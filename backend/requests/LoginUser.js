const{body,valoidationResult, validationResult} =require('express-validator');

const validateUser =() =>[
    body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage('email can not be empty')
    .bail()
    .isString() 
    .withMessage('Please provide a valid email address')
    .bail(),

    // validation for password ****

    body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password field must be required')
    .bail()
    .isString()
    .withMessage('password must be contain atleast 1 special char, 1 captial letter,1 number and no whitespace')
    .bail(),

    (req,res, next) =>{
        const login = validationResult(req);
        if(!login.isEmpty())
         return res.status(400).json({login:login.array()})
        next();
    }
]

module.exports = validateUser();
