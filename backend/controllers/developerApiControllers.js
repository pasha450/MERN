const Developer = require("../models/Developer");
const fs = require("fs");
const global = require("../_helper/GlobalHelper");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

module.exports ={
     store,
     userList,
     editprofile,
     update,
     request,
     deleted,
}

async function store(req,res) {
    try{
    const{DeveloperName, Email, Role, Status} = req.body;
    const newDeveloper = await Developer.create({DeveloperName, Email, Role, Status})
    console.log(newDeveloper,"newDeveloper")
    res.status(200).json({status:true ,message:"developer  created successfully",data:newDeveloper})
    }catch(error){
     console.log('developer creation error:',error)
     res.status(500).json({error:'developer creation failed'})
    }
} 

async function userList(req, res) {
    try {
        const {createdBy} = req.body;
        const objectId = new mongoose.Types.ObjectId(createdBy);
        // let userData = await Developer.find({});
        let userData = await Developer.find({}).sort({ _id: -1 });
        
        if (!userData) {
            return res.status(401).json({ status: false, data: 'Sorry ! No Data Found' });
        }
        res.status(200).json({status: true, userData:userData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function editprofile(req,res){
    try {
        const {userId} = req.body;

        let userData = await Developer.findById(userId)
        if (!userData) {
            return res.status(401).json({ status: false, error: 'Sorry ! No Data Found' });
        }
        res.status(200).json({status: true, userData:userData});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong !' });
    }
}

async function request(req, res) {
    try {
        await Developer.create(req.body);
        res.status(200).json({ status: true, message: "User created successfully!" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Something went wrong !' });
    }
}
async function update(req, res) {
    try {
        const { userId,password} = req.body;
        const updateData = { ...req.body };
        let  baseUrl = process.env.APP_URL
        if (req.file != undefined) {
            let profileImage = updateData.profile_image;
            const filePath = "./assets/profileImage" + profileImage;
            updateData.profile_image = req.file.filename;
            if (profileImage != "") {
              fs.exists(filePath, function (exists) {
                if (exists) {
                  fs.unlinkSync(filePath);
                } else {
                //   console.log('File not found, so not deleting.');
                } 
              });
            }
            updateData.profile_image = `${req.file.filename}`;
          } else {
            delete updateData.profile_image;
          }
        if (password) {
            updateData.password = await global.securePassword(password);
        } else {
            delete updateData.password;
        }

        // Update the user data
        const userData = await Developer.findByIdAndUpdate(userId, updateData, { new: true });
        if (req.file != undefined) {
            userData.profile_image = `${baseUrl}/ProfileImage${req.file.filename}`;
        }else{
            userData.profile_image = ``;
        }
        res.status(200).json({ status: true, userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong !' });
    }
}


async function deleted(req,res) {
    try{
      let{userId}=req.body
      let result =await Developer.findByIdAndDelete(userId);
      res.status(200).json({status: true, message:'User deleted Successfully' }  )
    }catch(error){
       console.log(error);
       res.status(500).json({error:'Something went wrong!'})
    }
}