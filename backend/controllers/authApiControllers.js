const User = require('../models/User');
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mail = require('../config/mail')
const randomstring = require('randomstring');
const global = require('../_helper/GlobalHelper')

module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword,
    editProfile,
    updateProfile
}

async function register(req,res) {
    try{
        console.log("object")
        const {name,email,phone,password,confirmpassword} = req.body;
        const user = await  User.findOne({email:email})
        console.log(user,'user');
        if(user !== null){
            return res.status(401).json({status:false ,error:'Email is already in use!'});
        }
        let result = await User.create(req.body);
        console.log(result,"result")
        res.status(200).json({status:true ,message :'user created successfully'});
    }catch(error){
        console.error('Registration error:',error);
        res.status(500).json({error:'Registration failed'});
    }
}

async function login(req,res){
    try {
            const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        console.log(user,"user");
        if (!user) {
            return res.status(401).json({ status: false, error: 'Incorrect Email ID or Password !' });
        } 
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({status: false, error: 'Incorrect Email ID or Password !' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET, {
            expiresIn: '2h',
        });

        res.status(200).json({status: true, user, token });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
}   

async function forgetPassword(req, res) {
    try {
        console.log("object")
        const { email } = req.body;
        const user = await User.findOne({ email})
        if (!user) {
            return res.status(404).json({ status: false, error: 'User not found!' });
        }
        const randomStrings = randomstring.generate();
        const url = `${process.env.FRONTEND_URL}/reset-password/${randomStrings}`;
        let updated = await User.findByIdAndUpdate(user.id, {
            token: randomStrings,
            
        }); 
        const userName = `${user.name}`; 
        let htmlString = mail.renderTemplate({ token: url,userName:userName }, "/forget.ejs");
        const mailOptions = {
            from: process.env.APP_EMAIL ,
            to: user.email ,
            subject: "Password Reset" ,
            text: `Hello ${userName}, We got request for reset password.`,
            html: htmlString ,    
        };
        mail.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error sending password reset email' });
    }
}

async function  resetPassword(req,res) {
    try{
        const {token ,password ,confirmPassword} = req.body;
        let result =  token.trim();
        let hash = await global.securePassword(password);
    
        if(password != confirmPassword){
            return res.status(401).json({status : failed, error: 'Password and confirm Password not matched'})
        }
        let tokenData = await User.findOne({ token: result });
        if (tokenData) {
            let updated = await User.findByIdAndUpdate(tokenData.id, {
              password: hash,
              token: "",
            });
          res.status(200).json({status:true ,message :'Password changed successfully'})
        }else{
            return res.status(404).json({status:false  ,message :'Sorry this link has expired or invalid link'})
        }
    }catch(error){
        console.error('Reset password error:',error);
        res.status(500).json({error :'Reset password failed'})
    }
}

async function editProfile( req, res) {
    try{
         const {userId, phone, address , gender} = req.body;
         const userData = await User.findById(userId)
         const baseUrl = `${req.protocol}://${req.get('host')}`;
         const profileImageUrl = `${baseUrl}/ProfileImage`;
        // console.log(userData,'heyyyy');
        if(!userData){
            return res.status(401).json({status:failed ,error :'user not found'})
        }
        // update user data fields *****
             if(phone)userData.phone = phone;
             if(gender)userData.gender = gender;
             if(address)userData.address = address;

      
             if(userData.profile_image != ''){
                userData.profile_image = `${profileImageUrl}/${userData.profile_image}`
            } 
        // save the user data fields*****
        await userData.save();
        res.status(200).json({status:true , userData})
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Profile update failed'})
    }
}
   
async function updateProfile(req, res) {
    try {
        // console.log(req.body,"ddddddddddd")
        const { userId, password , phone ,address , gender} = req.body;
        const updateData = { ...req.body };
        let baseUrl = process.env.APP_URL;
        // console.log(req.file,'hiiiiiiiii');
        if (req.file != undefined) {
            let profileImage = updateData.profile_image;
            const filePath = "./assets/profileImage/" + profileImage;
            updateData.profile_image = req.file.filename;
            if (profileImage != "") {
              fs.exists(filePath, function (exists) {
                if (exists) {
                  fs.unlinkSync(filePath);
                } else {
                  console.log('File not found, so not deleting.')
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

        // Add phone no , address , gender fields 
        if(phone)updateData.phone = phone;
        if(address)updateData.address = address;
        if(gender)updateData.gender  = gender;

        // Update the user data
        const userData = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if(req.file !== undefined){
            userData.profile_image = `${baseUrl}/ProfileImage/${req.file.filename}`;
        }
        res.status(200).json({ status: true, userData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Profile update failed' });
    }
}