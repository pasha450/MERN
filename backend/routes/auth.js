const express = require('express');
const router = express.Router();


const authApiController = require('../controllers/authApiControllers');
const registerUserRequest = require('../requests/RegisterUser');

// set the Api route ******
router.post('/register',registerUserRequest,authApiController.register);
module.exports = router;

