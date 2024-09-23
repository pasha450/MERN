const express = require('express');
const db = require('../config/mongoose');
const router = express.Router();
// use for Authentication ***** 

router.use('/api/priority',require('./priority'))
router.use('/api/developer',require('./developer'))
router.use('/api/task', require('./task')); 
router.use('/api', require('./auth')); 




module.exports = router;
