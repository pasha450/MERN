const mongoose = require('mongoose')

const developerSchema =new mongoose.Schema({
DeveloperName:{
    type:String,
    required:true,
},
Email:{
    type:String,
    required:true,
},
Status:{
    type:String,
    required:true,
   },
profile_image: {
    type :String ,
    default:"",  
  },
 },
 {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
)
const Developer = mongoose.model("developer", developerSchema);
module.exports =Developer;