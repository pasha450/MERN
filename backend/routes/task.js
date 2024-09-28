const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware');
const multer = require('multer');
const fs = require('fs');
const upload = multer();


const taskApiController = require('../controllers/taskApiController');
const TaskRequest = require('../requests/TaskRequest');

const storageProfileImg = multer.diskStorage({
    destination: (req, file, callback) => {
        const dir = './assets/ProjectAttachment';
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, err => callback(err, dir));
        }
        callback(null, dir);
    },
    filename: (req, files, callback) => {
        console.log(files,'fileeeee')
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const newFileName = Date.now() + fileName;
        console.log(newFileName,"newFileName")
        req.body.attachments = newFileName;
        callback(null, newFileName);
    }
});

var uploadProjectAttachment = multer({
    storage: storageProfileImg,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true); 
        }
        else {
            callback(null, false);
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }   
    }
});


router.post('/',taskApiController.userList);
router.post('/store', middleware.verifyToken, upload.none(), taskApiController.store);
router.post('/edit', middleware.verifyToken,uploadProjectAttachment.array('attachments', 10), taskApiController.edit);
router.post('/request',TaskRequest,taskApiController.request);
router.post('/update',middleware.verifyToken,uploadProjectAttachment.array('attachments', 100),taskApiController.update);
router.post('/deleted',taskApiController.deleted);
router.get('/get-developer',taskApiController.getDeveloper);
router.get('/get-priority',taskApiController.getPriority);


module.exports=router;