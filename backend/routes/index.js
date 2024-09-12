const express = require('express');
const db = require('../config/mongoose');
const router = express.Router();

router.use('/api', require('./auth')); 

module.exports = router;
