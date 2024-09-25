// for changes in the modal using API ****

const User = require("../models/User");
const Task = require("../models/Task");
const Developer = require("../models/Developer");
const fs = require("fs"); 
const bcrypt = require("bcryptjs");
const global = require("../_helper/GlobalHelper");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");


module.exports = {
     store,   
     userList,
     edit,
     request,
     update,
     deleted, 
     getDeveloper,
}    

async function store(req,res) {
    try{
    const{ProjectName, Issue, Description, Status, Assignto} =req.body;
    const newProject = await Task.create({ProjectName,Issue,Description,Status, Assignto});
    console.log(newProject,"newProject")
    res.status(200).json({ status: true, message: "Project created successfully!", data: newProject });
} catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({ error: 'Project creation failed' });
  }
}

async function userList(req, res) {
    try {
        const {createdBy} = req.body;
        const objectId = new mongoose.Types.ObjectId(createdBy);
        let userData = await Task.find({}).sort({ _id: -1 });
        
        if (!userData) {
            return res.status(401).json({ status: false, data: 'Sorry ! No Data Found' });
        }
        res.status(200).json({status: true, userData:userData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function edit(req,res){
    try {
        const {userId} = req.body;
        let userData = await Task.findById(userId)
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
        await Task.create(req.body);
        res.status(200).json({ status: true, message: "User created successfully!" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Something went wrong !' });
    }
}

async function update (req, res){
    try {
        const {Name,StatusChecked} = req.body;
        const userId = req.body.userId;
        const updateData = { 
            Name, 
            StatusChecked 
        };
        // console.log(userId,'no nooooo')
        const userData = await Task.findByIdAndUpdate(userId, updateData, { new: true });
        if (!userData) {
            return res.status(404).json({ status: false, error: 'Sorry! No Data Found' });
        }    
        res.status(200).json({ status: true, message: 'User data updated successfully', userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Something went wrong!' });
    }
};


// for delete *****

async function deleted(req,res) {
     try{
       let{userId}=req.body
       let result =await Task.findByIdAndDelete(userId);
       res.status(200).json({status: true, message:'User deleted Successfully' }  )
     }catch(error){
        console.log(error);
        res.status(500).json({error:'Something went wrong!'})
     }
}
//  for fetched data 

async function getDeveloper(req, res) {
    try {
      const userData = await Developer.find({},{DeveloperName:1});
  
      if (!userData) {
        return res.status(404).json({ status: false, message: 'No data found' });
      }
      res.status(200).json({ status: true, userData });
    } catch (error) {
      console.error('Error fetching data by userId or name:', error);
      res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }


