
const fs = require("fs");
const global = require("../_helper/GlobalHelper");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Priority = require("../models/Priority");


module.exports ={
     userList,
     store ,
     edit,
     update,
     deleted,
     
}
async function userList(req, res) {
    try {
        const {createdBy} = req.body;
        const objectId = new mongoose.Types.ObjectId(createdBy);
        // let userData = await Priority.find({});
        let userData = await Priority.find({}).sort({ _id: -1 });
        
        if (!userData) {
            return res.status(401).json({ status: false, data: 'ohh am Sorry ! Your Data Not Found !' });
        }
        res.status(200).json({status: true, userData:userData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function store(req,res) {
    try{
        const{Name ,StatusChecked} = req.body;
        const newPriority = await Priority.create({Name ,StatusChecked})
        console.log(newPriority,'hiiii'); 
        res.status(200).json({status :true , message :'Here checked Priority! Is okiee'})
    }catch(error){
        res.status(500).json({error:'Internal server error'});
    }
  
    }

    async function edit(req,res){
        try {
            const {userId} = req.body;
            let userData = await Priority.findById(userId)
            if (!userData) {
                return res.status(401).json({ status: false, error: 'Sorry ! No Data Found' });
            }
            res.status(200).json({status: true, userData:userData});
             
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Something went wrong !' });
        }
    }
    
    async function update (req, res){
        try {
            // console.log(req.body,'haaahaa')
            const {Name,StatusChecked} = req.body;
            const userId = req.body.userId;
            const updateData = { 
                Name, 
                StatusChecked 
            };
            // console.log(userId,'no nooooo')
            const userData = await Priority.findByIdAndUpdate(userId, updateData, { new: true });
            if (!userData) {
                return res.status(404).json({ status: false, error: 'Sorry! No Data Found' });
            }    
            res.status(200).json({ status: true, message: 'User data updated successfully', userData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, error: 'Something went wrong!' });
        }
    };

    async function deleted(req,res) {
        try{
          let{userId}=req.body
          let result =await Priority.findByIdAndDelete(userId);
          res.status(200).json({status: true, message:'User deleted Successfully' }  )
        }catch(error){
           console.log(error);
           res.status(500).json({error:'Something went wrong!'})
        }
   }

