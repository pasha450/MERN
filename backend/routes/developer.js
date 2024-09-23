const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware');
const multer = require('multer');
const fs = require('fs');
const upload = multer();


const developerApiController = require('../controllers/developerApiControllers');
const DeveloperRequest = require('../requests/DeveloperRequest');


router.post('/',developerApiController.userList);
router.post('/store', middleware.verifyToken, upload.none(), developerApiController.store);
router.post('/editprofile', middleware.verifyToken,upload.none(), developerApiController.editprofile);
router.post('/update',middleware.verifyToken,upload.none(),developerApiController.update);
router.post('/request',DeveloperRequest,developerApiController.request);
router.post('/deleted',developerApiController.deleted);
module.exports=router;