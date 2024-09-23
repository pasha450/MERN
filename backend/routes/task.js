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
router.post('/editprofile', middleware.verifyToken,upload.none(), taskApiController.editprofile);
router.post('/request',TaskRequest,taskApiController.request);
router.post('/update',middleware.verifyToken,upload.none(),taskApiController.update);
router.post('/deleted',taskApiController.deleted);

module.exports=router;