const User = require('../models/User');
const fs = require("fs");
const bcrypt = require("bcryptjs");

module.exports ={
            
          register,
}

async function register(req,res) {
    try{
        const {name,email,phone,password,confirmpassword} = req.body;
        const user = await  User.findOne({email:email ,isDeleted:false})
        console.log(user,'user');
        if(!user){
            return res.status(401).json({status:false ,error:'Email is already in use!'});
        }
        await User.create(req.body);
        res.status(200).json({status:true ,message :'user created successfully'});
    }catch(error){
        console.error('Registration error:',error);
        res.status(500).json({error:'Registration failed'});
    }
  
}