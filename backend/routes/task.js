const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware');
const multer = require('multer');
const fs = require('fs');
const upload = multer();


const taskApiController = require('../controllers/taskApiController');
const TaskRequest = require('../requests/TaskRequest');

router.post('/',taskApiController.userList);
router.post('/store', middleware.verifyToken, upload.none(), taskApiController.store);
router.post('/edit', middleware.verifyToken,upload.none(), taskApiController.edit);
router.post('/request',TaskRequest,taskApiController.request);
router.post('/update',middleware.verifyToken,upload.none(),taskApiController.update);
router.post('/deleted',taskApiController.deleted);
router.get('/get-developer',taskApiController.getDeveloper);
router.get('/get-priority',taskApiController.getPriority);


module.exports=router;