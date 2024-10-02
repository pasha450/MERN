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
        console.log("case 11");
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, err => callback(err, dir));
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        console.log(file,'fileeeee')
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const newFileName = Date.now() + '-' + fileName;
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
router.post('/store',  uploadProjectAttachment.any(), taskApiController.store);
router.post('/edit', middleware.verifyToken, taskApiController.edit); 
router.post('/request',TaskRequest,taskApiController.request);
router.post('/update',middleware.verifyToken,uploadProjectAttachment.any(),taskApiController.update);
router.post('/deleted',taskApiController.deleted);
router.get('/get-developer',taskApiController.getDeveloper);
router.get('/get-priority',taskApiController.getPriority);
router.get('/view/:id',taskApiController.view);



module.exports=router;