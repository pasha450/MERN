const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware');
const multer = require('multer');
const fs = require('fs');
const upload = multer();


const developerApiController = require('../controllers/developerApiControllers');
const DeveloperRequest = require('../requests/DeveloperRequest');

const storageProfileImg = multer.diskStorage({
    destination: (req, file, callback) => {
        const dir = './assets/ProfileImage';
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, err => callback(err, dir));
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        console.log(file,'fileeeee')
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const newFileName = Date.now() + fileName;
        req.body.profile_image = newFileName;
        callback(null, newFileName);
    }
});

var uploadProfileImage = multer({
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


router.post('/',developerApiController.userList);
router.post('/store', middleware.verifyToken, uploadProfileImage.single('profile_image'), developerApiController.store);
router.post('/editprofile', middleware.verifyToken,upload.none(), developerApiController.editprofile);
router.post('/update', middleware.verifyToken, uploadProfileImage.single('profile_image'), developerApiController.update);
router.post('/request',DeveloperRequest,developerApiController.request);
router.post('/deleted',developerApiController.deleted);
module.exports=router;   
