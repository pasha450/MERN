const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware');
const multer = require('multer');
const fs = require('fs');
const upload = multer();



const priorityApiController = require('../controllers/priorityApiController');
const PriorityRequest = require('../requests/PriorityRequest');


router.post('/',priorityApiController.userList);
router.post('/store', middleware.verifyToken, upload.none(), priorityApiController.store);
router.post('/edit', middleware.verifyToken,upload.none(), priorityApiController.edit);
router.post('/update',middleware.verifyToken,upload.none(),priorityApiController.update)
router.post('/deleted',priorityApiController.deleted);


module.exports=router;
